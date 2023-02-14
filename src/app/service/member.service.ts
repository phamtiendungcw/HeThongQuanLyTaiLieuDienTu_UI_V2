/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  baseUrl = environment.baseUrl;
  member: Member[] = [];

  constructor(private http: HttpClient) {}

  addMembers(member: Member) {
    return this.http.post<Member>(this.baseUrl + 'account/register', member);
  }

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'user');
  }

  getMember(username: string) {
    const member = this.member.find((x) => x.userName == username);
    if (member) return of(member);
    return this.http.get<Member>(this.baseUrl + 'user/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'user', member);
  }

  deleteMember(username: string) {
    return this.http.delete(this.baseUrl + 'user/' + username);
  }
}
