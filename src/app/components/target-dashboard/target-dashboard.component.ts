import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CurrentAccessService } from '../../services/current-access.service';
import { UrlConstante } from '../../utilerias/constantes/url-constante';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-target-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './target-dashboard.component.html',
  styleUrl: './target-dashboard.component.css'
})
export class TargetDashboardComponent implements OnInit, AfterViewChecked {

  sanitizedUrl: SafeResourceUrl | null;
  show: boolean = false;
  @ViewChild('myIframe') myIframe!: ElementRef;

  constructor(
    private currentAccessService: CurrentAccessService,
    private sanitizer: DomSanitizer,
  ) {
    this.sanitizedUrl = null;
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    /* if (!this.show && this.currentAccessService.menu && this.currentAccessService.menu.length > 0) {
      console.log("aqui")
      this.currentAccessService.menu[0].menuItems.forEach(modulo => {
        const grafica = modulo?.items?.find(m => m.appCode == UrlConstante.OBJETIVO)

        if (grafica && grafica.url) {
          console.log("grafica:", grafica)
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
}
