import { Constante } from "../utilerias/constantes/constante";
import { EntityDTO } from "./entity-dto";

export class EntityTypeDTO {
    cd_tipovisita: number;
    cd_Entidad: number;
    cd_Id:number;
    nb_nombre: string;
    nb_usuariocreacion: string;
    ts_creacion: Date;
    nb_usuariomodificacion: string;
    ts_modificacion: Date | null;
    st_activo: boolean;

    entities: EntityDTO[] = [];

    constructor(
        cd_Entidad: number = 0,
        nb_nombre: string = Constante.EMPTY,
        nb_usuariocreacion: string = Constante.EMPTY,
        ts_creacion: Date = new Date(),
        nb_usuariomodificacion: string = Constante.EMPTY,
        ts_modificacion: Date | null = null,
        st_activo: boolean = true
    ) {
        this.cd_Id = cd_Entidad;
        this.cd_tipovisita = cd_Entidad;
        this.cd_Entidad = cd_Entidad;
        this.nb_nombre = nb_nombre;
        this.nb_usuariocreacion = nb_usuariocreacion;
        this.ts_creacion = ts_creacion;
        this.nb_usuariomodificacion = nb_usuariomodificacion;
        this.ts_modificacion = ts_modificacion;
        this.st_activo = st_activo;
    }
}
