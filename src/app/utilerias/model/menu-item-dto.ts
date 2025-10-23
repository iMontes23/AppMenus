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
    application?: string;
    //nombreMenuPadre?: string; ICG: DEPRECADO
    //subMenu?: string; ICG: DEPRECADO
    nombreOpcion?: string;
    objetivo?: string;
    nombre?: string;
    category?: string;
    //nombreMenu?: string; ICG: DEPRECADO
    //nombreModulo?: string; ICG: DEPRECADO

    constructor(
        appCode: string | null,
        type: string | null,
        name: string | null,
        url: string | null,
        urlTarget: string | null,
        items: MenuItemDTO[] = [],
        //descripcion: string | null = null // Parámetro opcional
        descripcionOpcion: string | null,
        //nombreMenuPadre: string | null, ICG: DEPRECADO
        //subMenu: string | null, ICG: DEPRECADO
        nombreOpcion: string | null,
        objetivo: string | null,
        nombre: string | null,
        category: string | null,
        application: string | null
        //nombreMenu: string | null, ICG: DEPRECADO
        //nombreModulo: string | null ICG: DEPRECADO
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
        //this.nombreMenuPadre = nombreMenuPadre ?? Constante.EMPTY; ICG: DEPRECADO
        //this.subMenu = subMenu ?? Constante.EMPTY; ICG: DEPRECADO
        this.nombreOpcion = nombreOpcion ?? Constante.EMPTY;
        this.objetivo = objetivo ?? Constante.EMPTY;
        this.nombre = nombre ?? Constante.EMPTY;
        this.category = category ?? Constante.EMPTY;//ICG category?.replaceAll("#", "/") ?? Constante.EMPTY;
        this.application = application ?? Constante.EMPTY;
        //this.nombreMenu = nombreMenu ?? Constante.EMPTY; ICG: DEPRECADO
        //this.nombreModulo = nombreModulo ?? Constante.EMPTY; ICG: DEPRECADO
    }
}