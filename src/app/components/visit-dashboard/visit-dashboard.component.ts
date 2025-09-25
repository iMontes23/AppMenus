import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { CurrentAccessService } from '../../services/current-access.service';
import { UrlConstante } from '../../utilerias/constantes/url-constante';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-visit-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './visit-dashboard.component.html',
  styleUrl: './visit-dashboard.component.scss'
})
export class VisitDashboardComponent implements OnInit, AfterViewChecked {

  sanitizedUrl: SafeResourceUrl | null;
  show: boolean = false;

  constructor(
    private currentAccessService: CurrentAccessService,
    private sanitizer: DomSanitizer
  ) {
    this.sanitizedUrl = null;
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
  /*   if(!this.show && this.currentAccessService.menu && this.currentAccessService.menu.length > 0){
      this.currentAccessService.menu[0].menuItems.forEach(modulo => {
        const grafica = modulo?.items?.find(m => m.appCode == UrlConstante.DASHBOARD)
        if (grafica && grafica.url) {
          
          setTimeout(() => {
            this.show = true;
            this.sanitizedUrl = this.sanitizeUrl(grafica.url);
          });
        }
      });
    } */
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      url);
  }

  descargar() {
    // const content = document.getElementById('contentToCapture');

    // if (content) {
    //   setTimeout(() => {
    //     html2canvas(content).then(canvas => {
    //       const imgData = canvas.toDataURL('image/png');
    //       const pdf = new jsPDF();

    //       const imgWidth = pdf.internal.pageSize.getWidth();
    //       const imgHeight = (canvas.height * imgWidth) / canvas.width;
    //       pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    //       pdf.save('reporte.pdf');
    //     });
    //   }, 500); // Espera 100 ms
    // } else {
    //   console.error('El contenido no está disponible.');
    // }
  }

  // captureIframe() {
  //   this.http.get('/capture?url=' + encodeURIComponent("https://app.powerbi.com/reportEmbed?reportId=805e3c76-3310-477a-9066-1be2ebcd5d56&autoAuth=true&ctid=b5a920d6-7d3c-44fe-baad-4ffed6b8774d"
  //   ), { responseType: 'blob' }).subscribe(response => {
  //       const blobUrl = URL.createObjectURL(response);
  //       const link = document.createElement('a');
  //       link.href = blobUrl;
  //       link.download = 'captura.png';
  //     link.click();
  //   });
  // }
}
