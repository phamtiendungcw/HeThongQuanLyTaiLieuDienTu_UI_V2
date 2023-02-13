/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  sidebarOpen = true;

  constructor(public router: Router) {}

  ngOnInit(): void {}

  sidebarToggle($event: any) {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
