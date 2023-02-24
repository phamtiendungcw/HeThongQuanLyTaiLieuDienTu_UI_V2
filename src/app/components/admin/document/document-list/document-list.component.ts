/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DocumentService } from '../../../../service/document.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import * as saveAs from 'file-saver';
import { DocumentCreateComponent } from '../document-create/document-create.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DocumentDeleteComponent } from '../../../../layouts/theme/document-delete/document-delete.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
})
export class DocumentListComponent implements OnInit {
  crumbs = [
    {
      crumb: 'Tài liệu',
      router: '/edmslab/home/documents',
    },
  ];

  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'name',
    'contentType',
    'createdAt',
    'hanhDong',
  ];
  dataSource!: MatTableDataSource<any>;
  @Inject(MAT_DIALOG_DATA) public editData: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private documentService: DocumentService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments() {
    this.documentService.getDocuments().subscribe({
      next: (documents) => {
        this.dataSource = new MatTableDataSource(documents);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => console.log(error),
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(DocumentCreateComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadDocuments();
      }
    });
  }

  getDocumentUrl(id: number): any {
    return this.sanitizer.bypassSecurityTrustUrl(
      `https://localhost:5001/edmslab/api/document/${id}/download`
    );
  }

  downloadDocument(id: number, name: string) {
    this.documentService.downloadDocument(id).subscribe((blob) => {
      saveAs(blob, name);
    });
  }

  openConfirmDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DocumentDeleteComponent, {
      width: '250px',
      data: id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.deleteDocument(id);
      }
    });
  }

  deleteDocument(id: number): void {
    this.documentService
        .deleteDocument(id)
        .subscribe(() => this.loadDocuments());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goBack(): void {
    this.location.back();
  }
}
