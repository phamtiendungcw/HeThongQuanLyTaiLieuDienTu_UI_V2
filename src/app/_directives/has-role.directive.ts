/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Directive, Input, OnInit, TemplateRef, ViewContainerRef, } from '@angular/core';
import { User } from '../models/user';
import { AccountService } from '../service/account.service';
import { take } from 'rxjs';

@Directive({
  selector: '[appHasRole]', // *appHasRole='["Quản trị viên", ...]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole!: string[];
  user!: User;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private accountService: AccountService
  ) {
    accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) this.user = user;
      },
    });
  }

  ngOnInit(): void {
    // Xoá show khi không có role
    if (!this.user?.roles || this.user == null) {
      this.viewContainerRef.clear();
      return;
    }
    if (this.user?.roles.some((r) => this.appHasRole.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
