import { Constante } from "../utilerias/constantes/constante";

export class EntityDTO {
    cd_Entidad: number;
    tp_TipoEntidad: number;
    nb_Nombre: string;
    cd_rfc: string | null;
    nb_UsuarioCreacion: string;
    ts_Creacion: Date;
    nb_UsuarioModificacion: string;
    ts_Modificacion: Date | null;
    st_Activo: boolean;
    cd_CuentaDistribuidor: number | null;
    cd_tipoUsuario: number;

    constructor(
        cd_Entidad: number = 0,
        tp_TipoEntidad: number = 0,
        nb_Nombre: string = Constante.EMPTY,
        cd_rfc: string = Constante.EMPTY,
        nb_UsuarioCreacion: string = Constante.EMPTY,
        ts_Creacion: Date = new Date(),
        nb_UsuarioModificacion: string = Constante.EMPTY,
        ts_Modificacion: Date | null = null,
        st_Activo: boolean = true,
        cd_CuentaDistribuidor: number | null = null ,
        cd_tipoUsuario: number = 0
    ) {
        this.cd_Entidad = cd_Entidad;
        this.tp_TipoEntidad = tp_TipoEntidad;
        this.nb_Nombre = nb_Nombre;
        this.cd_rfc = cd_rfc;
        this.nb_UsuarioCreacion = nb_UsuarioCreacion;
        this.ts_Creacion = ts_Creacion;
        this.nb_UsuarioModificacion = nb_UsuarioModificacion;
        this.ts_Modificacion = ts_Modificacion;
        this.st_Activo = st_Activo;
        this.cd_CuentaDistribuidor = cd_CuentaDistribuidor;
        this. cd_tipoUsuario =  cd_tipoUsuario;
    }
}
