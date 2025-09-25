import { Component, ViewChild } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from '../../services/file-upload.service';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MensajeConstante } from '../../utilerias/constantes/mensaje-constante';
import { Constante } from '../../utilerias/constantes/constante';
import * as XLSX from 'xlsx';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { ConutryService } from '../../services/country.service';
import { CountryDTO } from '../../models/country-dto';
import Swal from 'sweetalert2';
import { DiasFestivosDTO } from '../../models/dias_festivos-dto';
import { HolidaysService } from '../../services/holidays.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-non-working-days',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatListModule,
    MatTableModule,
    MatPaginator,
    MatSelectModule,
    MatIcon
  ],
  templateUrl: './non-working-days.component.html',
  styleUrl: './non-working-days.component.scss'
})
export class NonWorkingDaysComponent {
  currentFile?: File | null;
  progress = 0;
  message = Constante.EMPTY;
  numError = 0;

  fileName = MensajeConstante.SELECIONE_UN_ARCHIVO;
  fileInfos?: Observable<any>;
  allowedExtensions = ['xml', 'xlsx'];
  contrys: CountryDTO[] = [];

  displayedColumns: string[] = ['dia', 'pais', 'estatus', 'observacion'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<DiasFestivosDTO>([]);
  listaExitoso: DiasFestivosDTO[] = [];
  totalElements = 0;
  pageSize = 10;
  countryForm: FormGroup;
  selectedCountryId: number;

  constructor(
    private uploadService: FileUploadService,
    private conutryService: ConutryService,
    private holidaysService: HolidaysService,
    private fb: FormBuilder
  ) {
    this.countryForm = this.fb.group({
      country: [null]
    });

    this.selectedCountryId = 0;
  }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
    this.dataSource.paginator = this.paginator;
    this.getCountry();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getCountry() {
    this.conutryService.getAllCountry().subscribe(res => {
      this.contrys = res;
    })
  }

  onCountrySelect(event: any): void {
    this.selectedCountryId = event.value;
  }

  selectFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (this.allowedExtensions.includes(fileExtension)) {
        this.fileName = file.name;
        this.currentFile = file;

        this.validateExcelFile(file);
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: `Solo se permiten archivos con extensiones: ${this.allowedExtensions.join(', ')}`,
        });
        this.resetFileInput();
      }
    }

    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = Constante.EMPTY;
    }
  }

  validateExcelFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {

      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);

      if (rows.length > 100) {
        Swal.fire({
          icon: 'warning',
          title: MensajeConstante.ADVERTENCIA,
          text: MensajeConstante.TAMANIO_ARCHIVO_ESTANDAR,
        });
        this.resetFileInput();
        return
      }

      const sheetData: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      this.numError = 0;

      let listaDias: DiasFestivosDTO[] = sheetData.slice(1).map((row: any) => {
        let dias = new DiasFestivosDTO();
        if (row[0] !== undefined && row[1] !== undefined) {

          dias.ts_Cal_Fecha = null;
          dias.nb_Pais = row[1];

          const excelDate = row[0];
          let date = null;

          if (typeof excelDate === 'number') {
            const epoch = new Date(1900, 0, 0);
            date = new Date(epoch.getTime() + (excelDate - 1) * 86400 * 1000);
          }

          if (date?.toLocaleDateString() !== 'Invalid Date') {
            dias.ts_Cal_Fecha = date;
            const contry = this.contrys.find(c => c.nb_pais?.toUpperCase().replace(/\s+/g, ' ').trim()
              === row[1].toUpperCase().replace(/\s+/g, ' ').trim());

            if (contry && dias.ts_Cal_Fecha !== null) {
              dias.cd_Pais = contry.cd_pais;
              dias.st_status = MensajeConstante.EXITOSO;
            } else {
              this.numError++;
              dias.st_status = MensajeConstante.ERROR;
            }
          } else {
            this.numError++;
            dias.st_status = MensajeConstante.ERROR;
          }

        }

        return dias;
      }).filter((item: any) =>
        item.ts_Cal_Fecha !== undefined &&
        item.nb_Pais !== undefined && item.nb_Pais !== null);

      this.dataSource.data = this.validarDuplicados(
        listaDias,
        MensajeConstante.DUPLICADO_EN_EL_ARCHIVO);

      if (this.listaExitoso.length > 0) {
        this.validarDatosSistema(this.listaExitoso);
      }

      this.totalElements = this.dataSource.data.length;
      this.validateData();
    };
    reader.readAsArrayBuffer(file);
  }

  validarDuplicados(listaDias: DiasFestivosDTO[], nota: string): DiasFestivosDTO[] {
    let lista: DiasFestivosDTO[] = [];
    this.listaExitoso = [];
    listaDias.forEach(dias => {
      let exist = lista.find(d => d.cd_Pais === dias.cd_Pais &&
        d.ts_Cal_Fecha !== null && dias.ts_Cal_Fecha !== null && d.ts_Cal_Fecha?.getTime() === dias.ts_Cal_Fecha?.getTime());

      if (exist !== null && exist !== undefined) {
        dias.st_status = MensajeConstante.ERROR;
        dias.tx_nota = nota;
        this.numError++;
      } else if (dias.st_status === MensajeConstante.EXITOSO) {
        this.listaExitoso.push(dias);
      }
      lista.push(dias);
    });
    return lista;
  }

  upload(): void {
    if (this.currentFile) {
      this.uploadService.upload(this.currentFile).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.fileInfos = this.uploadService.getFiles();
          }
        },
        error: (err: any) => {
          this.progress = 0;

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = MensajeConstante.ERROR_CARGA_DE_ARCHIVO;
          }
        },
        complete: () => {
          this.currentFile = undefined;
        },
      });
    }
  }

  resetFileInput() {
    this.numError = 0;
    this.dataSource.data = [];
    this.fileName = Constante.EMPTY;
    this.currentFile = null;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = Constante.EMPTY;
    }
  }


  validarDatosSistema(listaExitoso: DiasFestivosDTO[]) {
    this.holidaysService.validateHolidaysList(listaExitoso).subscribe(response => {
      if (response !== null && response.length > 0) {
        this.resultValidate(response);
      }
    });
  }

  resultValidate(response: DiasFestivosDTO[]) {
    response.forEach(dias => {
      let exist = this.dataSource.data.find(d => d.cd_Pais === dias.cd_Pais &&
        dias.ts_Cal_Fecha != null && dias.ts_Cal_Fecha !== undefined &&
        d.ts_Cal_Fecha?.toDateString() === new Date(dias.ts_Cal_Fecha).toDateString()
      );

      if (exist !== null && exist !== undefined && exist.st_status !== MensajeConstante.ERROR) {
        exist.st_status = MensajeConstante.ERROR;
        exist.tx_nota = MensajeConstante.DUPLICADO_EN_EL_SISTEMA;
        this.numError++;
      }
    });
  }


  save() {
    Swal.fire({
      title: MensajeConstante.PREGUANTA_GUARADAR_INFORMAICION,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡Guardar!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.holidaysService.SaveHolidaysList(this.dataSource.data).subscribe(response => {
          if (response !== null && response.length > 0) {
            this.resultValidate(response);
            Swal.fire({
              icon: 'error',
              title: MensajeConstante.ADVERTENCIA,
              text: MensajeConstante.ERROR_AL_GUADRAR,
            });
          } else {
            Swal.fire({
              title: '¡Éxito!',
              text: MensajeConstante.REGISTRO_CORECTAMANTE,
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.resetFileInput();
          }
        });
      }
    });
  }

  downloadTemplate() {
    this.holidaysService.downloadTemplate(this.selectedCountryId).subscribe(blob => {
      const downloadUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'Plantilla dias festivos.xlsx';
      link.click();

      URL.revokeObjectURL(downloadUrl);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Mensaje',
        text: MensajeConstante.ERROR_DESCARGA_PLANTILLA,
      });
    });
  }

  validateData() {
    if (this.numError > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: MensajeConstante.REVISAR_INFORMACION,
      });
    }
  }

}


