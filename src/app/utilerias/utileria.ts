import { Injectable } from '@angular/core';
import { RegexConstante } from './constantes/regex-constante';
import { Constante } from './constantes/constante';

@Injectable({
  providedIn: 'root'
})
export class Utilerias {

  /**
   * 
   * @param frase 
   */
  public eliminarSimbolos(frase: string) {
    const palabra = frase.split(' ').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');

    return palabra.replace(/[^a-zA-Z0-9]/g, '');
  }

  public easeInOutQuad(t: number, b: number, c: number, d: number): number {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  smoothScroll(element: HTMLElement, to: number, duration: number): void {
    const start = element.scrollLeft;
    const change = to - start;
    const increment = 15;
    let currentTime = 0;
    const animateScroll = () => {
      currentTime += increment;
      const val = this.easeInOutQuad(currentTime, start, change, duration);
      element.scrollLeft = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  }

  preparationUrl(url: string) {
    if (url !== undefined && url !== null && !RegexConstante.urlPrefix.test(url)) {
      const origin = window.location.origin;
      return `${origin}${url}`;
    } else if (url !== undefined && url !== null) {
      return url;
    } else {
      return Constante.EMPTY;
    }
  }

  getInicioDeSemana(date: Date): Date {
    const day = date.getDay(),
      diff = date.getDate() - day + (day == 0 ? -6 : 1); // Ajusta si es domingo (day == 0)
    const monday = new Date(date.setDate(diff));
    monday.setHours(0, 0, 0, 0); 
    return monday;
  }

  getFinDeSemana(date: Date): Date {
    const day = date.getDay(),
      diff = date.getDate() - day + (day == 0 ? 0 : 7);
    const sunday = new Date(date.setDate(diff));
    sunday.setHours(23, 59, 59, 999);
    return sunday;
  }

  getInicioDeMes(date: Date): Date {
    const inicioMes = new Date(date.getFullYear(), date.getMonth(), 1);
    inicioMes.setHours(0, 0, 0, 0);
    return inicioMes;
  }

  getFinDeMes(date: Date): Date {
    const finMes = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    finMes.setHours(23, 59, 59, 999);
    return finMes;
  }
}
