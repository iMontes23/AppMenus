import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HighlightMenuItemService {

  // BehaviorSubject to store the current value of AppCode & OptionCode
  private appCodeSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private optionCodeSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  // Expose the BehaviorSubject observable so that components can subscribe to it
  appCode$: Observable<string | null> = this.appCodeSubject.asObservable();
  optionCode$: Observable<string | null> = this.optionCodeSubject.asObservable();

  constructor() { }

  setAppCode(appCode: string): void {
    this.appCodeSubject.next(appCode);
  }

  getAppCode(): string | null {
    return this.appCodeSubject.value;
  }

  setOptionCode(appCode: string): void {
    this.optionCodeSubject.next(appCode);
  }

  getOptionCode(): string | null {
    return this.optionCodeSubject.value;
  }

}
