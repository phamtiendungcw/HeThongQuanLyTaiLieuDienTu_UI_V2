/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  date = new Date();

  constructor() {}

  ngOnInit(): void {}
}
