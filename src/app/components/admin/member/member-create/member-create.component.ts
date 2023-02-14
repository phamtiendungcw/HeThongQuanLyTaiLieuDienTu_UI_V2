/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../../service/account.service';
import { Router } from '@angular/router';
import { MemberService } from '../../../../service/member.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.scss'],
})
export class MemberCreateComponent implements OnInit {
  createForm!: FormGroup;
  validationErrors: string[] = [];
  startDate = new Date(1990, 1, 1);

  constructor(
    private accountService: AccountService,
    private memberService: MemberService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MemberCreateComponent>
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.createForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', Validators.email],
      gioiTinh: ['', Validators.required],
      ngayThangNamSinh: [''],
      hoVaTen: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(32),
        ],
      ],
    });
  }

  addMember() {
    if (this.createForm.valid) {
      if (this.createForm.controls['gioiTinh'].value === 'true') {
        this.createForm.controls['gioiTinh'].setValue(true);
      } else {
        this.createForm.controls['gioiTinh'].setValue(false);
      }
      this.memberService.addMembers(this.createForm.value).subscribe({
        next: () => {
          this.toastr.success('Thêm mới nhân viên thành công');
          if (this.createForm.controls['gioiTinh'].value === true) {
            this.createForm.controls['gioiTinh'].setValue('true');
          } else {
            this.createForm.controls['gioiTinh'].setValue('false');
          }
          this.createForm.reset();
          this.dialogRef.close(true);
          this.router.navigate(['/admin/home/members']).then();
        },
        error: (err) => this.toastr.error('Đã có lỗi xảy ra' + err),
      });
    }
  }
}
