import { Constante } from "../constantes/constante";

export class MenuItemDTO {
    appCode: string;
    type: string;
    name: string;
    url: string;
    urlTarget: string;
    items: MenuItemDTO[] | null; ;
    isOpen: boolean;
    modulo: string;
    nameAux:string;
    // IGNACIO: Nueva propiedad para la descripción
    descripcionOpcion?: string;
    descripcion?: string;
    nombreMenuPadre?: string;
    subMenu?: string;
    nombreOpcion?: string;
    objetivo?: string;
    nombre?: string;
    category?: string;
    nombreMenu?: string;
    nombreModulo?: string;

    constructor(
        appCode: string | null,
        type: string | null,
        name: string | null,
        url: string | null,
        urlTarget: string | null,
        items: MenuItemDTO[] = [],
        //descripcion: string | null = null // Parámetro opcional
        descripcionOpcion: string | null,
        nombreMenuPadre: string | null,
        subMenu: string | null,
        nombreOpcion: string | null,
        objetivo: string | null,
        nombre: string | null,
        category: string | null,
        nombreMenu: string | null,
        nombreModulo: string | null
    ) {
        this.appCode = appCode ?? Constante.EMPTY;
        this.type = type ?? Constante.EMPTY;
        this.name = name ?? Constante.EMPTY;
        this.url = url ?? Constante.EMPTY;
        this.urlTarget = urlTarget ?? Constante.EMPTY;
        this.items = items ?? [];
        this.isOpen = false;
        this.modulo = Constante.EMPTY;
        this.nameAux = name ?? Constante.EMPTY;
        // IGNACIO: Inicializar descripción
        this.descripcionOpcion = descripcionOpcion ?? Constante.EMPTY;
        this.nombreMenuPadre = nombreMenuPadre ?? Constante.EMPTY;
        this.subMenu = subMenu ?? Constante.EMPTY;
        this.nombreOpcion = nombreOpcion ?? Constante.EMPTY;
        this.objetivo = objetivo ?? Constante.EMPTY;
        this.nombre = nombre ?? Constante.EMPTY;
        this.category = category ?? Constante.EMPTY;
        this.nombreMenu = nombreMenu ?? Constante.EMPTY;
        this.nombreModulo = nombreModulo ?? Constante.EMPTY;
    }
}