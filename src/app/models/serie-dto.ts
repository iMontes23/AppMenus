
export class SerieDTO {

    //GENERALES DE GRAFICA
    name?: string; //TIPOS:('Bar', 'Line')
    data?: any[] = [];
    type?: string;
    colorItem?: string;

    //Datos de etiqueta 
    showLabel: boolean = true;
    positionLabel: string = 'outside';//(inside/outside)
    colorLabel?: string;

    //CONFIGURACIÓN DE GRAFICA LINEAL
    smooth:boolean = false;//linea recta ó curveada
    symbol:string =  'circle';//none, circle, rect, roundRect, diamond, pin, arrow
    width:number = 2;//Grosor de la linea
    shadowOffsetX:number = 0;//Alineacion de la sombra

    //CONFIGURACIÓN DE GRAFICA DE BARRA
    stack?: boolean = false;//APILAR GRAFICA DE BARRAS, NO SE APLILAN POR DEFAULT
    stackName?: string;//SE PUEDE APLILAR AGRUPANDO POR NOMBRE
}