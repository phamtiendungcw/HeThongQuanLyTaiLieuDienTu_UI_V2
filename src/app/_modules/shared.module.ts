/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

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
  ],
  exports: [BrowserAnimationsModule, ToastrModule],
})
export class SharedModule {}
