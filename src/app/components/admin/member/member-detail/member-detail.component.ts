/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Component, Inject, OnInit } from '@angular/core';
import { Member } from '../../../../models/member';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss'],
})
export class MemberDetailComponent implements OnInit {
  @Inject(MAT_DIALOG_DATA) public member!: Member;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  close() {
    this.router.navigate(['/admin/home/members']);
  }
}
