/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MemberService } from '../../../../service/member.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss'],
})
export class MemberEditComponent implements OnInit {
  editForm!: FormGroup;

  constructor(
    private memberService: MemberService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<MemberEditComponent>
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getDataEdit();
  }

  getDataEdit() {
    if (this.editData) {
      this.editForm.controls['hoVaTen'].setValue(this.editData.hoVaTen);
      this.editForm.controls['email'].setValue(this.editData.email);
      this.editForm.controls['gioiTinh'].setValue(
        this.editData.gioiTinh ? 'true' : 'false'
      );
      this.editForm.controls['ngayThangNamSinh'].setValue(
        this.editData.ngayThangNamSinh
      );
      this.editForm.controls['userName'].setValue(this.editData.userName);
      this.editForm.controls['phone'].setValue(this.editData.phone);
      this.editForm.controls['soCMND'].setValue(this.editData.soCMND);
      this.editForm.controls['ngayCapCMND'].setValue(this.editData.ngayCapCMND);
      this.editForm.controls['noiCapCMND'].setValue(this.editData.noiCapCMND);
      this.editForm.controls['diaChi'].setValue(this.editData.diaChi);
    }
  }

  initializeForm() {
    this.editForm = this.fb.group({
      hoVaTen: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      email: ['', Validators.email],
      gioiTinh: ['', Validators.required],
      ngayThangNamSinh: ['', Validators.required],
      userName: [''],
      phone: ['', Validators.required],
      soCMND: ['', Validators.required],
      ngayCapCMND: ['', Validators.required],
      noiCapCMND: ['', Validators.required],
      diaChi: ['', Validators.required],
    });
  }

  updateMember() {
    this.toastr.toastrConfig.positionClass = 'toast-bottom-right';
    if (this.editForm.controls['gioiTinh'].value === 'true') {
      this.editForm.controls['gioiTinh'].setValue(true);
    } else {
      this.editForm.controls['gioiTinh'].setValue(false);
    }
    this.memberService.updateMember(this.editForm.value).subscribe({
      next: () => {
        this.toastr.success('Cập nhật thành công');
        if (this.editForm.controls['gioiTinh'].value === true) {
          this.editForm.controls['gioiTinh'].setValue('true');
        } else {
          this.editForm.controls['gioiTinh'].setValue('false');
        }
        this.editForm.reset();
        this.dialogRef.close('update');
      },
      error: () =>
        this.toastr.error('Cập nhật không thành công!', 'Đã xảy ra sự cố'),
    });
  }
}
