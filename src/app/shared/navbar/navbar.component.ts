import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';


import { AsyncPipe, CommonModule, Location } from '@angular/common';
import { filter, map, Observable, startWith, Subscription } from 'rxjs';
import { Router, NavigationEnd, RouterModule, ActivatedRoute } from '@angular/router';
import { Misc } from '../../utilerias/model/misc';
import { MenuItem } from '../../utilerias/model/menu-item';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Constante } from "../../utilerias/constantes/constante";
import { UserInfoComponent } from '../../components/user-info/user-info.component';
import { ImgConstante } from '../../utilerias/constantes/img-constante';
import { UrlConstante } from '../../utilerias/constantes/url-constante';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UserApplicationDTO } from '../../utilerias/model/user-application-dto';
import { MenuItemDTO } from '../../utilerias/model/menu-item-dto';
import { CurrentAccessService } from '../../services/current-access.service';

const misc: Misc = {
    navbar_menu_visible: 0,
    active_collapse: true,
    disabled_collapse_init: 0,
    sidebar_mini_active: false,
    hide_sidebar_active: false,
};

// declare var $: any;
@Component({
    selector: 'app-navbar-cmp',
    templateUrl: 'navbar.component.html',
    styleUrl: 'navbar.component.scss',
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        UserInfoComponent,
        FormsModule,
        MatIcon,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        AsyncPipe
    ],
    standalone: true
})

export class NavbarComponent implements OnInit {
    private listTitles: MenuItem[] = [];
    imgLogoNavistar: string;
    searchInput: FormControl = new FormControl('');
    location: Location;
    mobile_menu_visible: number;
    private toggleButton!: HTMLButtonElement;
    private sidebarVisible: boolean;
    private _router: Subscription = new Subscription;

    value = Constante.EMPTY;
    private _formBuilder = inject(FormBuilder);
    stateForm = this._formBuilder.group({
        stateGroup: '',
    });

    @ViewChild('app-navbar-cmp', { static: false }) button!: ElementRef<HTMLDivElement>;

    navigation: string = UrlConstante.VIEW;
    groupAplication: Observable<UserApplicationDTO[]>;
    applications: UserApplicationDTO[] = [];

    constructor(
        private currentAccessService: CurrentAccessService,
        location: Location,
        private element: ElementRef,
        private router: Router, private route: ActivatedRoute) {

        this.groupAplication = this.stateForm
            .get('stateGroup')!
            .valueChanges.pipe(
                startWith(''),
                map((value) => this.filterGroup(value || ''))
            );

        this.location = location;
        this.sidebarVisible = false;
        this.mobile_menu_visible = 0;
        this.imgLogoNavistar = ImgConstante.imgLogoMini;
    }

    searchElement() {
        if (this.searchInput.value == Constante.EMPTY) {
            return;
        }
        alert('Búsqueda: ' + this.searchInput.value)
        this.searchInput.setValue('');
    }

    hideSidebar() {
        const body = document.getElementsByTagName('body')[0];
        const sidebar = document.getElementsByClassName('sidebar')[0];

        if (misc.hide_sidebar_active === true) {
            setTimeout(function () {
                body.classList.remove('hide-sidebar');
                misc.hide_sidebar_active = false;
            }, 300);
            setTimeout(function () {
                sidebar.classList.remove('animation');
            }, 600);
            sidebar.classList.add('animation');

        } else {
            setTimeout(function () {
                body.classList.add('hide-sidebar');
                // $('.sidebar').addClass('animation');
                misc.hide_sidebar_active = true;
            }, 300);
        }

        // we simulate the window Resize so the charts will get updated in realtime.
        const simulateWindowResize = setInterval(function () {
            window.dispatchEvent(new Event('resize'));
        }, 180);

        // we stop the simulation of Window Resize after the animations are completed
        setTimeout(function () {
            clearInterval(simulateWindowResize);
        }, 1000);
    }

    ngOnInit() {
       /*  this.applications = this.currentAccessService.menu;
        const navbar: HTMLElement = this.element.nativeElement;
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0] as HTMLButtonElement;
        if (body.classList.contains('sidebar-mini')) {
            misc.sidebar_mini_active = true;
        }
        if (body.classList.contains('hide-sidebar')) {
            misc.hide_sidebar_active = true;
        }
        this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
            this.sidebarClose();

            const $layer = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
            }
        }); */

    }

    private filterGroup(value: string): UserApplicationDTO[] {
        /* if (this.applications.length === 0) {
            this.applications = this.currentAccessService.menu;
        }

        if (value) {
            return this.applications
                .map((app) => {
                    const matchLetter = app.application.toLowerCase().includes(value.toLowerCase());
                    // const items = app.menuItems.filter(item => item.isOpen && (item.appCode !== Constante.INPUT_VIN && item.appCode !== Constante.INPUT_VINWR));
                        

                    if (matchLetter && !app.hasOptions) {
                        return {
                            ...app,
                            isOpen: true,
                        };
                    } else {

                        const menuItems = this.filterItems(app.menuItems, value);

                        if (menuItems.length > 0) {
                            return {
                                ...app,
                                menuItems: menuItems,
                                isOpen: true,
                            };
                        } else {
                            return {
                                ...app,
                                isOpen: false,
                            };
                        }
                    }
                })
                .filter(app => app.isOpen);
        }
                */
        return this.applications; 
    }

