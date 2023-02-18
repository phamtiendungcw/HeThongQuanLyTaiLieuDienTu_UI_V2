/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AccountService } from '../../service/account.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class MemberGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map((user) => {
        if (!user) return false;
        if (
          user.roles.includes('Admin') ||
          user.roles.includes('Moderator') ||
          user.roles.includes('Member')
        ) {
          return true;
        } else {
          this.toastr.error('Bạn không thể truy cập vào trang này!');
          return false;
        }
      })
    );
  }
}
