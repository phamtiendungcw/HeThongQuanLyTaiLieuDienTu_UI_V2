/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Member } from '../../models/member';
import { AccountService } from '../../service/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MemberService } from '../../service/member.service';
import { DOCUMENT } from '@angular/common';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() toggleSidebar: EventEmitter<any> = new EventEmitter();
  user!: User;
  member!: Member;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private memberService: MemberService
  ) {}

  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
    this.toggleSidebar.emit();
    this.loadMember();
  }

  loadMember() {
    let username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    this.memberService.getMember(username).subscribe({
      next: (member) => (this.member = member),
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/account/login']).then((x) => x.valueOf());
    this.toastr.success('Bạn đã đăng xuất khỏi hệ thống');
  }
}
