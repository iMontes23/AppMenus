import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Constante } from '../../../utilerias/constantes/constante';
import { EntityDTO } from '../../../models/entity-dto';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import Swal from 'sweetalert2';
import { EntityService } from '../../../services/entity.service';
import { CommonModule } from '@angular/common';
import { ConutryService } from '../../../services/country.service';
import { CountryDTO } from '../../../models/country-dto';
import { MatSelectModule } from '@angular/material/select';
CUSTOM_ELEMENTS_SCHEMA
 
@Component({
  selector: 'app-add-new-client-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    CommonModule,
    MatSelectModule
  ],
  templateUrl: './add-new-client-dialog.component.html',
  styleUrl: './add-new-client-dialog.component.scss'
})
export class AddNewClientDialogComponent {
 
  clientForm: FormGroup;
  registeredClients: EntityDTO[] = [];
  filteredClients: EntityDTO[] = [];
  contrys: CountryDTO[] = [];
  selectedCountryId: number;
 
  constructor(
    private entityService: EntityService,
    private conutryService: ConutryService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { clients: EntityDTO[] },
    private dialogRef: MatDialogRef<AddNewClientDialogComponent>
  ) {
    this.registeredClients = this.data?.clients || [];
    this.filteredClients = this.registeredClients;
    this.getCountry();
    this.clientForm = new FormGroup({
      name: new FormControl('', [Validators.required, this.nameValidator.bind(this)]),
      country: new FormControl('', [Validators.required])
    });
    this.selectedCountryId = 0;
  }

  getCountry() {
    this.conutryService.getAllCountry().subscribe(res => {
      this.contrys = res;
    })
  }

  nameValidator(control: AbstractControl): ValidationErrors | null {
    const name = control.value?.trim().toLowerCase();
    const isNameTaken = this.registeredClients.some(
      (client) => client.nb_Nombre.trim().toLowerCase() === name
    );
    return isNameTaken ? { nameAlreadyRegistered: true } : null;
  }

  filterRegisteredClients() {
    const inputName = this.clientForm.get('name')?.value?.trim().toLowerCase() || '';
    
    this.filteredClients = this.registeredClients.filter((client) => {
      const clientName = client.nb_Nombre.trim().toLowerCase();
      
      return inputName.split(' ').every((word: string) => clientName.includes(word));
    });
  }
  
  onCountrySelect(event: any): void {
    this.selectedCountryId = event.value;
  }
 
  onSubmit() {
    if (this.clientForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El formulario contiene errores. Verifica los campos.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
  
    const newClientName = this.clientForm.get('name')?.value.trim();
    const isAlreadyRegistered = this.registeredClients.some(
      (client) => client.nb_Nombre.trim().toLowerCase() === newClientName.toLowerCase()
    );
  
    if (isAlreadyRegistered) {
      Swal.fire({
        icon: 'warning',
        title: 'Cliente ya registrado',
        text: `El cliente "${newClientName}" ya existe.`,
        confirmButtonText: 'Aceptar',
      });
      return;
    }
  
    const newClient: EntityDTO = { nb_Nombre: newClientName } as EntityDTO;
    newClient.tp_TipoEntidad = 2;
    newClient.cd_tipoUsuario = 2;
    const formData = new FormData();
    formData.append('entidadData', JSON.stringify(newClient));

    this.entityService.saveEntity(formData, this.selectedCountryId).subscribe({
      next: (response) => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Se registró correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          response.entity.tp_TipoEntidad = -1;
          response.entity.nb_Nombre = newClient.nb_Nombre;
          this.dialogRef.close(response.entity);
        });
      },
      error: (error) => {
        console.error('Error al guardar el cliente:', error);
        let errorMessage = 'Hubo un problema al registrar el cliente. Inténtalo de nuevo.';
        
        if (error.status === 500) {
          errorMessage = 'Error interno del servidor. Por favor, contacte con el soporte.';
        } else if (error.status === 400) {
          errorMessage = 'Datos incorrectos. Verifique los campos del formulario.';
        }
        
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
          confirmButtonText: 'Aceptar',
        });
      }
    });   
  }
  
}