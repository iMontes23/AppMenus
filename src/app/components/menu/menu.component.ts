import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MenuItemDTO } from '../../utilerias/model/menu-item-dto';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Constante } from '../../utilerias/constantes/constante';
import { UserApplicationDTO } from '../../utilerias/model/user-application-dto';
import { UrlConstante } from '../../utilerias/constantes/url-constante';
import { MenusService } from '../../services/menus.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIcon
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  @Input() menuitems: MenuItemDTO[];
  @Input() modulo;
  @Input() application: UserApplicationDTO;
  @Input() appCode: string;

  navigation: string = UrlConstante.VIEW;
  vinItems: MenuItemDTO[];

  @ViewChildren('optionElement') optionElements!: QueryList<ElementRef>;

  constructor(
    private _menusService:MenusService
  ) {
    this.menuitems = [];
    this.application = new UserApplicationDTO(null, null, null, null, null, null, null, null, null, null);
    this.modulo = Constante.EMPTY;
    this.vinItems = [];
    this.appCode = Constante.EMPTY;
  }

  ngOnInit() {
    this.menuitems.forEach(element => {
      if ((element.appCode === Constante.INPUT_VIN || element.appCode === Constante.INPUT_VINWR) && element.items && element.items.length > 0) {
        this.vinItems.push(element.items[0]);
      }
    });
  }

  openBlank(item: MenuItemDTO): void {
    window.open(item.url, Constante.NEW_TAB);
  }

  loadReport(opcionMenuL3:MenuItemDTO){
    if(opcionMenuL3){
      this._menusService.MenuSelected(opcionMenuL3);
    }
  }
  
}
