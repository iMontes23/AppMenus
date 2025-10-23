import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { SidebarmenusComponent } from '../../shared/sidebarmenus/sidebarmenus.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MenuItemDTO } from '../../utilerias/model/menu-item-dto';
import { CurrentAccessService } from '../../services/current-access.service';
import { MenusService } from '../../services/menus.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-menu-app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MenuComponent,
    SidebarmenusComponent,
    NavbarComponent
  ],
  templateUrl: './menu-app-layout.component.html',
  styleUrls: ['./menu-app-layout.component.css']
})
export class MenuAppLayoutComponent implements OnInit {
  selectedMenu: MenuItemDTO | null = null;

  nombreMenuPadre: string = '';
  nombreSubmenu: string = '';
  nombreOpcion: string = '';
  descripcionReporte: string = '';

  show: boolean = false;

  constructor(
    private currentAccessService: CurrentAccessService,
    private _menusService: MenusService,
    private sanitizer: DomSanitizer
  ) {
  }

  onMenuClick(menu: MenuItemDTO) {
    this.selectedMenu = menu;
    console.log('Menu seleccionado:', menu);
    //this.nombreMenuPadre = menu.nombreMenuPadre || ''; ICG: DEPRECADO
    //this.nombreSubmenu = menu.subMenu || ''; ICG: DEPRECADO
    this.nombreOpcion = menu.nombre || '';
    this.descripcionReporte = menu.descripcionOpcion || '';
  }

get formattedCategory(): string {
  const category = this.selectedMenu?.category ?? '';

  if (category.startsWith('REPO#')) {
    const parts = category.split('#');
    if (parts.length >= 3) {
      return `/${parts[2]}`;
    }
  }
  const replaced = category.replace(/#/g, '/');
  const firstSlashIndex = replaced.indexOf('/');
  return firstSlashIndex !== -1 ? replaced.substring(firstSlashIndex) : replaced;
}

  ngOnInit(): void {
    this._menusService.opcionMenu$.subscribe(menu => {
      this.show = menu.url ? true : false;

    })
  }

}