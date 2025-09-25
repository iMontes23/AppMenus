import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule, Location, PopStateEvent } from '@angular/common';
import PerfectScrollbar from 'perfect-scrollbar';
import { filter } from 'rxjs';
import { Router, NavigationStart, NavigationEnd, RouterOutlet, Event } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { SidebarConstante } from '../../utilerias/constantes/sidebarConstante';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Constante } from '../../utilerias/constantes/constante';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    FooterComponent, 
    NavbarComponent, 
    SpinnerComponent
  ],
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.css']
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
  private _router: Subscription = new Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  url: string;
  location: Location;
  sidebarUno: string;

  @ViewChild('sidebar', { static: false }) sidebar: ElementRef | null = null;
  @ViewChild(NavbarComponent, { static: false }) navbar!: NavbarComponent;

  constructor(
    private router: Router, location: Location
  ) {
    this.location = location;
    this.lastPoppedUrl = Constante.EMPTY;
    this.url = Constante.EMPTY;
    this.sidebarUno = Constante.EMPTY;
  }

  ngOnInit() {
    this.sidebarUno = SidebarConstante.SIDEBAR_UNO;
    const elemMainPanel = document.querySelector('.main-panel') as HTMLElement;
    const elemSidebar = document.querySelector('.sidebar .sidebar-wrapper') as HTMLElement;
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url!;
    });
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (event.url !== this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);
        }
      } else if (event instanceof NavigationEnd) {
        if (event.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined!;
          window.scrollTo(0, this.yScrollStack.pop()!);
        } else {
          window.scrollTo(0, 0);
        }
      }
    });
    this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      elemMainPanel.scrollTop = 0;
      elemSidebar.scrollTop = 0;
    });
    const html = document.getElementsByTagName('html')[0];
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      if (elemMainPanel != null) {
        // let ps = new PerfectScrollbar(elemMainPanel);
        // ps = new PerfectScrollbar(elemSidebar);
        html.classList.add('perfect-scrollbar-on');
      } else {
        html.classList.add('perfect-scrollbar-off');
      }
    } else {
      html.classList.add('perfect-scrollbar-off');
    }

    if (this.navbar) {
      this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
        this.navbar.sidebarClose();
      });
    }
  }
  ngAfterViewInit() {
    this.runOnRouteChange();
  }
  public isMap() {
    if (this.location.prepareExternalUrl(this.location.path()) === '/maps/fullscreen') {
      return true;
    } else {
      return false;
    }
  }
  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemSidebar = document.querySelector('.sidebar .sidebar-wrapper') as HTMLElement;
      const elemMainPanel = document.querySelector('.main-panel') as HTMLElement;
      if (elemMainPanel != null) {
        let ps = new PerfectScrollbar(elemMainPanel);
        ps = new PerfectScrollbar(elemSidebar);
        ps.update();
      }
    }
  }
  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }
}
