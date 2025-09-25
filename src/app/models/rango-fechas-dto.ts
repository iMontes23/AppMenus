
export class RangoFechasDTO {
    fechaInicio: Date; // o Date, dependiendo de cómo lo manejes
    fechaFin: Date;
    claveUsuario: string;

    constructor(fechaInicio: Date, fechaFin: Date, claveUsuario: string) {
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.claveUsuario = claveUsuario
    }
}
