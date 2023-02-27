/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Member } from '../../../../models/member';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss'],
})
export class MemberDetailComponent implements OnInit {
  member!: Member;
  gioiTinh!: string;
  ngaySinh!: string | null;
  ngayKhoiTao!: string | null;
  ngayTruyCap!: string | null;
  ngayCapCMND!: string | null;

  constructor(
    private dialogRef: MatDialogRef<MemberDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public detailData: Member
  ) {}

  ngOnInit(): void {
    this.member = this.detailData;
    if (this.member.gioiTinh) {
      this.gioiTinh = 'Nam';
    } else {
      this.gioiTinh = 'Nữ';
    }
    this.changeDate();
  }

  changeDate() {
    this.ngaySinh = this.changeDateUTC(this.member.ngayThangNamSinh);
    this.ngayKhoiTao = this.changeDateUTC(this.member.ngayKhoiTao);
    this.ngayTruyCap = this.changeDateUTC(this.member.ngayTruyCap);
    this.ngayCapCMND = this.changeDateUTC(this.member.ngayCapCMND);
  }

  changeDateUTC(date: Date) {
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(date, 'dd/MM/yyyy');
    return formattedDate;
  }

  close() {
    this.dialogRef.close(true);
  }
}
