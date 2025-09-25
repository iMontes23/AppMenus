import { Constante } from "../utilerias/constantes/constante";

export class VisitRegistrationDTO {
    cd_registrovisita: number;
    cd_usuario: number;
    cd_tipovisita:number;
    cd_entidad: number;
    cd_Sucursal: number;
    cd_gfx: string | null;
    ts_fechavisita: Date;
    ts_fechaVisitaFin?: Date | null;
    tx_motivo: string;
    nb_usuariocreacion: string;
    ts_creacion: Date;
    nb_usuariomodificacion: string;
    ts_modificacion: Date | null;
    st_activo: boolean;

    constructor(
        cd_registrovisita: number = 0,
        cd_usuario: number = 0,
        cd_tipovisita: number = 0,
        cd_entidad: number = 0,
        cd_Sucursal: number,
        cd_gfx: string = Constante.EMPTY,
        ts_fechavisita: Date = new Date(),
        tx_motivo: string = Constante.EMPTY,
        nb_usuariocreacion: string = Constante.EMPTY,
        ts_creacion: Date = new Date(),
        nb_usuariomodificacion: string = Constante.EMPTY,
        ts_modificacion: Date | null = null,
        st_activo: boolean = true
    ) {
        this.cd_registrovisita = cd_registrovisita;
        this.cd_usuario = cd_usuario;
        this.cd_tipovisita = cd_tipovisita;
        this.cd_entidad = cd_entidad;
        this.cd_Sucursal = cd_Sucursal;
        this.cd_gfx = cd_gfx;
        this.ts_fechavisita = ts_fechavisita;
        this.tx_motivo = tx_motivo;
        this.nb_usuariocreacion = nb_usuariocreacion;
        this.ts_creacion = ts_creacion;
        this.nb_usuariomodificacion = nb_usuariomodificacion;
        this.ts_modificacion = ts_modificacion;
        this.st_activo = st_activo;
    }
}
