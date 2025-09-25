import { Constante } from "../utilerias/constantes/constante";

export class UserGroupDTO {
    cd_grupo: number;
    cd_usuario: number;
    nb_usuariocreacion: string;
    ts_Creacion: Date;
    nb_UsuarioModificacion: string;
    ts_Modificacion: Date | null;
    st_Activo: boolean;
    nb_grupo:string | null;

    constructor(
        cd_grupo:number = 0,
        cd_usuario: number = 0,
        nb_usuariocreacion: string = Constante.EMPTY,
        ts_Creacion: Date = new Date(),
        nb_UsuarioModificacion: string = Constante.EMPTY,
        ts_Modificacion: Date | null = null,
        st_Activo: boolean = true,
    ) {
        this.cd_grupo = cd_grupo;
        this.cd_usuario = cd_usuario;
        this.nb_usuariocreacion = nb_usuariocreacion;
        this.ts_Creacion = ts_Creacion;
        this.nb_UsuarioModificacion = nb_UsuarioModificacion;
        this.ts_Modificacion = ts_Modificacion;
        this.st_Activo = st_Activo;
        this.nb_grupo = null;
    }
}