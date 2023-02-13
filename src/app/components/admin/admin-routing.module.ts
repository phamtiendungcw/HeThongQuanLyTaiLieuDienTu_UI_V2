/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/router/_guard/auth.guard';
import { DocumentListComponent } from './document/document-list/document-list.component';
import { HomeComponent } from './home/home.component';
import { MemberCreateComponent } from './member/member-create/member-create.component';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';
import { MemberEditComponent } from './member/member-edit/member-edit.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { DocumentDetailComponent } from './document/document-detail/document-detail.component';
import { DocumentEditComponent } from './document/document-edit/document-edit.component';
import { DocumentCreateComponent } from './document/document-create/document-create.component';
import { PageError404Component } from '../../pages/errors/page-error404/page-error404.component';
import { PageLoginComponent } from '../../pages/page-login/page-login.component';
import { PageRegisterComponent } from '../../pages/page-register/page-register.component';
import { PageError500Component } from '../../pages/errors/page-error500/page-error500.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'home',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: 'members',
        component: MemberListComponent,
        children: [
          { path: ':username/view', component: MemberDetailComponent },
          { path: ':username/edit', component: MemberEditComponent },
          { path: 'create', component: MemberCreateComponent },
        ],
      },
      {
        path: 'document',
        component: DocumentListComponent,
        children: [
          { path: ':id/view', component: DocumentDetailComponent },
          { path: ':id/edit', component: DocumentEditComponent },
          { path: 'create', component: DocumentCreateComponent },
        ],
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
