import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
})

export class Mensajes {

    suc(titulo: string, msg: string) {
        Swal.fire({
            title: titulo ? titulo: "Operación Exitosa!",
            text: msg,
            icon: "success"
        });
    }
    sucCall(titulo: string, msg: string, callback: any) {
        Swal.fire({
            title: titulo ? titulo: "Operación Exitosa!",
            text: msg,
            icon: "success"
        }).then(callback);
    }

    err(titulo: string, msg: string) {
        Swal.fire({
            title: titulo ? titulo: "Error!",
            text: msg,
            icon: "error"   
        });
    }
    errCall(titulo: string, msg: string, callback: any) {
        Swal.fire({
            title: titulo ? titulo: "Error!",
            text: msg,
            icon: "error"
        }).then(callback);
    }

    Question(titulo: string, msg: string, callback: any){
        Swal.fire({
            title: titulo ? titulo: "Realizar Acción!",
            text: msg,
            showCancelButton: true,
            icon: "question",
            confirmButtonColor: "#FF7144",
            cancelButtonText:'Cancelar'
          }).then(callback);
    }

    warning(titulo: string, msg: string) {
        Swal.fire({
            title: titulo ? titulo: "Alerta!",
            text: msg,
            /* showCancelButton: false, */
            confirmButtonColor: "#FF7144",
            icon: "warning"
        });
    }

    warningCall(titulo: string, msg: string, callback: any) {
        Swal.fire({
            title: titulo ? titulo: "Alerta!",
            text: msg,
            /* showCancelButton: false, */
            confirmButtonColor: "#FF7144",
            icon: "warning"
        }).then(callback);
    }
}