/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'increasing',
    }), // ToastrModule added
    NgxSpinnerModule.forRoot({
      type: 'square-jelly-box',
    }),
  ],
  exports: [BrowserAnimationsModule, ToastrModule, NgxSpinnerModule],
})
export class SharedModule {}
