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
  searchValues = {
    email: '',
    hoVaTen: '',
    gioiTinh: '',
    diaChi: '',
    phone: '',
  };
  email!: string;
  hoVaTen!: string;
  gioiTinh!: string;
  diaChi!: string;
  phone!: string;
  dataSource!: MatTableDataSource<any>;
  toggleSearch = false;
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

  applyFilterAdvanced() {
    let filterData = this.dataSource;
    if (this.hoVaTen) {
      filterData.data = filterData.data.filter(
        (item) => item.hoVaTen && item.hoVaTen.includes(this.hoVaTen)
      );
    }
    if (this.diaChi) {
      filterData.data = filterData.data.filter(
        (item) => item.diaChi && item.diaChi.includes(this.diaChi)
      );
    }
    if (this.email) {
      filterData.data = filterData.data.filter(
        (item) => item.email && item.email.includes(this.email)
      );
    }
    if (this.phone) {
      filterData.data = filterData.data.filter(
        (item) => item.phone && item.phone.includes(this.phone)
      );
    }
    // if (this.hoVaTen) {
    //   this.dataSource.filter = this.hoVaTen.trim().toLowerCase();
    // }
    // if (this.email) {
    //   this.dataSource.filter = this.email.trim().toLowerCase();
    // }
    // if (this.phone) {
    //   this.dataSource.filter = this.phone.trim().toLowerCase();
    // }
    // if (this.diaChi) {
    //   this.dataSource.filter = this.diaChi.trim().toLowerCase();
    // }
    // if (this.gioiTinh) {
    //   this.dataSource.filter = this.gioiTinh.trim().toLowerCase();
    // }
    if (filterData.paginator) {
      filterData.paginator.firstPage();
    }
  }

  searchFormReset(searchFormValue: any) {
    searchFormValue.reset();
    this.getMembers();
  }

  toggleSearchAdvanced() {
    this.toggleSearch = !this.toggleSearch;
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
