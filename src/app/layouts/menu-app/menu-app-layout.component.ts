import { Component } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { SidebarmenusComponent } from '../../shared/sidebarmenus/sidebarmenus.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MenuItemDTO } from '../../utilerias/model/menu-item-dto';

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
export class MenuAppLayoutComponent {
  selectedMenu: MenuItemDTO | null = null;

  nombreMenuPadre: string = '';
  nombreSubmenu: string = '';
  nombreOpcion: string = '';
  descripcionReporte: string = '';

  

  onMenuClick(menu: MenuItemDTO) {
    this.selectedMenu = menu;
    console.log('Menú seleccionado en layout:', menu);
    this.nombreMenuPadre = menu.nombreMenuPadre || '';
    this.nombreSubmenu = menu.subMenu || '';
    this.nombreOpcion = menu.nombre || '';
    this.descripcionReporte = menu.descripcionOpcion || '';
  }

get formattedCategory(): string {
  const category = this.selectedMenu?.category ?? '';
  
  const replaced = category.replace(/#/g, '/');
  
  const firstSlashIndex = replaced.indexOf('/');
  return firstSlashIndex !== -1 ? replaced.substring(firstSlashIndex) : replaced;
}

}