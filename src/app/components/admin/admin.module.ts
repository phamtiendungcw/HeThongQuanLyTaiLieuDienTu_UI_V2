/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from '../../layouts/header/header.component';
import { SidebarComponent } from '../../layouts/sidebar/sidebar.component';
import { FooterComponent } from '../../layouts/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberCreateComponent } from './member/member-create/member-create.component';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';
import { MemberEditComponent } from './member/member-edit/member-edit.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { DocumentListComponent } from './document/document-list/document-list.component';
import { DocumentEditComponent } from './document/document-edit/document-edit.component';
import { DocumentCreateComponent } from './document/document-create/document-create.component';
import { DocumentDetailComponent } from './document/document-detail/document-detail.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { ThemeModule } from '../../layouts/theme/theme.module';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    MemberCreateComponent,
    MemberDetailComponent,
    MemberEditComponent,
    MemberListComponent,
    DocumentListComponent,
    DocumentEditComponent,
    DocumentCreateComponent,
    DocumentDetailComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ThemeModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatOptionModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSortModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
  ],
})
export class AdminModule {}
