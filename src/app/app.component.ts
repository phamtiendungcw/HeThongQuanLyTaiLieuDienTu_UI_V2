/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AccountService } from './service/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Hệ thống quản lý tài liệu ện tử UI';

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.setCurrentUser();
    this.checkUserLocal();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }

  private checkUserLocal() {
    const userLocal = this.accountService.getUserLocal();
    if (userLocal != null) {
      this.router.navigate(['/admin/home']);
    }
  }
}
