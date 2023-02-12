/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../router/_guard/auth.guard';
import { PreventUnsavedChangesGuard } from '../router/_guard/prevent-unsaved-changes.guard';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageProfileComponent } from './page-profile/page-profile.component';
import { PageRegisterComponent } from './page-register/page-register.component';

const routes: Routes = [
  { path: '', component: PageLoginComponent },
  {
    path: 'account',
    children: [
      { path: '', component: PageLoginComponent },
      { path: 'register', component: PageRegisterComponent },
      { path: 'login', component: PageLoginComponent },
      {
        path: 'profile',
        component: PageProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'profile/:username',
        component: PageProfileComponent,
        canActivate: [AuthGuard],
        canDeactivate: [PreventUnsavedChangesGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
