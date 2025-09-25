import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuItemDTO } from '../utilerias/model/menu-item-dto';

@Injectable({
  providedIn: 'root'
})
export class MenusService {


  private opcion  = new  Subject<MenuItemDTO>();
  opcionMenu$ = this.opcion.asObservable();
  constructor() { }

  MenuSelected(menu:MenuItemDTO){
    this.opcion.next(menu);
  }
}
