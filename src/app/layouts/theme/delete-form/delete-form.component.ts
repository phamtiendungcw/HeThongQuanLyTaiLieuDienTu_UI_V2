/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from '../../../service/member.service';
import { Member } from '../../../models/member';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-form',
  templateUrl: './delete-form.component.html',
  styleUrls: ['./delete-form.component.scss'],
})
export class DeleteFormComponent {
  member!: Member;

  constructor(
    private router: Router,
    private memberService: MemberService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public deleteData: any
  ) {}

  deleteMember() {
    this.memberService.deleteMember(this.deleteData).subscribe({
      next: () => this.toastr.success('Xoá nhân viên thành công'),
      error: (err) => {
        this.toastr.error('Đã có lỗi xảy ra khi thực hiện thao tác xoá');
        console.log(err);
      },
    });
  }
}
