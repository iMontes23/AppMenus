import { Constante } from "../utilerias/constantes/constante";

export class BranchDTO {

    cd_Sucursal: number;
    cd_Entidad: number;
    nb_Sucursal: string;
    nb_UsuarioCreacion: string;
    ts_Creacion: Date;
    nb_UsuarioModificacion: string;
    ts_Modificacion: Date | null;
    st_Activo: boolean;

    constructor(
        cd_Sucursal: number = 0,
        cd_Entidad: number = 0,
        nb_Sucursal: string = Constante.EMPTY,
        cd_rfc: string = Constante.EMPTY,
        nb_UsuarioCreacion: string = Constante.EMPTY,
        ts_Creacion: Date = new Date(),
        nb_UsuarioModificacion: string = Constante.EMPTY,
        ts_Modificacion: Date | null = null,
        st_Activo: boolean = true
    ) {
        
        this.cd_Sucursal = cd_Sucursal;
        this.cd_Entidad = cd_Entidad;
        this.nb_Sucursal = nb_Sucursal;
        this.nb_UsuarioCreacion = nb_UsuarioCreacion;
        this.ts_Creacion = ts_Creacion;
        this.nb_UsuarioModificacion = nb_UsuarioModificacion;
        this.ts_Modificacion = ts_Modificacion;
        this.st_Activo = st_Activo;
    }
}
