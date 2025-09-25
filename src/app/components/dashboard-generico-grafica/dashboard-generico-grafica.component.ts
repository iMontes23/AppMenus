import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { GraficaDinamicaComponent } from '../grafica-dinamica/grafica-dinamica.component';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { UserInformation } from '../../utilerias/model/user-information';
import { Utilerias } from '../../utilerias/utileria';
import { DATE_FORMATS } from '../../utilerias/formats/DateFormats';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DasGraficaDTO } from '../../models/dash-grafica-dto';
@Component({
  selector: 'app-dashboard-generico-grafica',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIcon,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    AsyncPipe,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    GraficaDinamicaComponent],
  templateUrl: './dashboard-generico-grafica.component.html',
  styleUrl: './dashboard-generico-grafica.component.css',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }
  ]
})
export class DashboardGenericoGraficaComponent implements OnInit, OnChanges {

  @Input() userInformation?: UserInformation;
  @Input() dasGraficas?: DasGraficaDTO[];
  @Output() dateChanged = new EventEmitter<DasGraficaDTO>();
  @Output() groupChanged = new EventEmitter<DasGraficaDTO>();
  @Output() userChanged = new EventEmitter<DasGraficaDTO>();

  graficaCurrent: DasGraficaDTO;

  selectedGrafica?: string;
  minDate: Date = new Date();
  value: number = 11;
  show: boolean = false;
  cd_usuario : number = 0;
  cd_grupo : number = 0;

  private _formBuilder = inject(FormBuilder);
  stateForm = this._formBuilder.group({
    dateInicio: [new Date()],
    dateFin: [new Date()],
  });

  constructor(private utilerias: Utilerias) {
    this.graficaCurrent = new DasGraficaDTO();
  }

  async ngOnInit() {
    if (this.dasGraficas && this.dasGraficas.length > 0) {
      this.graficaCurrent = Object.assign({}, this.dasGraficas[0]);
      this.cd_usuario = this.graficaCurrent.usuarioSeleccionado.cd_usuario !== undefined ? this.graficaCurrent.usuarioSeleccionado.cd_usuario : 0;
      this.cd_grupo = this.graficaCurrent.grupoSeleccionado.cd_grupo !== undefined ? this.graficaCurrent.grupoSeleccionado.cd_grupo : 0;
      if (this.graficaCurrent?.startDate && this.graficaCurrent?.endDate) {
        const today = new Date();
        const startDate: Date = this.utilerias.getInicioDeMes(today);
        const endDate: Date = this.utilerias.getFinDeMes(today);

        this.stateForm.get('dateInicio')?.setValue(startDate);
        this.stateForm.get('dateFin')?.setValue(endDate);
      }
      this.show = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dasGraficas']) {
      if (this.dasGraficas && this.dasGraficas.length > 0) {
        this.cambioGrafica(this.graficaCurrent.titulo)
      }
    }
  }

  cambioGrafica(titulo: string | undefined) {
    let grafica = this.dasGraficas?.find(g => g.titulo === titulo);
    if (grafica) {
      this.show = false;
      this.graficaCurrent = Object.assign({}, grafica);
      this.cd_usuario = this.graficaCurrent.usuarioSeleccionado.cd_usuario !== undefined ? this.graficaCurrent.usuarioSeleccionado.cd_usuario : 0;
      this.cd_grupo = this.graficaCurrent.grupoSeleccionado.cd_grupo !== undefined ? this.graficaCurrent.grupoSeleccionado.cd_grupo : 0;
      setTimeout(() => {
        this.show = true;
      }, 10);
    }
  }

  onDateChange(event: any) {
    const fechaInicio = this.stateForm.get('dateInicio')?.value
    const fechaFin = this.stateForm.get('dateFin')?.value

    if (fechaInicio && fechaFin) {
      this.graficaCurrent.startDate = new Date(fechaInicio);
      this.graficaCurrent.endDate = new Date(fechaFin);
      this.dateChanged.emit(this.graficaCurrent)
    }
  }

  onGroupSelect(event: any) {
    this.graficaCurrent.grupoSeleccionado.cd_grupo  = this.cd_grupo;
    this.groupChanged.emit(this.graficaCurrent)
  }

  onUserSelect(event: any) {
    this.graficaCurrent.usuarioSeleccionado.cd_usuario = this.cd_usuario;
    this.userChanged.emit(this.graficaCurrent)
  }
}
