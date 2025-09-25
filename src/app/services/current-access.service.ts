import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserApplicationDTO } from '../utilerias/model/user-application-dto';
import { Constante } from '../utilerias/constantes/constante';
import { MenuItemDTO } from '../utilerias/model/menu-item-dto';
import { UrlConstante } from '../utilerias/constantes/url-constante';
import { Router } from '@angular/router';
import { UserInformation } from '../utilerias/model/user-information';
import { Observable } from 'rxjs';
import { MenuAppItem } from '../utilerias/model/menu-app-item';

@Injectable({
  providedIn: 'root'
})
export class CurrentAccessService {

  private userInformation: UserInformation;
  public menu: MenuAppItem[] = [];
  public applications: UserApplicationDTO[] = [];
  public nameApplication: string;
  public codeApplication: string;
  navigation = UrlConstante.VIEW;

  constructor(
    public http: HttpClient,
    private router: Router
  ) {
    this.applications = [];
    this.nameApplication = Constante.EMPTY;
    this.codeApplication = Constante.EMPTY;
    this.userInformation = new UserInformation();
  }

  getUserInformation() {
    /* 
    this.userInformation.userID = 'u01r907';
    this.userInformation.name = 'Isaac'
    this.userInformation.apPaterno='Gonzalez'
    this.userInformation.apMaterno='Montes' 
    */
   
    return this.userInformation;
  }

  setUserInformation(userInformation: UserInformation) {
    this.userInformation = userInformation;
  }

  addApplication(application: UserApplicationDTO): void {
    if (!this.applications.some(tab => tab.appCode === application.appCode)) {
      this.applications.push(application);
    }
  }

  removeApplication(appCode: string): void {
    this.applications = this.applications.filter(app => app.appCode !== appCode);
  }

  /**
   * 
   * @param option 
   * @param application 
   */
  addOption(option: MenuItemDTO, application: UserApplicationDTO): void {
    const app = this.applications.find(app => app.appCode === application.appCode)
    if (app !== undefined && app !== null && !app.menuItems.some(tab => tab.appCode === option.appCode)) {
      app.menuItems.push(option);
    } else if (application.appCode !== null && (app === undefined || app === null)) {
      application.menuItems.push(option);
      this.applications.push(application);
    }
  }

  addVinTab(option: MenuItemDTO, application: UserApplicationDTO): Observable<MenuItemDTO> {
    return new Observable<MenuItemDTO>(observer => {
      try {
        const app = this.applications.find(app => app.appCode === application.appCode)
        if (app !== undefined && app !== null && !app.menuItems.some(tab => tab.appCode === option.appCode)) {
          app.menuItems.push(option);
          observer.next(option);
        } else if (application.appCode !== null && (app === undefined || app === null)) {
          application.menuItems.push(option);
          this.applications.push(application);
          observer.next(option);
        }

      } catch (error) {
        observer.error(error);
      }
    });
  }

  /**
   * 
   * @param option 
   * @param nameApp
   */
  addOptionByNameAplication(option: MenuItemDTO, nameApp: string): Observable<UserApplicationDTO> {
    return new Observable<UserApplicationDTO>(observer => {
      try {
        const app = this.applications.find(app => app.application.toLowerCase() === nameApp.toLowerCase());

        if (app !== undefined && app !== null && option.url) {
          // is added at the tab level
          const itemExist = app.menuItems.find(tab => tab.appCode === option.appCode);
          if (itemExist !== undefined && itemExist !== null) {
            itemExist.url = option.url;
          } else {
            const countTab = app.menuItems.filter(tab => tab.nameAux === option.name).length;

            const item = Object.assign({}, app.menuItems[0]);
            item.appCode = option.appCode;
            item.name = option.name + (countTab > 0 ? " (" + countTab + ")" : "");
            item.nameAux = option.name;
            item.url = option.url;
            item.modulo = option.modulo;
            app.menuItems.push(item);
          }
          observer.next(app);
        } else {
          // is added at the application level
          const appExist = this.applications.find(app => app.appCode === option.appCode);

          if (appExist !== undefined && appExist !== null) {
            appExist.url = option.url;
            observer.next(appExist);
          } else {
            const countApp = this.applications.filter(app => app.nameAux === option.name).length;

            const newApp = Object.assign({}, this.applications[0]);
            newApp.menuItems = [];
            newApp.appCode = option.appCode;
            newApp.application = option.name + (countApp > 0 ? " (" + countApp + ")" : "");
            newApp.nameAux = option.name;
            newApp.url = option.url;
            this.applications.push(newApp);
            observer.next(newApp);
          }
        }
        observer.complete();
      } catch (error) {
        // Emitimos un error si algo sale mal
        observer.error(error);
      }
    });
  }


  /**
   * 
   * @param favoriteAppCode 
   */
  navigateOption(favoriteAppCode: string, externa: boolean) {
   /*  this.menu.forEach(app => {
      app.menuItems.forEach(modulo => {
        if (modulo.items && modulo.items.length > 0 && externa) {
          const appTab = Object.assign({}, app);
          appTab.menuItems = [];
          this.menuItems(favoriteAppCode, modulo, appTab);
        }
      });
    }); */
  }

  private menuItems(favoriteAppCode: string, modulo: MenuItemDTO, appTab: UserApplicationDTO) {
    if (modulo.items) {
      modulo.items.forEach(menuitems => {
        if (menuitems.items !== null && menuitems.items.length > 0) {
          this.menuItems(favoriteAppCode, menuitems, appTab);
        }
        else if (menuitems.appCode === favoriteAppCode) {
          menuitems.modulo = modulo.name;
          this.addOption(menuitems, appTab)
          this.router.navigate([`${UrlConstante.TAB_APLICATION}${appTab.appCode}/${UrlConstante.VIEW}`, appTab.application, modulo.name, menuitems.name]);
          return;
        }
      });
    }
  }

}
