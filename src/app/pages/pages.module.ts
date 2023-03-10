/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageError404Component } from './errors/page-error404/page-error404.component';
import { PageError500Component } from './errors/page-error500/page-error500.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageProfileComponent } from './page-profile/page-profile.component';
import { PageRegisterComponent } from './page-register/page-register.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../layouts/theme/theme.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    PageLoginComponent,
    PageRegisterComponent,
    PageProfileComponent,
    PageError404Component,
    PageError500Component,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    MatRadioModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class PagesModule {}
