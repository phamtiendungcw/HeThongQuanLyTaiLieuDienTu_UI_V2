/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Member } from '../../../../models/member';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss'],
})
export class MemberDetailComponent implements OnInit {
  member!: Member;

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<MemberDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public detailData: any
  ) {}

  ngOnInit(): void {
    this.member = this.detailData;
  }

  close() {
    this.dialogRef.close('detail');
    this.router.navigate(['/admin/home/members']);
  }
}
