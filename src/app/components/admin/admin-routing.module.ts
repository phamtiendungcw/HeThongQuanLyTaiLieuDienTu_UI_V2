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

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'home',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      { path: 'members', component: MemberListComponent },
      { path: 'members/:username/view', component: MemberDetailComponent },
      { path: 'members/:username/edit', component: MemberEditComponent },
      { path: 'members/create', component: MemberCreateComponent },
      { path: 'document', component: DocumentListComponent },
      { path: 'document/:id/view', component: DocumentDetailComponent },
      { path: 'document/:id/edit', component: DocumentEditComponent },
      { path: 'document/create', component: DocumentCreateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
