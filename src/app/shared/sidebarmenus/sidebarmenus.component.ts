import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SecurityService } from '../../services/securiry.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentAccessService } from '../../services/current-access.service';
import { Constante } from '../../utilerias/constantes/constante';
import { CommonModule } from '@angular/common';
import { MenuItemDTO } from '../../utilerias/model/menu-item-dto';
import { FormsModule } from '@angular/forms';
import { MenusService } from '../../services/menus.service';
import { MenuAppItem } from '../../utilerias/model/menu-app-item';
import { Mensajes } from '../../services/mensajes';
import { MensajeConstante } from '../../utilerias/constantes/mensaje-constante';

@Component({
  selector: 'app-sidebarmenus',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './sidebarmenus.component.html',
  styleUrl: './sidebarmenus.component.css'
})
export class SidebarmenusComponent implements OnInit {
  public menuItems: MenuAppItem[] = [];
  public menuItemsFilter: MenuAppItem[] = [];
  public JSON_TEST: MenuAppItem[] = [
    {
      "isOpen": false, "id": 1,
      "parentId": 1,
      "nombre": "Customer Solution",
      "codigo": '',
      "descripcion": '',
      "orden": 1,
      "activo": true,
      "esApp": false,
      "url": '',
      "items": [
        {
          "isOpen": false, "id": 2,
          "parentId": 1,
          "nombre": "Servicios conectados",
          "codigo": "RptBi_ServConect",
          "descripcion": '',
          "orden": 1,
          "activo": true,
          "esApp": true,
          "url": '',
          "items": [
            {
              "isOpen": false, "id": 0,
              "parentId": 1,
              "nombre": "Eficiencia Operativa",
              "codigo": "RptBi_ServConect",
              "descripcion": '',
              "orden": 0,
              "activo": false,
              "esApp": true,
              "url": "https://app.powerbi.com/Redirect?action=OpenReport&appId=2c974bd8-d749-45e8-9530-9c0218e25da7&reportObjectId=de55a980-24d9-4512-a737-a4898694eccd&ctid=b5a920d6-7d3c-44fe-baad-4ffed6b8774d&reportPage=ReportSection&pbi_source=appShareLink&portalSessionId=95e",
              "items": []
            },
            {
              "isOpen": false, "id": 0,
              "parentId": 1,
              "nombre": "Flash_Review_S13_SC_LATAM",
              "codigo": "Flash_Review_S13_SC_LATAM",
              "descripcion": '',
              "orden": 0,
              "activo": false,
              "esApp": false,
              "url": '',
              "items": [
                {
                  "isOpen": false, "id": 0,
                  "parentId": 1,
                  "nombre": "Estatus",
                  "codigo": "estatus",
                  "descripcion": '',
                  "orden": 0,
                  "activo": false,
                  "esApp": true,
                  "url": "https://app.powerbi.com/groups/me/apps/2c974bd8-d749-45e8-9530-9c0218e25da7/reports/ba3a98e5-643d-4b7b-8208-c094273ba7da/9e36c1b77f98577e71d1?ctid=b5a920d6-7d3c-44fe-baad-4ffed6b8774d&experience=power-bi",
                  "items": []
                },
                {
                  "isOpen": false, "id": 0,
                  "parentId": 1,
                  "nombre": "Operación",
                  "codigo": "operacion",
                  "descripcion": '',
                  "orden": 0,
                  "activo": false,
                  "esApp": true,
                  "url": "https://app.powerbi.com/Redirect?action=OpenReport&appId=2c974bd8-d749-45e8-9530-9c0218e25da7&reportObjectId=de55a980-24d9-4512-a737-a4898694eccd&ctid=b5a920d6-7d3c-44fe-baad-4ffed6b8774d&reportPage=ReportSection&pbi_source=appShareLink&portalSessionId=95e",
                  "items": []
                }
              ]
            },
            {
              "isOpen": false, "id": 0,
              "parentId": 1,
              "nombre": "Indicadores",
              "codigo": "RptBi_ServConect",
              "descripcion": '',
              "orden": 0,
              "activo": false,
              "esApp": true,
              "url": "https://app.powerbi.com/groups/me/reports/e6aaceb9-1140-4ab3-9d8a-fc79e99e2cde/f62986eced3dd2336757?ctid=b5a920d6-7d3c-44fe-baad-4ffed6b8774d&experience=power-bi",
              "items": []
            },
            {
              "isOpen": false, "id": 0,
              "parentId": 1,
              "nombre": "Servicios Conectados Latinamerica",
              "codigo": "Servicios Conectados Latinamerica",
              "descripcion": '',
              "orden": 0,
              "activo": false,
              "esApp": false,
              "url": '',
              "items": [
                {
                  "isOpen": false, "id": 0,
                  "parentId": 1,
                  "nombre": "Operación",
                  "codigo": "operacion",
                  "descripcion": '',
                  "orden": 0,
                  "activo": false,
                  "esApp": true,
                  "url": "https://app.powerbi.com/groups/me/apps/9e1d5e4f-fe9f-42f5-af87-565534b2e3f2/reports/670838f4-9f7a-4cba-af56-35e8016478d4/ReportSection2919c6b4cf9215601c70?ctid=b5a920d6-7d3c-44fe-baad-4ffed6b8774d&experience=power-bi",
                  "items": []
                },
                {
                  "isOpen": false, "id": 0,
                  "parentId": 1,
                  "nombre": "Analisis por dia",
                  "codigo": "analisis por dia",
                  "descripcion": '',
                  "orden": 0,
                  "activo": false,
                  "esApp": true,
                  "url": "https://app.powerbi.com/groups/me/apps/9e1d5e4f-fe9f-42f5-af87-565534b2e3f2/reports/670838f4-9f7a-4cba-af56-35e8016478d4/ReportSection3ac5b697defb191b2207?ctid=b5a920d6-7d3c-44fe-baad-4ffed6b8774d&experience=power-bi",
                  "items": []
                }
              ]
            }
          ]
        },
        {
          "isOpen": false, "id": 3,
          "parentId": 1,
          "nombre": "Portafolio",
          "codigo": "RptBi_Portafolio",
          "descripcion": '',
          "orden": 1,
          "activo": false,
          "esApp": true,
          "url": '',
          "items": [
            {
              "isOpen": false, "id": 0,
              "parentId": 1,
              "nombre": "Paquetes de Mantenimiento",
              "codigo": "RptBi_Portafolio",
              "descripcion": '',
              "orden": 0,
              "activo": false,
              "esApp": true,
              "url": "https://app.powerbi.com/groups/me/apps/2c974bd8-d749-45e8-9530-9c0218e25da7/reports/3c35d448-7c5c-439e-bc15-f6bd96c34735/416dcdce00c3c9454031?ctid=b5a920d6-7d3c-44fe-baad-4ffed6b8774d&experience=power-bi",
              "items": []
            }
          ]
        }
      ]
    },
    {
      "isOpen": false, "id": 4,
      "parentId": 1,
      "nombre": "Parts & Sales",
      "codigo": "RptBi_Part&Sales",
      "descripcion": '',
      "orden": 1,
      "activo": false,
      "esApp": true,
      "url": '',
      "items": [
        {
          "isOpen": false, "id": 0,
          "parentId": 1,
          "nombre": "Retail",
          "codigo": "Retail",
          "descripcion": '',
          "orden": 0,
          "activo": false,
          "esApp": false,
          "url": '',
          "items": [
            {
              "isOpen": false, "id": 0,
              "parentId": 1,
              "nombre": "Avance Diario",
              "codigo": "Avance Diario",
              "descripcion": '',
              "orden": 0,
              "activo": false,
              "esApp": true,
              "url": "https://app.powerbi.com/groups/f996530e-9c29-41cd-9858-8c8e432a413f/reports/865cb55d-8b90-4095-aded-b343b9c9659d/d213612e874a39d753d1?experience=power-bi",
              "items": []
            },
            {
              "isOpen": false, "id": 0,
              "parentId": 1,
              "nombre": "Mezcla y Avance GRV",
              "codigo": "Mezcla y Avance GRV",
              "descripcion": '',
              "orden": 0,
              "activo": false,
              "esApp": true,
              "url": "https://app.powerbi.com/groups/f996530e-9c29-41cd-9858-8c8e432a413f/reports/865cb55d-8b90-4095-aded-b343b9c9659d/cfae1d28d8060c39b356?experience=power-bi",
              "items": []
            },
            {
              "isOpen": false, "id": 0,
              "parentId": 1,
              "nombre": "Acumulado Anual",
              "codigo": "Acumulado Anual",
              "descripcion": '',
              "orden": 0,
              "activo": false,
              "esApp": true,
              "url": "https://app.powerbi.com/groups/f996530e-9c29-41cd-9858-8c8e432a413f/reports/865cb55d-8b90-4095-aded-b343b9c9659d/f7fdecc5d275a518c2f9?experience=power-bi",
              "items": []
            }
          ]
        },
        {
          "isOpen": false, "id": 0,
          "parentId": 1,
          "nombre": "Venta por ship to code",
          "codigo": "RptBi_Part&Sales",
          "descripcion": '',
          "orden": 0,
          "activo": false,
          "esApp": true,
          "url": "https://app.powerbi.com/groups/f996530e-9c29-41cd-9858-8c8e432a413f/reports/87068f79-8070-4eee-a6fa-12b22785d05b/9fcffe6a721274942b70?experience=power-bi",
          "items": []
        },
        {
          "isOpen": false, "id": 0,
          "parentId": 1,
          "nombre": "DeepDive",
          "codigo": "RptBi_Part&Sales",
          "descripcion": '',
          "orden": 0,
          "activo": false,
          "esApp": true,
          "url": "https://app.powerbi.com/groups/f996530e-9c29-41cd-9858-8c8e432a413f/reports/b70c28ed-9217-49b4-a151-3cbcec1c7068/3f59a700aa2ae13c2e54?experience=power-bi",
          "items": []
        },
        {
          "isOpen": false, "id": 0,
          "parentId": 1,
          "nombre": "Cuentas Clave",
          "codigo": "Cuentas Clave",
          "descripcion": '',
          "orden": 0,
          "activo": false,
          "esApp": false,
          "url": '',
          "items": [
            {
              "isOpen": false, "id": 0,
              "parentId": 1,
              "nombre": "FC Fact Cliente",
              "codigo": "FC Fact Cliente",
              "descripcion": "Reporte que muestra la Facturacion del Programa Fleet Control",
              "orden": 0,
              "activo": false,
              "esApp": true,
              "url": "https://app.powerbi.com/groups/f996530e-9c29-41cd-9858-8c8e432a413f/reports/2e40528b-a868-4377-9ed5-57f60563872d/d0d467c0408d802705e2?experience=power-bi",
              "items": []
            },
            {
              "isOpen": false, "id": 0,
              "parentId": 1,
              "nombre": "FC Fact Distribuidor",
              "codigo": "FC Fact Distribuidor",
              "descripcion": '',
              "orden": 0,
              "activo": false,
              "esApp": true,
              "url": "https://app.powerbi.com/groups/f996530e-9c29-41cd-9858-8c8e432a413f/reports/2e40528b-a868-4377-9ed5-57f60563872d/d52d9c14b49e392649c0?experience=power-bi",
              "items": []
            },
            {
              "isOpen": false, "id": 0,
              "parentId": 1,
              "nombre": "FC  Venta Neta Cliente",
              "codigo": "FC  Venta Neta Cliente",
              "descripcion": '',
              "orden": 0,
              "activo": false,
              "esApp": true,
              "url": "https://app.powerbi.com/groups/f996530e-9c29-41cd-9858-8c8e432a413f/reports/2e40528b-a868-4377-9ed5-57f60563872d/288f23935eba3e24edb5?experience=power-bi",
              "items": []
            },
            {
              "isOpen": false, "id": 0,
              "parentId": 1,
              "nombre": "FC Venta Neta Distribuidor",
              "codigo": "FC Venta Neta Distribuidor",
              "descripcion": "Reporte que muestra la Facturacion del Programa Fleet Control",
              "orden": 0,
              "activo": false,
              "esApp": true,
              "url": "https://app.powerbi.com/groups/f996530e-9c29-41cd-9858-8c8e432a413f/reports/2e40528b-a868-4377-9ed5-57f60563872d/fa9bcdc2401329337515?experience=power-bi",
              "items": []
            }
          ]
        }
      ]
    }
  ]

