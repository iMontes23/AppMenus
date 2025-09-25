import { UserInformation } from "../utilerias/model/user-information";
import { ActividadDTO } from "./actividad-dto";
import { CardGraficaDTO } from "./card-grafica-dto";
import { GrupoDTO } from "./grupo-dto";
import { SerieDTO } from "./serie-dto";

export class GraficaDTO {

    //GENERALES DE GRAFICA
    name?: string;
    series: SerieDTO[] = [];
    xAxisData?: any[];
    yAxisData?: any[];
    porcent: boolean = true;

    rangoFecha: boolean = false;

    constructor(){
    }
}