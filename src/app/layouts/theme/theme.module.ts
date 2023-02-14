/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeRoutingModule } from './theme-routing.module';
import { TextInputComponent } from './text-input/text-input.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";

@NgModule({
  declarations: [TextInputComponent, BreadcrumbComponent],
  imports: [
    CommonModule,
    ThemeRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
  ],
  exports: [TextInputComponent, BreadcrumbComponent],
})
export class ThemeModule {}
