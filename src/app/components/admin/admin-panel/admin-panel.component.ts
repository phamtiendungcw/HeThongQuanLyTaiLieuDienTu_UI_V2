/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent {
  crumbs = [
    {
      crumb: 'Quản trị viên',
      router: '/edmslab/home',
    },
  ];
}
