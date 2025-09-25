import { Component, inject } from '@angular/core';
import { DrmService } from '../../services/drm.service';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterModule } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { UserInformation } from '../../utilerias/model/user-information';
import { CurrentAccessService } from '../../services/current-access.service';
import { UserGroupDTO } from '../../models/user-group-dto';
import Swal from 'sweetalert2';
import { MatSelectModule } from '@angular/material/select';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DATE_FORMATS } from '../../utilerias/formats/DateFormats';
import { IncidentDTO } from '../../models/incident-dto';
import { IncidentsTypeDTO } from '../../models/incident-type-dto';
import { IncidentsService } from '../../services/incident.service';
import { HolidaysService } from '../../services/holidays.service';
import { DiasFestivosDTO } from '../../models/dias_festivos-dto';
import { RangoFechasDTO } from '../../models/rango-fechas-dto';

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
  templateUrl: './ativity-log.component.html',
  styleUrl: './ativity-log.component.scss',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }
  ]
})
export class ActivityLogComponent {

  incidentTypes: IncidentsTypeDTO[] = [];
  userGroupDTO: UserGroupDTO[] = [];
  minDate: Date;
  userInformation: UserInformation;
  diasFestivos: DiasFestivosDTO[] = [];
  listaIncidente: IncidentDTO[] = [];
  diasDescartados: DiasFestivosDTO[] = [];

  private _formBuilder = inject(FormBuilder);

  stateForm = this._formBuilder.group({
    collaborator: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    activityType: ['', [Validators.required]],
    comment: [''],
    branch: ['']
  });

  constructor(
    private drmService: DrmService,
    private currentAccessService: CurrentAccessService,
    private incidentsService: IncidentsService,
    private holidaysService: HolidaysService
  ) {
    const today = new Date();
    this.minDate = new Date(today);

    this.userInformation = this.currentAccessService.getUserInformation();
  }

  ngOnInit(): void {
    if (this.userInformation) {
      const { name, apPaterno, apMaterno } = this.userInformation;
      this.stateForm.patchValue({
        collaborator: `${name} ${apPaterno} ${apMaterno || ''}`
      });
      this.stateForm.get('collaborator')?.disable();
    }

    this.getGroup(); // Inicia carga
  }

  getGroup(): void {
    this.drmService.getGroup().subscribe(groups => {
    this.userGroupDTO = groups;
    this.getParam();
    });
  }

  getParam(): void {
    this.drmService.getParam("DAYS_AFTER_FOR_VISIT_REGISTRATION").subscribe(res => {
      const daysBack = parseInt(res?.nb_valor ?? "7", 10);
      const today = new Date();
      today.setDate(today.getDate() - daysBack);
      this.minDate = today;
      this.getAllTypeIncident()
    });
  }

  onDateRangeChange() {
    const inicioStr = this.stateForm.get('startDate')?.value;
    const finStr = this.stateForm.get('endDate')?.value;

    if (!inicioStr || !finStr) {
      return;
    }

    const rango: RangoFechasDTO = new RangoFechasDTO(
      new Date(inicioStr),
      new Date(finStr), this.userInformation.userID);

    this.holidaysService.getDiasFestivosEnRango(rango).subscribe({
      next: (dias: DiasFestivosDTO[]) => {
        this.diasFestivos = dias;
        this.validar(rango);
      },
      error: err => {
        console.error('Error al obtener días festivos', err);
      }
    });
  }

  validar(rango: RangoFechasDTO) {
    this.listaIncidente = [];
    this.diasDescartados = [];

    const comentario = this.stateForm.value.comment ?? '';

    const currentDate = new Date(rango.fechaInicio);

    while (currentDate <= rango.fechaFin) {

      const currentDateStr = currentDate.toISOString().split('T')[0];
      const diasFestivo = this.diasFestivos.find(d => {
        const festivoStr = new Date(d.ts_fechaCalendario!).toISOString().split('T')[0];
        return festivoStr === currentDateStr;
      });

      if (diasFestivo) {
        this.diasDescartados.push(diasFestivo);
      } else {
        const incident: IncidentDTO = {
          cd_incidente: 0,
          cd_tipoIncidente: Number(this.stateForm.value.activityType),
          cd_usuario: 0,
          ts_Cal_Fecha: new Date(currentDate),
          tx_comentario: comentario,
          nb_usuariocreacion: this.userInformation.userID,
          ts_creacion: new Date(),
          nb_usuariomodificacion: this.userInformation.userID,
          ts_modificacion: null,
          st_activo: 1
        };

        this.listaIncidente.push(incident);
      }
      // Avanzar al siguiente día
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }


  getAllTypeIncident() {
    this.incidentsService.getAllTypeIncident().subscribe(response => {
      this.incidentTypes = response;
      if (this.incidentTypes.length > 0) {
        const defaultValue = this.incidentTypes[0].cd_tipoIncidente.toString();
        this.stateForm.get('activityType')?.setValue(defaultValue);
      }
    });
  }

  get selectedActivityName(): string {
    const selectedId = this.stateForm.get('activityType')?.value;
    const selected = this.incidentTypes.find(a => a.cd_tipoIncidente.toString() === selectedId);
    return selected?.nb_Incidente ?? 'Actividad';
  }

  guardar(): void {

    if (!this.stateForm.valid) {
      return console.warn('Formulario no válido');
    }

    this.listaIncidente.forEach(element => {
      element.cd_tipoIncidente = Number(this.stateForm.value.activityType);
      element.tx_comentario = this.stateForm.value.comment ?? '';
      element.cd_usuario = 0;
    });

    this.incidentsService.saveIncident(this.listaIncidente).subscribe(() => {
      Swal.fire('¡Éxito!', 'Se registró correctamente.', 'success');
      this.limpiarFomulario();
    }, () => {
      Swal.fire('¡Éxito!', 'Error al registrar.', 'warning');
    });
  }


  limpiarFomulario(): void {
    this.stateForm.patchValue({
      activityType: '',
      comment: '',
      startDate: '',
      endDate: '',
      branch: ''
    });

    if (this.incidentTypes.length > 0) {
      const defaultValue = this.incidentTypes[0].cd_tipoIncidente.toString();
      this.stateForm.get('activityType')?.setValue(defaultValue);
    }
  }
}
