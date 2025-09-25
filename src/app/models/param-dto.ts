import { Constante } from "../utilerias/constantes/constante";

export class ParamDTO {
    cd_parametro: number;
    tx_descripcion: string;
    nb_valor:string;
    nb_UsuarioCreacion: string;
    ts_Creacion: Date;
    nb_UsuarioModificacion: string;
    ts_Modificacion: Date | null;
    st_Activo: boolean;

    constructor(
        cd_parametro: number = 0,
        nb_Nombre: string = Constante.EMPTY,
        nb_valor: string = Constante.EMPTY,
        nb_UsuarioCreacion: string = Constante.EMPTY,
        ts_Creacion: Date = new Date(),
        nb_UsuarioModificacion: string = Constante.EMPTY,
        ts_Modificacion: Date | null = null,
        st_Activo: boolean = true
    ) {
        this.cd_parametro = cd_parametro;
        this.tx_descripcion = nb_Nombre;
        this.nb_valor = nb_valor;
        this.nb_UsuarioCreacion = nb_UsuarioCreacion;
        this.ts_Creacion = ts_Creacion;
        this.nb_UsuarioModificacion = nb_UsuarioModificacion;
        this.ts_Modificacion = ts_Modificacion;
        this.st_Activo = st_Activo;
    }
}
