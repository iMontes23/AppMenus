import { Constante } from "../constantes/constante";

export class FavoriteApplicationDTO {
    id: number;
    appCode: string;
    type: string;
    name: string;
    initials: string;
    description: string;
    color: string;
    icon: string;
    image: string;
    presentationType: string;
    option: string;
    urlTarget:string;
    hasOptions:boolean;
    url:string ;

    constructor(
        id: number,
        appCode: string | null
    ) {
        this.id = id;
        this.appCode = appCode ?? Constante.EMPTY;
        this.type = Constante.EMPTY;
        this.name = Constante.EMPTY;
        this.description = Constante.EMPTY;
        this.color = Constante.EMPTY;
        this.icon = Constante.EMPTY;
        this.image = Constante.EMPTY;
        this.presentationType = Constante.EMPTY;
        this.initials = Constante.EMPTY;
        this.option = Constante.EMPTY;
        this.urlTarget = Constante.EMPTY;
        this.url = Constante.EMPTY;
        this.hasOptions = false;
    }
}