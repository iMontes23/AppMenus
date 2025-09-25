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
    
    constructor(
        appCode: string | null,
        type: string | null,
        name: string | null,
        url: string | null,
        urlTarget: string | null,
        items: MenuItemDTO[] = []
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
    }
}