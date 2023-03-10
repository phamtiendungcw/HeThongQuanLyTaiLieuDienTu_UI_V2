/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  baseUrl = environment.baseUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) {}

  addMembers(member: Member) {
    return this.http.post<Member>(this.baseUrl + 'account/register', member);
  }

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'user');
  }

  getMember(username: string) {
    const member = this.members.find((x) => x.userName == username);
    if (member) return of(member);
    return this.http.get<Member>(this.baseUrl + 'user/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'user', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = { ...this.members[index], ...member };
      })
    );
  }

  deleteMember(username: string) {
    return this.http.delete(this.baseUrl + 'user/' + username);
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'user/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'user/delete-photo/' + photoId);
  }
}
