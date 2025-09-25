import { UserInformation } from "../utilerias/model/user-information";
import { ActividadDTO } from "./actividad-dto";
import { CardGraficaDTO } from "./card-grafica-dto";
import { GraficaDTO } from "./grafica-dto";
import { GrupoDTO } from "./grupo-dto";
import { SerieDTO } from "./serie-dto";

export class DasGraficaDTO {

    //GENERALES DE GRAFICA
    titulo?: string;
    graficas: GraficaDTO[] = []

    grupoSeleccionado: GrupoDTO = new GrupoDTO();
    usuarioSeleccionado: UserInformation = new UserInformation();
    cardTipo:string = "";
    startDate: Date = new Date();
    endDate: Date = new Date();

    actividades: ActividadDTO[] = [];
    cards: CardGraficaDTO[] = [];
    grupos: GrupoDTO[] = [];
    usuarios: UserInformation[] = [];

    totalUsuario:number = 0;
    dealerObjetivo:number = 0;
    clientObjetivo:number = 0;

    constructor() {
    }
}