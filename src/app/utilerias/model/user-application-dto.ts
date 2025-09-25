import { Constante } from "../constantes/constante";
import { MenuItemDTO } from "./menu-item-dto";

export class UserApplicationDTO {
    appCode: string;
    type: string;
    urlTarget: string;
    url: string;
    application: string;
    color: string;
    icon: string;
    image: string;
    presentationType: string;
    initials: string;
    menuItems: MenuItemDTO[];
    isOpen: boolean;
    hasOptions:boolean;
    server:string;

    nameAux: string;

    constructor(
        appCode: string | null,
        type: string | null,
        urlTarget: string | null,
        url: string | null,
        application: string | null,
        color: string | null,
        icon: string | null,
        image: string | null,
        presentationType: string | null,
        initials: string | null,
        menuItems: MenuItemDTO[] = []
    ) {
        this.appCode = appCode ?? Constante.EMPTY;
        this.type = type ?? Constante.EMPTY;
        this.urlTarget = urlTarget ?? Constante.EMPTY;
        this.url = url ?? Constante.EMPTY;
        this.application = application ?? Constante.EMPTY;
        this.color = color ?? Constante.EMPTY;
        this.icon = icon ?? Constante.EMPTY;
        this.image = image ?? Constante.EMPTY;
        this.presentationType = presentationType ?? Constante.EMPTY;
        this.initials = initials ?? Constante.EMPTY;
        this.menuItems = menuItems ?? Constante.EMPTY;
        this.server = Constante.EMPTY;
        this.isOpen = false;
        this.hasOptions = false;
        this.nameAux = application ?? Constante.EMPTY;
    }
}