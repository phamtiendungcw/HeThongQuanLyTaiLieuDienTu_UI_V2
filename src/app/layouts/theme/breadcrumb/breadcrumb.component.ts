/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Component, Input } from '@angular/core';

export interface Crumbs {
  crumb: string;
  router: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  @Input() crumbs: Crumbs[] = [];
}
