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

@NgModule({
  declarations: [TextInputComponent, BreadcrumbComponent],
  imports: [
    CommonModule,
    ThemeRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  exports: [TextInputComponent, BreadcrumbComponent],
})
export class ThemeModule {}
