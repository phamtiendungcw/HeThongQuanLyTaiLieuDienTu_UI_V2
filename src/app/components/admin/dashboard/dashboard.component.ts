/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  crumbs = [
    {
      crumb: 'Tổng quan',
      router: '/',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
