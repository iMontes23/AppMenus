import { Component, inject, ViewChild } from '@angular/core';
import { DrmService } from '../../services/drm.service';
import { VisitRegistrationDTO } from '../../models/visit-registration-dto';
import { EntityDTO } from '../../models/entity-dto';
import { EntityTypeDTO } from '../../models/entity-type-dto';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterModule } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from "@angular/forms";
import { Constante } from '../../utilerias/constantes/constante';
import { map, Observable, startWith } from 'rxjs';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { UserInformation } from '../../utilerias/model/user-information';
import { CurrentAccessService } from '../../services/current-access.service';
import { UserGroupDTO } from '../../models/user-group-dto';
import Swal from 'sweetalert2';
import { MatSelectModule } from '@angular/material/select';
import { BranchDTO } from '../../models/branch-dto';
import { BranchService } from '../../services/branch.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { EntityService } from '../../services/entity.service';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { RegexConstante } from '../../utilerias/constantes/regex-constante';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { AddNewClientDialogComponent } from './add-new-client-dialog/add-new-client-dialog.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DATE_FORMATS } from '../../utilerias/formats/DateFormats';

@Component({
  selector: 'app-visit-registration',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIcon,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatRadioModule,
    AsyncPipe,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    NgxMaterialTimepickerModule,
    MatCardModule,
    MatTooltipModule
  ],
  templateUrl: './visit-registration.component.html',
  styleUrl: './visit-registration.component.scss',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }
  ]
})
export class VisitRegistrationComponent {

  readonly dialog = inject(MatDialog);

  visits: VisitRegistrationDTO[];
  entities: EntityDTO[];
  entityTypes: EntityTypeDTO[];
  userGroupDTO: UserGroupDTO[] | null = null;

  entitiesSelect: EntityDTO[] = [];
  filteredentitiesSelect: EntityDTO[] = this.entitiesSelect;
  search: any = [];
  groupEntity: Observable<EntityDTO[]>;
  value = Constante.EMPTY;
  milisegundos = Constante.MINUTO_MILISEGUNDOS;
  minDate: Date;
  maxDate: Date;
  selectedEntityType: EntityTypeDTO | null = null
  selectedEntity: EntityDTO | null = null

  userInformation: UserInformation;
  searchInput: FormControl = new FormControl('');
  searchInput2: FormControl = new FormControl('');

  branchs: BranchDTO[] = [];
  branchsByEntity: BranchDTO[] = [];
  filteredsucursalesSelect: BranchDTO[] = this.branchsByEntity;

  @ViewChild('fileInput') fileInput: any;
  fileName: string = 'Adjuntar archivo';
  attachedFile: File | null = null;

  isCliente: Boolean = false;

  private _formBuilder = inject(FormBuilder);
  stateForm = this._formBuilder.group({
    collaborator: '',
    selectionType: '',
    vistitStartTime: ['', [Validators.required, this.timeValidator]],
    vistitEndTime: ['', [this.timeValidator]],
    entityType: ['', [Validators.required]],
    reason: ['', [Validators.required]],
    dateField: ['', [Validators.required]],
    branch: ['']
  });

