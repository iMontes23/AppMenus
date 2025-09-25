import { Constante } from "../utilerias/constantes/constante";

export class IncidentDTO {
    cd_incidente:number | 0;
    cd_usuario: number | 0;
    cd_tipoIncidente:number | 0;
    ts_Cal_Fecha: Date;
    tx_comentario: string;
    nb_usuariocreacion: string;
    ts_creacion: Date;
    nb_usuariomodificacion: string;
    ts_modificacion: Date | null;
    st_activo:number;

    constructor(
        cd_incidente: number,
        cd_tipoIncidente:number,
        cd_usuario: number,
        ts_fechavisita: Date = new Date(),
        tx_motivo: string = Constante.EMPTY,
        nb_usuariocreacion: string = Constante.EMPTY,
        ts_creacion: Date = new Date(),
        nb_usuariomodificacion: string = Constante.EMPTY,
        ts_modificacion: Date | null = null,
    ) {
        this.cd_incidente = cd_incidente,
        this.cd_tipoIncidente = cd_tipoIncidente,
        this.cd_usuario = cd_usuario;
        this.ts_Cal_Fecha = ts_fechavisita;
        this.tx_comentario = tx_motivo;
        this.nb_usuariocreacion = nb_usuariocreacion;
        this.ts_creacion = ts_creacion;
        this.nb_usuariomodificacion = nb_usuariomodificacion;
        this.ts_modificacion = ts_modificacion;
        this.st_activo = 1;
    }
}
