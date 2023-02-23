/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Directive } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appSafePipeDirective]',
})
export class SafePipeDirectiveDirective {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: any, args?: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
