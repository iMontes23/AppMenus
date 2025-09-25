import { Component } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { SidebarmenusComponent } from '../../shared/sidebarmenus/sidebarmenus.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-menu-app-layout',
  standalone: true,
  imports: [ 
    RouterOutlet,
    MenuComponent,
    SidebarmenusComponent,
    NavbarComponent
   ],
  templateUrl: './menu-app-layout.component.html',
  styleUrl: './menu-app-layout.component.css'
})
export class MenuAppLayoutComponent {

}
