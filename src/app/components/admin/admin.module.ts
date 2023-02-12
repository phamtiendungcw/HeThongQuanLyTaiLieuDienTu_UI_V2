import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { MemberCreateComponent } from './member/member-create/member-create.component';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';
import { MemberEditComponent } from './member/member-edit/member-edit.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { DocumentListComponent } from './document/document-list/document-list.component';
import { DocumentEditComponent } from './document/document-edit/document-edit.component';
import { DocumentCreateComponent } from './document/document-create/document-create.component';
import { DocumentDetailComponent } from './document/document-detail/document-detail.component';

@NgModule({
  declarations: [
    HomeComponent,
    MemberCreateComponent,
    MemberDetailComponent,
    MemberEditComponent,
    MemberListComponent,
    DocumentListComponent,
    DocumentEditComponent,
    DocumentCreateComponent,
    DocumentDetailComponent,
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
