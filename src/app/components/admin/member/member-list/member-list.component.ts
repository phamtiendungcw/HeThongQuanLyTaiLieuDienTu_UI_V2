/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MemberService } from '../../../../service/member.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MemberDetailComponent } from '../member-detail/member-detail.component';
import { MemberEditComponent } from '../member-edit/member-edit.component';
import { MemberCreateComponent } from '../member-create/member-create.component';
import { DeleteFormComponent } from '../../../../layouts/theme/delete-form/delete-form.component';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  crumbs = [
    {
      crumb: 'Nhân viên',
      router: '/admin/home/members',
    },
  ];
  displayedColumns: string[] = [
    'id',
    'email',
    'hoVaTen',
    'ngayThangNamSinh',
    'gioiTinh',
    'phone',
    'soCMND',
    'hanhDong',
  ];
  dataSource!: MatTableDataSource<any>;
  @Inject(MAT_DIALOG_DATA) public editData: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private memberService: MemberService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers() {
    this.memberService.getMembers().subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => console.log(error),
    });
  }

  deleteMember(userName: string) {
    this.dialog.open(DeleteFormComponent);
    this.memberService.deleteMember(userName).subscribe({
      next: () => this.toastr.success('Xoá nhân viên thành công'),
      error: (err) => {
        this.toastr.error('Đã có lỗi xảy ra khi thực hiện thao tác xoá');
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDetailForm(element: any) {
    this.dialog.open(MemberDetailComponent, {
      maxWidth: '500px',
      data: element,
    });
  }

  openEditForm(element: any) {
    this.dialog
      .open(MemberEditComponent, {
        maxWidth: '500px',
        data: element,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getMembers();
        }
      });
  }

  openAddForm() {
    this.dialog
      .open(MemberCreateComponent, {
        maxWidth: '500px',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'add') {
          this.getMembers();
        }
      });
  }
}
