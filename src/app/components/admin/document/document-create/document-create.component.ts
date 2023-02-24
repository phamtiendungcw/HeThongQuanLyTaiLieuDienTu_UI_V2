/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Component } from '@angular/core';
import { DocumentService } from '../../../../service/document.service';
import { MatDialogRef } from '@angular/material/dialog';

export interface DocumentCreateRequest {
  title: string;
  description: string;
  name: string;
  file: File;
}

@Component({
  selector: 'app-document-create',
  templateUrl: './document-create.component.html',
  styleUrls: ['./document-create.component.scss'],
})
export class DocumentCreateComponent {
  title!: string;
  description!: string;
  file!: File;

  constructor(
    private documentService: DocumentService,
    private dialogRef: MatDialogRef<DocumentCreateComponent>
  ) {}

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
    }
  }

  createDocument() {
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('name', this.file.name);
    formData.append('file', this.file);

    this.documentService.createDocument(formData).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
