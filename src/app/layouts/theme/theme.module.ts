/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeRoutingModule } from './theme-routing.module';
import { TextInputComponent } from './text-input/text-input.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { DeleteFormComponent } from './delete-form/delete-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { HasRoleDirective } from '../../_directives/has-role.directive';
import { RolesModalComponent } from './roles-modal/roles-modal.component';

@NgModule({
  declarations: [
    TextInputComponent,
    BreadcrumbComponent,
    DeleteFormComponent,
    PhotoEditorComponent,
    HasRoleDirective,
    RolesModalComponent,
  ],
  imports: [
    CommonModule,
    ThemeRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule,
    FileUploadModule,
    FormsModule,
  ],
  exports: [
    TextInputComponent,
    BreadcrumbComponent,
    PhotoEditorComponent,
    HasRoleDirective,
  ],
})
export class ThemeModule {}