    filterItems(items: MenuItemDTO[], value: string): MenuItemDTO[] {
        return items
            .map(item => {
                const matchName = item.name.toLowerCase().includes(value.toLowerCase());
                const DETVINWR = item.appCode.toLowerCase().includes('DETVINWR');
                if (DETVINWR) {
                    return {
                        ...item,
                        isOpen: false
                    };
                }else

                if (matchName) {
                    return {
                        ...item,
                        isOpen: true
                    };
                } else {
                    const filteredSubItems = item.items ? this.filterItems(item.items, value) : [];
                    if (filteredSubItems.length > 0) {
                        return {
                            ...item,
                            items: filteredSubItems,
                            isOpen: true
                        };
                    } else {
                        return {
                            ...item,
                            isOpen: false
                        };
                    }
                }

            })
            .filter(item => item.isOpen && (item.appCode !== Constante.DETVIN && item.appCode !== Constante.DETVINWR));
    }

    optionSelected(name: string) {
        this.stateForm.get('stateGroup')?.setValue(name);
    }

    optionOpen(item: MenuItemDTO, application: UserApplicationDTO, modulo: string): void {
        if (item.url !== null && item.urlTarget === Constante._BLANK) {
            // se seleccion una opcion de tipo _BLANK, se abre en una nueva pestaña
            window.open(item.url, Constante.NEW_TAB);

        } else if (item.url !== null) {
            // se seleccion una opcion interna de la aplication
            const appTab = Object.assign({}, application);
            item.modulo = modulo;
            appTab.menuItems = [];
            this.currentAccessService.addOption(item, appTab)
        }
    }

    openAplication(menu: UserApplicationDTO): void {
        if (!menu.hasOptions && menu.type === Constante.BOTON) {
            //Aplicacion de tipo boton sin opciones ni modulos se abre en una nueva pestaña
            window.open(menu.url, Constante.NEW_TAB)
        } else if (menu.type === Constante.BOTON) {
            //Aplicacion de tipo boton con opciones o modulos se abre en una nueva pestaña
            const baseHref = document.getElementsByTagName('base')[0].getAttribute('href') || '/';
            const url = this.router.serializeUrl(
                this.router.createUrlTree([`${baseHref}${UrlConstante.TAB_APLICATION}`, menu.appCode])
            );

            window.open(url, Constante.NEW_TAB);
        }
    }

    sidebarOpen() {
        const $toggle = document.getElementsByClassName('navbar-toggler')[0];
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');
        setTimeout(function () {
            $toggle.classList.add('toggled');
        }, 430);

        const $layer = document.createElement('div');
        $layer.setAttribute('class', 'close-layer');


        if (body.querySelectorAll('.main-panel')) {
            document.getElementsByClassName('main-panel')[0].appendChild($layer);
        } else if (body.classList.contains('off-canvas-sidebar')) {
            document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
        }

        setTimeout(function () {
            $layer.classList.add('visible');
        }, 100);

        $layer.onclick = () => {
            body.classList.remove('nav-open');
            this.mobile_menu_visible = 0;
            this.sidebarVisible = false;

            $layer.classList.remove('visible');
            setTimeout(function () {
                $layer.remove();
                $toggle.classList.remove('toggled');
            }, 400);
        };

        body.classList.add('nav-open');
        this.mobile_menu_visible = 1;
        this.sidebarVisible = true;
    }

    sidebarClose() {
        const $toggle = document.getElementsByClassName('navbar-toggler')[0];
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton?.classList.remove('toggled');
        const $layer = document.createElement('div');
        $layer.setAttribute('class', 'close-layer');

        this.sidebarVisible = false;
        body.classList.remove('nav-open');
        // $('html').removeClass('nav-open');
        body.classList.remove('nav-open');
        if ($layer) {
            $layer.remove();
        }

        setTimeout(function () {
            $toggle?.classList.remove('toggled');
        }, 400);

        this.mobile_menu_visible = 0;
    }

    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    }

    getTitle() {
        let titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }

        for (const item of this.listTitles) {
            if (item.type === 'link' && item.path === titlee) {
                return item.title;
            } else if (item.type === 'sub') {
                for (const subiItem of item.children) {
                    const subtitle = item.path + '/' + subiItem.path;
                    if (subtitle === titlee) {
                        return subiItem.title;
                    }
                }
            }
        }
        return 'Dashboard';
    }

    getPath() {
        return this.location.prepareExternalUrl(this.location.path());
    }

    home() {
        if (this.currentAccessService.codeApplication != Constante.EMPTY) {
            this.router.navigate([`${UrlConstante.TAB_APLICATION}${this.currentAccessService.codeApplication}`]);
        } else {
            this.router.navigate([UrlConstante.HOME]);
        }
    }

}
