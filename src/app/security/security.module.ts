import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecurityRoutes } from './security.routing';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SecurityRoutes),
    FormsModule,
    ReactiveFormsModule,

  ],
  declarations: [
    LoginComponent,

  ]
})
export class SecurityModule {}