  constructor(
    private drmService: DrmService,
    private entityService: EntityService,
    private branchService: BranchService,
    private currentAccessService: CurrentAccessService
  ) {
    this.visits = [];
    this.entities = [];
    this.entityTypes = [];
    this.entitiesSelect = [];

    const today = new Date();
    this.maxDate = today;
    this.minDate = new Date(today);

    this.groupEntity = this.stateForm
      .get('entityType')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this.filterGroup(value || ''))
      )

      this.stateForm.get('selectionType')?.valueChanges.subscribe((selectedId) => {
        if (selectedId !== null) {
          const selectedEntityType = this.entityTypes.find(type => type.cd_Id === +selectedId);
          if (selectedEntityType) {

            const entityToModify = this.entityTypes.find(type => type.nb_nombre === "Cliente");
            if (entityToModify) {
              entityToModify.nb_nombre = "Clientes FleetControl";
            }
            
            this.selectedEntityType = selectedEntityType;
            this.filterType(1);
          }
        }
      });

    this.userInformation = this.currentAccessService.getUserInformation();
  }

  ngOnInit() {
    this.getEntityTypes();
    if (this.userInformation) {
      this.stateForm.patchValue({
        collaborator: `${this.userInformation.name} ${this.userInformation.apPaterno} 
        ${this.userInformation.apMaterno ? this.userInformation.apMaterno : ""}`
      });
      this.stateForm.get('collaborator')?.disable();
    }
  }

  getParam() {
    this.drmService.getParam("DAYS_AFTER_FOR_VISIT_REGISTRATION").subscribe(response => {

      const today = new Date();
      let integerValue: number = parseInt(response ? response.nb_valor : "7", 10);
      const minDate = new Date(today);
      minDate.setDate(today.getDate() - integerValue);
      this.minDate = minDate;
    });
  }

  getGroup() {
    this.drmService.getGroup().subscribe(response => {
      this.userGroupDTO = response;
      this.getParam();
    });
  }

  getEntities(TypeId: number) {

    
    if (TypeId == -1) {
      let tipo = this.entityTypes.find(tipo => tipo.cd_Id == 2);
      this.isCliente = true;
        this.entityService.getAllEntitiesByUserAndType(this.userInformation.userID, 2).subscribe(response => {
          this.entities = response;
          if (tipo) {
            tipo.entities = response;
          }
          this.filterType(2);
          this.getGroup();
        }, () => {});
      
      
    }else{
      this.isCliente = false;
      let tipo = this.entityTypes.find(tipo => tipo.cd_Id == TypeId);
      if (tipo?.entities && tipo.entities.length > 0) {
        this.entities = tipo.entities;
        
        this.filterType(1);
        this.getGroup();
      } else {
        this.entityService.getAllEntitiesByUserAndType(this.userInformation.userID, TypeId).subscribe(response => {
          this.entities = response;
          if (tipo) {
            tipo.entities = response;
          }
          
          this.filterType(1);
          this.getGroup();
        }, () => {});
      }
    }        
  }

  getEntityTypes() {
    this.drmService.getAllEntityTypes().subscribe(response => {
      this.entityTypes = response;
      if (this.selectedEntityType === null && this.entityTypes.length > 0) {
        this.selectedEntityType = this.entityTypes[0];
        this.stateForm.patchValue({
          selectionType: this.selectedEntityType.cd_Id.toString()
        });
        this.getEntities(this.selectedEntityType.cd_Id);
      }
    }, () => {
    });
  }

  private filterType(tipoRegistro:number) {

    if (tipoRegistro === 2) {
      this.entitiesSelect = this.entities
      .filter(entity =>
        entity.tp_TipoEntidad === 2 && entity.cd_tipoUsuario === 2
      );
      this.filteredentitiesSelect = [...this.entitiesSelect];
      
    } else{
      this.entitiesSelect = this.entities
      .filter(entity =>
        entity.tp_TipoEntidad === this.selectedEntityType?.cd_Id && entity.cd_tipoUsuario === tipoRegistro
      );
    this.filteredentitiesSelect = [...this.entitiesSelect];
    }
  }

  private filterGroup(value: string): EntityDTO[] {
    if (value) {
      return this.entitiesSelect
        .filter(entity =>
          entity.nb_Nombre.toLowerCase().includes(value.toLowerCase()) &&
          entity.tp_TipoEntidad === this.selectedEntityType?.cd_Id
        );
    }
    return [];
  }

  guardar() {
    let cd_Sucursal = this.stateForm.get('branch')?.value;
    if (this.userGroupDTO === null || this.userGroupDTO.length < 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'El Usuario no esta asignado a un grupo.',
      });

      return;
    }

    if (!this.selectedEntity) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Revise a quién está dirigida su visita.'
      });

      return;
    }

    if (this.selectedEntity && this.selectedEntity.tp_TipoEntidad === 1 && !cd_Sucursal) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Seleccionar una Sucursal.'
      });

      return;
    }

    if (this.stateForm.valid && this.selectedEntity) {

      const tipo = parseInt(this.stateForm.value.selectionType || '0', 10)

      const visitData: VisitRegistrationDTO = {
        cd_registrovisita: 0,
        cd_usuario: this.userGroupDTO != null ? this.userGroupDTO[0].cd_usuario : 0,
        cd_entidad: this.selectedEntity.cd_Entidad,
        cd_Sucursal: cd_Sucursal ? parseFloat(cd_Sucursal) : 0,
        cd_tipovisita: tipo === -1? 2 :tipo,
        cd_gfx: null,
        ts_fechavisita: this.parseStringToDate(this.stateForm.value.vistitStartTime!),
        ts_fechaVisitaFin: this.parseStringToDate(this.stateForm.value.vistitEndTime!),
        tx_motivo: this.stateForm.value.reason ? this.stateForm.value.reason : '',
        nb_usuariocreacion: Constante.EMPTY,
        ts_creacion: new Date(),
        nb_usuariomodificacion: '',
        ts_modificacion: null,
        st_activo: true
      };

      if(!this.isValidTime(visitData)) {
        return;
      }
      
      const formData = new FormData();
      formData.append('visitData', JSON.stringify(visitData));
      if (this.attachedFile) {
        formData.append('attachedFile', this.attachedFile);
      }

      this.drmService.saveWithFile(formData).subscribe(response => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Se registró correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.limpiarFomulario();
      }, () => {});

    } else {
      console.log('Formulario no válido');
    }
  }

  isValidTime(visitData: VisitRegistrationDTO): boolean {

    // Si solo se proporciona la hora de inicio la hora de finalización será la misma
    if ((this.stateForm.value.vistitStartTime?.trim()) && !(this.stateForm.value.vistitEndTime?.trim())) {
      visitData.ts_fechaVisitaFin = visitData.ts_fechavisita;
      
      return true;
    }

    if (!(this.stateForm.value.vistitStartTime?.trim()) && (this.stateForm.value.vistitEndTime?.trim())) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Para registrar la hora final de la visita considere indicar una hora inicial'
      });
      
      return false;
    }
    
    if (visitData.ts_fechavisita > visitData.ts_fechaVisitaFin!) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'La hora inicial de la visita es mayor a la hora final'
      });
      
      return false;
    }
    
    return true;
  }

  onSelectionChange(event: any) {
    this.getEntities(event.value);
    this.limpiarFomulario();
  }

  limpiarFomulario(): void {
    this.stateForm.patchValue({
      entityType: '',
      reason: '',
      dateField: '',
      vistitStartTime: '',
      vistitEndTime: '',
      branch: ''
    });
    this.branchsByEntity = [];
    this.selectedEntity = null;
    this.filteredentitiesSelect = [...this.entitiesSelect];
    this.filteredsucursalesSelect = [...this.branchsByEntity];
    this.searchInput.setValue('');
    this.searchInput2.setValue('');
    this.onRemoveAttachedFile();
  }

  onEntitySelected(entidad: EntityDTO) {
    if (entidad == undefined) {
    } else {
      this.branchsByEntity = [];
      this.stateForm.patchValue({
        branch: ''
      });
      this.selectedEntity = entidad;
      this.branchService.getBranch(entidad.cd_Entidad).subscribe({
        next: (response) => {
          this.branchsByEntity = response ?? [];
          this.filteredsucursalesSelect = [...this.branchsByEntity];
        },
        error: (err) => {
          console.error('Error al obtener sucursales:', err);
          this.branchsByEntity = [];
        }
      });
    }
  }

  onKey(event: KeyboardEvent): void {
    const input = this.searchInput.value.toLowerCase(); // Obtén el valor del FormControl
    this.filteredentitiesSelect = this.entitiesSelect.filter((entity) =>
      entity.nb_Nombre.toLowerCase().includes(input)
    );
  }

  onKeySucursales(event: KeyboardEvent): void {
    const input = this.searchInput2.value.toLowerCase();
    this.filteredsucursalesSelect = this.branchsByEntity.filter((branch) =>
      branch.nb_Sucursal.toLowerCase().includes(input)    
    );
  }

  onAddNewClient() {
		const dialogRef = this.dialog.open(AddNewClientDialogComponent, {
			minWidth: '60vw',
			data: { clients: this.entities }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {        
        this.stateForm.controls['entityType'].setValue(result.cd_Entidad);
        this.searchInput.setValue(result.nb_Nombre);
        
        this.getEntities(result.tp_TipoEntidad);
			}
		});
	}

  parseStringToDate(timeString: string): Date {
    const date = this.stateForm.value.dateField ? new Date(this.stateForm.value.dateField) : new Date();
  
    if (timeString.trim().length === 0) {
      return date;
    }
  
    const [time, meridian] = timeString.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
  
    if (meridian === 'PM' && hours !== 12) {
      hours += 12;
    }
  
    if (meridian === 'AM' && hours === 12) {
      hours = 0;
    }
  
    date.setHours(hours, minutes, 0, 0);
  
    const offsetInMs = date.getTimezoneOffset() * this.milisegundos;
    const utcDate = new Date(date.getTime() - offsetInMs);
  
    return utcDate;
  }

  onFileChange(): void {
    const fileInput: HTMLInputElement = this.fileInput.nativeElement;
    if (!fileInput.files || !fileInput.files[0]) {
      this.attachedFile = null;
      this.fileName = 'Adjuntar archivo';
      return;
    }

    const file = fileInput.files[0];
    const MAX_FILE_SIZE = 15 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'El archivo es demasiado grande. El tamaño máximo permitido es 15 MB.'
      });
      this.attachedFile = null;
      this.fileName = 'Adjuntar archivo';
      return;
    }
      
    this.attachedFile = fileInput.files[0];
    this.fileName = this.attachedFile.name;
  }

  onRemoveAttachedFile () {
    this.fileInput.nativeElement.value = '';
    this.attachedFile = null;
    this.fileName = 'Adjuntar archivo';
  }

  timeValidator(control: AbstractControl): ValidationErrors {
    if (!control.value) {
      return {};  // Skip if the value is empty
    }
    const isValid = RegexConstante.timePattern.test(control.value);
    return isValid ? {} : { invalidTime: true };
  }

}
