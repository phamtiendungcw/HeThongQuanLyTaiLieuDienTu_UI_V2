/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, } from '@angular/forms';
import { AccountService } from '../../service/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.scss'],
})
export class PageRegisterComponent implements OnInit {
  registerForm!: FormGroup;
  validationErrors: string[] = [];

  constructor(
    private accountService: AccountService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  initializeForm() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', Validators.email],
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
      confirmPassword: [
        '',
        [Validators.required, this.matchValues('password')],
      ],
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.get(matchTo)?.value
        ? null
        : { notMatching: true };
    };
  }

  registerEventClick() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => {
        this.toastr.success('Đăng ký tài khoản thành công');
        this.router.navigate(['/admin/home']);
      },
      error: (error) => {
        this.validationErrors = error;
      },
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }
}
