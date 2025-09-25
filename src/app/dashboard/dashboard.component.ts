import { CommonModule } from '@angular/common';
import { Component, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FavoriteApplicationDTO } from '../utilerias/model/favorite-application-dto';
import { CurrentAccessService } from '../services/current-access.service';
import { MenusService } from '../services/menus.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.scss',
	imports: [CommonModule, RouterOutlet, FormsModule],
	standalone: true
})
export class DashboardComponent implements OnChanges, OnInit {

	applications: FavoriteApplicationDTO;
	titulo: string;
	
	sanitizedUrl: SafeResourceUrl | null;
	show: boolean = false;
	urlReporte?: string;

	constructor(
		private currentAccessService:CurrentAccessService,
		private _menusService:MenusService,
		private sanitizer: DomSanitizer
	) {
		this.applications = new FavoriteApplicationDTO(0, null);
		this.titulo = "App Menús";
		this.sanitizedUrl = null;
	}
	ngOnInit(): void {
		this._menusService.opcionMenu$.subscribe(menu => {
			this.show = menu.url? true: false;
			if(menu.url){
				console.log("Recibiendo url reporte: ", menu.url)
				this.sanitizedUrl = this.sanitizeUrl(menu.url);
			}
		})
	}

	ngOnChanges(changes: SimpleChanges) {
		if(this.currentAccessService.menu.length > 0){
			this.titulo = this.currentAccessService.menu[0].nombre
		}
	}

	updateFavorite(applications: FavoriteApplicationDTO) {
		this.applications = applications
	}

	sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      url);
  }

}
