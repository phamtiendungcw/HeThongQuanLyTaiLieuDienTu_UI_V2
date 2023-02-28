/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteFormComponent } from '../../../../layouts/theme/delete-form/delete-form.component';
import { ExportService } from '../../../../service/export.service';
import { MemberService } from '../../../../service/member.service';
import { MemberCreateComponent } from '../member-create/member-create.component';
import { MemberDetailComponent } from '../member-detail/member-detail.component';
import { MemberEditComponent } from '../member-edit/member-edit.component';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  crumbs = [
    {
      crumb: 'Nhân viên',
      router: '/edmslab/home/members',
    },
  ];
  displayedColumns: string[] = [
    'id',
    'userName',
    'photoUrl',
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
    private exportService: ExportService
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
    this.dialog
      .open(DeleteFormComponent, {
        data: userName,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value) {
          this.getMembers();
        }
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
        if (value) {
          this.getMembers();
        }
      });
    console.log(element);
  }

  openAddForm() {
    this.dialog
      .open(MemberCreateComponent, {
        maxWidth: '500px',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value) {
          this.getMembers();
        }
      });
  }

  exportToExcel() {
    this.exportService.exportExcel(
      this.dataSource.data,
      'Thông tin toàn bộ nhân viên'
    );
  }
}
