/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss'],
})
export class PageLoginComponent implements OnInit {
  model: any = {};
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getUsers();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32),
      ]),
      isRememberMe: [],
    });
  }

  getUsers() {
    this.accountService.currentUser$.subscribe({
      next: (response) => {
        if (response == null) return;
        this.model = response;
      },
      error: (err) => console.log(err),
      complete: () => console.log('Request has completed'),
    });
  }

  checkIsRememberMe() {
    return this.model.isRememberMe != null;
  }

  loginEventClicked() {
    this.model = this.loginForm.value;
    if (!this.checkIsRememberMe()) {
      this.model.isRememberMe = false;
    }
    this.accountService.login(this.model).subscribe({
      next: () => {
        this.accountService.setCurrentUser(this.model);
        this.router.navigate(['/admin/home']);
        this.toastr.toastrConfig.positionClass = 'toast-bottom-right';
        this.toastr.success('Đăng nhập thành công');
      },
      error: (err) => {
        this.toastr.toastrConfig.positionClass = 'toast-top-right';
        this.toastr.error(err.error);
      },
    });
  }

  registerEventClicked() {
    this.router.navigate(['account/register']);
  }
}