  imgLogoInternatinal: string;
  cargando: boolean;
  filtro?: any

  constructor(
    private securityService: SecurityService,
    private activatedRoute: ActivatedRoute,
    private currentAccessService: CurrentAccessService,
    private _menusService: MenusService,
    private msg: Mensajes
  ) {
    this.imgLogoInternatinal = Constante.EMPTY;
    this.cargando = true;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if (this.currentAccessService.menu.length > 0) {
        this.menuItems = this.currentAccessService.menu
        this.cargando = false;
      } else {
        this.getApplicationUser();
      }
    });
  }

  //ICG
  private mapMenuItems(items: any[]): any[] {
    return items.map(item => ({
      ...item,
      descripcionOpcion: item.descripcion || item.descripcionOpcion,
      items: item.items ? this.mapMenuItems(item.items) : []
    }));
  }

  private getApplicationUser() {
    this.securityService.getMenu("AppMenus").subscribe(response => {
      //ICG
      console.log('JSON crudo desde API:', response);

      this.menuItems = this.mapMenuItems(response);
      this.menuItemsFilter = this.menuItems;
      this.currentAccessService.menu = this.menuItems;
      this.cargando = false;

      if (this.menuItems.length === 0)
        this.msg.warning("", MensajeConstante.SIN_ACCESO_MENUS)
    });

    // this.menuItems = this.JSON_TEST;
    // this.menuItemsFilter = this.menuItems; 
    // this.cargando = false;
  }

  onTyping(event: KeyboardEvent) {
    const texto = this.filtro.toLowerCase();

    if (!texto) {
      this.menuItemsFilter = this.menuItems;
      return;
    }

    this.menuItemsFilter = this.menuItems
      .map(m => this.filtrarMenu(m, texto))
      .filter((m): m is MenuAppItem => m !== null);

    /*  const arbolFiltrado = this.menuItems
       .map(root => this.filtrarMenu(root, texto))
       .filter((n): n is MenuAppItem => n !== null);
 
     arbolFiltrado.forEach(root => this.imprimirMenu(root)); */
  }

  filtrarMenu(nodo: MenuAppItem, filtro: string): MenuAppItem | null {
    const cumple = nodo.nombre.toLowerCase().includes(filtro);

    let hijosFiltrados: MenuAppItem[] = [];
    if (nodo.items && nodo.items.length > 0) {
      hijosFiltrados = nodo.items
        .map(hijo => this.filtrarMenu(hijo, filtro))
        .filter((hijo): hijo is MenuAppItem => hijo !== null);
    }

    if (cumple || hijosFiltrados.length > 0) {
      return {
        ...nodo,
        items: hijosFiltrados.length > 0 ? hijosFiltrados : []
      };
    }
    return null;
  }

  imprimirMenu(nodo: MenuAppItem, nivel: number = 0) {
    console.log(" ".repeat(nivel * 2) + nodo.nombre);
    if (nodo.items) {
      nodo.items.forEach(hijo => this.imprimirMenu(hijo, nivel + 1));
    }
  }

  @Output() menuSelected = new EventEmitter<MenuItemDTO>();
  loadReport(opcionMenuL3: MenuItemDTO, padre?: MenuItemDTO, subMenu?: MenuItemDTO) {
    if (opcionMenuL3 && opcionMenuL3.url) {

      const menuMapped: MenuItemDTO = {
        ...opcionMenuL3,
        descripcionOpcion: opcionMenuL3.descripcion || opcionMenuL3.descripcionOpcion,
        //nombreMenuPadre: padre?.nombre || '', ICG: DEPRECADO
        //subMenu: subMenu?.subMenu || '', ICG: DEPRECADO
        nombreOpcion: opcionMenuL3.nombreOpcion || ''
      };
      this.menuSelected.emit(menuMapped);
      this._menusService.MenuSelected(menuMapped);
    }
  }
  limpiaFiltro() {
    this.filtro = null;
    this.menuItemsFilter = this.menuItems
  }
  tooltipText = '';
  tooltipX = 0;
  tooltipY = 0;

  showTooltip(text: string, event: MouseEvent) {
    this.tooltipText = text;
    this.tooltipX = event.clientX + 10;
    this.tooltipY = event.clientY + 10;
  }

  hideTooltip() {
    this.tooltipText = '';
  }
}