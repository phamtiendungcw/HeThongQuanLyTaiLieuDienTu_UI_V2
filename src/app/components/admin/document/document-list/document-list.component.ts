/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
})
export class DocumentListComponent {
  crumbs = [
    {
      crumb: 'Tài liệu',
      router: '/admin/home/documents',
    },
  ];
}
