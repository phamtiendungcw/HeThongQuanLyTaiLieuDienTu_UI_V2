/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/router/_guard/auth.guard';
import { DocumentListComponent } from './document/document-list/document-list.component';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { PageError404Component } from '../../pages/errors/page-error404/page-error404.component';
import { PageLoginComponent } from '../../pages/page-login/page-login.component';
import { PageRegisterComponent } from '../../pages/page-register/page-register.component';
import { PageError500Component } from '../../pages/errors/page-error500/page-error500.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminGuard } from '../../router/_guard/admin.guard';
import { MemberGuard } from '../../router/_guard/member.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentCreateComponent } from './document/document-create/document-create.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'home',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'admin',
        component: AdminPanelComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'members',
        component: MemberListComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'TaiLieuGuiDi',
        component: DocumentListComponent,
        canActivate: [MemberGuard],
      },
      {
        path: 'documents',
        component: DocumentListComponent,
        canActivate: [MemberGuard],
      },
      {
        path: 'documents/create',
        component: DocumentCreateComponent,
        canActivate: [MemberGuard],
      },
      { path: 'not-found', component: PageError404Component },
      { path: 'server-error', component: PageError500Component },
      { path: 'login', component: PageLoginComponent },
      { path: 'register', component: PageRegisterComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
