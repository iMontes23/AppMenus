import { Constante } from "../utilerias/constantes/constante";
import { EntityDTO } from "./entity-dto";

export class IncidentsTypeDTO {
    cd_tipoIncidente:number;
    nb_Incidente: string;
    nb_usuariocreacion: string;
    ts_creacion: Date;
    nb_usuariomodificacion: string;
    ts_modificacion: Date | null;

    entities: EntityDTO[] = [];

    constructor(
        cd_incident: number = 0,
        nb_nombre: string = Constante.EMPTY,
        nb_usuariocreacion: string = Constante.EMPTY,
        ts_creacion: Date = new Date(),
        nb_usuariomodificacion: string = Constante.EMPTY,
        ts_modificacion: Date | null = null
    ) {
        this.cd_tipoIncidente = cd_incident;
        this.nb_Incidente = nb_nombre;
        this.nb_usuariocreacion = nb_usuariocreacion;
        this.ts_creacion = ts_creacion;
        this.nb_usuariomodificacion = nb_usuariomodificacion;
        this.ts_modificacion = ts_modificacion;
    }
}
