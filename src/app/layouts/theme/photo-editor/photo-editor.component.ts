/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../../models/member';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { User } from '../../../models/user';
import { AccountService } from '../../../service/account.service';
import { take } from 'rxjs';
import { Photo } from '../../../models/photo';
import { MemberService } from '../../../service/member.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss'],
})
export class PhotoEditorComponent implements OnInit {
  @Input() member!: Member;
  uploader!: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.baseUrl;
  user!: User;

  constructor(
    private accountService: AccountService,
    private memberService: MemberService,
    private toastr: ToastrService,
    private router: Router
  ) {
    accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) this.user = user;
      },
    });
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo.id).subscribe({
      next: () => {
        if (this.user && this.member) {
          this.user.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.user);
          this.member.photoUrl = photo.url;
          this.member.photos.forEach((p) => {
            if (p.isMain) p.isMain = false;
            if (p.id === photo.id) p.isMain = true;
          });
        }
        this.router.navigate(['/account/profile/' + this.user.username]).then();
        this.toastr.success('Thay đổi ảnh đại diện thành công', '', {
          positionClass: 'toast-bottom-right',
        });
      },
    });
  }

  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe({
      next: (_) => {
        if (this.member) {
          this.member.photos = this.member.photos.filter(
            (x) => x.id !== photoId
          );
        }
        this.router.navigate(['/account/profile/' + this.user.username]).then();
        this.toastr.success('Xoá ảnh thành công', '', {
          positionClass: 'toast-bottom-right',
        });
      },
    });
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'user/add-photo',
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response) => {
      if (response) {
        const photo = JSON.parse(response);
        this.member?.photos.push(photo);
      }
    };
  }
}
