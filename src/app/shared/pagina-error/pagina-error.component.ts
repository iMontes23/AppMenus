import { Component, OnInit } from '@angular/core';
import { ImgConstante } from '../../utilerias/constantes/img-constante';
import { ActivatedRoute, Router } from '@angular/router';
import { Constante } from '../../utilerias/constantes/constante';
import { UrlConstante } from '../../utilerias/constantes/url-constante';
import { CurrentAccessService } from '../../services/current-access.service';
import { UserInformation } from '../../utilerias/model/user-information';

@Component({
    selector: 'app-pagina-error',
    templateUrl: 'pagina-error.component.html',
    styleUrls: ['pagina-error.component.scss']
})
export class PaginaErrorComponent implements OnInit {
    userInformation: UserInformation;
    imgLogoNavistar = ImgConstante.imgNotFound;
    code: string;
    message: string;
    description: string;

    constructor(
        private currentAccessService: CurrentAccessService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.userInformation = this.currentAccessService.getUserInformation();
        this.code = '';
        this.message = 'Hubo un error durante la operación';
        this.description = 'No fue posible gestionar acceso al sistema, Contactar con el administrador si cree que esto es un problema.';
    }

    ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.code = data['code'] ? data['code'] : this.code;
            if (this.code == "404") {
                this.message = 'Página no encontrada';
                this.description = 'El usuario '+this.userInformation.name+' no existe o su rol y funciones dentro de la aplicación se encuentran desactivadas.';
            } else if (this.code == "401") {
                this.message = 'No autorizado';
                this.description = 'El usuario '+this.userInformation.name+' no tiene los permisos suficientes para acceder a la aplicación, Contactar con el administrador si cree que esto es un problema. ';
            }
        });
    }

    regresar() {
        if (this.currentAccessService.codeApplication != Constante.EMPTY) {
            this.router.navigate([`${UrlConstante.TAB_APLICATION}${this.currentAccessService.codeApplication}`]);
        } else {
            this.router.navigate([UrlConstante.HOME]);
        }
    }
}
