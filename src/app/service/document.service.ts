/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Document } from '../models/document';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private baseUrl = environment.baseUrl + 'document';

  constructor(private http: HttpClient) {}

  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.baseUrl);
  }

  createDocument(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl, formData);
  }

  getDocument(id: number): Observable<Document> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Document>(url);
  }

  updateDocument(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, formData);
  }

  deleteDocument(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  downloadDocument(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${id}/download`, {
      responseType: 'blob',
    });
  }
}
