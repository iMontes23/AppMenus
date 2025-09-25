import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { CurrentAccessService } from '../../services/current-access.service';
import { UrlConstante } from '../../utilerias/constantes/url-constante';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-goals-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './goals-dashboard.component.html',
  styleUrl: './goals-dashboard.component.css'
})
export class GoalsDashboardComponent implements OnInit, AfterViewChecked {

  sanitizedUrl: SafeResourceUrl | null;
  show: boolean = false;

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
      this.currentAccessService.menu[0].menuItems.forEach(modulo => {
        const grafica = modulo?.items?.find(m => m.appCode == UrlConstante.CUMPLIMIENTO)
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
}
