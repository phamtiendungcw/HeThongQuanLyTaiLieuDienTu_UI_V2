/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-error500',
  templateUrl: './page-error500.component.html',
  styleUrls: ['./page-error500.component.scss'],
})
export class PageError500Component {
  error: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation?.extras?.state?.['err'];
  }
}
