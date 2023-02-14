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

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.scss'],
})
export class PageProfileComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined;
  member!: Member;

  constructor(
    private accountService: AccountService,
    private memberService: MemberService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

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
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    this.memberService.getMember(username).subscribe({
      next: (member) => (this.member = member),
    });
  }

  updateMember() {
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: () => {
        this.toastr.success('Thông tin người dùng đã được cập nhật thành công');
        this.editForm?.reset(this.member);
      },
    });
  }
}
