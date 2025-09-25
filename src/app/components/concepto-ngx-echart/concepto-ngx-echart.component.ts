import { Component, OnInit } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import { GraficaCircularComponent } from './grafica-circular/grafica-circular.component';
import { GraficaBarraComponent } from './grafica-barra/grafica-barra.component';
import { GraficaBarraAnvanzadaComponent } from './grafica-barra-anvanzada/grafica-barra-anvanzada.component';
import { GraficaLinealComponent } from './grafica-lineal/grafica-lineal.component';
import { GraficaComboComponent } from './grafica-combo/grafica-combo.component';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-concepto-ngx-echart',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatButtonModule,
    NgxEchartsModule,
    GraficaBarraComponent,
    GraficaCircularComponent,
    GraficaBarraAnvanzadaComponent,
    GraficaLinealComponent,
    GraficaComboComponent
  ],
  templateUrl: './concepto-ngx-echart.component.html',
  styleUrl: './concepto-ngx-echart.component.scss'
})
export class ConceptoNgxEchartComponent implements OnInit {

  private pageOrientation: 'portrait' | 'landscape' = 'portrait';
  private reporteCompleta: string = 'Reporte_principal.pdf';
  private reporteSegmentada: string = 'Reporte_principal_segmentada.pdf';

  async ngOnInit() {
  }

  async descargarUnaCaptura() {
    const content = document.getElementById('contenidoPrincipal');
    const tablaPDF = document.querySelector('.soloParaPDF') as HTMLElement;
    if (tablaPDF) {
      tablaPDF.style.display = 'table'; // la hace visible
    }

    if (content) {
      setTimeout(() => {
        html2canvas(content).then((canvas: HTMLCanvasElement) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();

          const imgWidth = pdf.internal.pageSize.getWidth();
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          //Deteminacion de numero de paginas
          const pageHeight = pdf.internal.pageSize.getHeight();
          let totalPages = Math.ceil(imgHeight / pageHeight); // Número de páginas

          // Comenzamos con la primera página
          let posHeigth = 0; // Offset vertical para la imagen en cada página

          for (let i = 0; i < totalPages; i++) {

            if (i > 0) {
              pdf.addPage();
            }

            const yPosition = -posHeigth;

            // Añadimos la imagen, ajustada a la página
            pdf.addImage(imgData, 'PNG', 0, yPosition, imgWidth, imgHeight);

            // Aumentamos el desplazamiento vertical
            posHeigth += pageHeight;
          }

          pdf.save(this.reporteCompleta);
          if (tablaPDF) {//la oculta
            tablaPDF.style.display = 'none';
          }
        });
      }, 500);
    } else {
      console.error('El contenido no está disponible.');
    }
  }

  async descargarSegmento() {
    const headerElement = document.getElementById('Captura0');
    const headerElement2 = document.getElementById('Captura01');
    const elementos = [
      document.getElementById('Captura1'),
      document.getElementById('Captura2'),
      document.getElementById('Captura3'),
      document.getElementById('Captura4'),
      document.getElementById('Captura6'),
      document.getElementById('Captura5')
    ];

    const contents = elementos.filter(element => element !== null);
    const tablaPDF = document.querySelector('.soloParaPDF') as HTMLElement;
    if (tablaPDF) {
      tablaPDF.style.display = 'table';
    }

    // await setTimeout(() => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const pdf = new jsPDF(this.pageOrientation, 'mm', 'letter');
      // Márgenes
      const margin = 10;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = pageWidth - 2 * margin; // Ancho de la imagen con márgenes
      let cursorY = margin;

      // Capturar encabezado
      let headerImg: string | null = null;
      let headerHeight = 0;
      if (headerElement) {
        const canvasHeader = await html2canvas(headerElement);
        headerImg = canvasHeader.toDataURL('image/png');
        headerHeight = (canvasHeader.height * imgWidth) / canvasHeader.width;
      }

      let headerImg2: string | null = null;
      let headerHeight2 = 0;
      if (headerElement2) {
        const canvasHeader = await html2canvas(headerElement2);
        headerImg2 = canvasHeader.toDataURL('image/png');
        headerHeight2 = (canvasHeader.height * imgWidth) / canvasHeader.width;
      }

      contents.forEach((content, index) => {
        if (content !== null) {
          html2canvas(content,
            {
              onclone: (document) => {
                const canvas = document.querySelector('canvas');
                if (canvas && canvas instanceof HTMLCanvasElement) {
                  const ctx = canvas.getContext('2d', { willReadFrequently: true });
                }
              }
            }).then((canvas: HTMLCanvasElement) => {
              if (tablaPDF) {
                tablaPDF.style.display = 'none';
              }
              // Calculamos la altura proporcional
              const pageHeight = pdf.internal.pageSize.getHeight();
              const imgData = canvas.toDataURL('image/png');
              const imgHeight = (canvas.height * imgWidth) / canvas.width;

              if (cursorY + imgHeight > pageHeight - margin) {
                pdf.addPage();
                cursorY = margin;

                if (headerImg) {
                  pdf.addImage(headerImg, 'PNG', margin, cursorY, imgWidth, headerHeight);
                  cursorY += headerHeight; // espacio después del header
                }
              }else if(index === 0){
                if (headerImg) {
                  pdf.addImage(headerImg, 'PNG', margin, cursorY, imgWidth, headerHeight);
                  cursorY += headerHeight; // espacio después del header
                }

                if (headerImg2) {
                  pdf.addImage(headerImg2, 'PNG', margin, cursorY, imgWidth, headerHeight2);
                  cursorY += headerHeight2; // espacio después del header
                }
              }

              // Agregamos la imagen al PDF en la página actual
              pdf.addImage(imgData, 'PNG', margin, cursorY, imgWidth, imgHeight);
              cursorY += imgHeight;

              // Si es el último contenido, guardamos el PDF
              if (index === contents.length - 1) {
                pdf.save(this.reporteSegmentada);
              }
            });
        }
      });
  }
}

