/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../models/member';
import { AccountService } from '../../service/account.service';
import { MemberService } from '../../service/member.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { take } from 'rxjs';

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.scss'],
})
export class PageProfileComponent implements OnInit {
  @ViewChild('editForm') editForm!: NgForm;
  member!: Member;
  user: User | null = null;

  constructor(
    public accountService: AccountService,
    private memberService: MemberService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => (this.user = user),
    });
  }

  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    if (!this.user) return;
    this.memberService.getMember(this.user.username).subscribe({
      next: (member) => {
        this.member = member;
      },
      error: (err) => console.log(err),
    });
  }

  updateMember() {
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: () => {
        this.member = this.editForm.value;
        this.toastr.success('Thông tin người dùng đã được cập nhật thành công');
        this.editForm?.reset(this.member);
      },
      error: (err) => console.log(err),
    });
  }
}
