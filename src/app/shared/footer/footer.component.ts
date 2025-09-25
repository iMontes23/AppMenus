import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-footer-cmp',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.scss'],
    imports: [ RouterModule, CommonModule ],
    standalone:true
})

export class FooterComponent {
    test: Date = new Date();
}
