import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageRegisterComponent } from './page-register/page-register.component';
import { PageProfileComponent } from './page-profile/page-profile.component';
import { PageError404Component } from './errors/page-error404/page-error404.component';
import { PageError500Component } from './errors/page-error500/page-error500.component';


@NgModule({
  declarations: [
    PageLoginComponent,
    PageRegisterComponent,
    PageProfileComponent,
    PageError404Component,
    PageError500Component
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
