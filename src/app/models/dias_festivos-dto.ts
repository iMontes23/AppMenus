
export class DiasFestivosDTO {
    cd_Fecha?: number | null;
    ts_Cal_Fecha?: Date | null;
    ts_fechaCalendario ?: Date | null;
    cd_Pais?:number;

    nb_Pais?:string;

    nb_UsuarioCreacion?: string | null;
    ts_Creacion?: Date | null;
    nb_UsuarioModificacion?: string | null;
    ts_Modificacion?: Date | null;
    st_Activo?: boolean | null;
    
    st_status?:string;
    tx_nota?:string;
}
