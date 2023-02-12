/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err) {
          switch (err.status) {
            case 400:
              if (err.error.errors) {
                const modelStateErrors = [];
                for (const key in err.error.errors) {
                  if (err.error.errors[key]) {
                    modelStateErrors.push(err.error.errors[key]);
                  }
                }
                throw modelStateErrors.flat();
              } else {
                this.toastr.error(err.error, err.status.toString(), {
                  positionClass: 'toast-top-right',
                });
              }
              break;
            case 401:
              this.toastr.error(
                'Xác thực tài khoản không thành công',
                err.status.toString(),
                {
                  positionClass: 'toast-top-right',
                }
              );
              break;
            case 404:
              this.router.navigate(['not-found']);
              break;
            case 500:
              const navigationExtras: NavigationExtras = {
                state: { err: err.error },
              };
              this.router.navigate(['server-error'], navigationExtras);
              break;
            default:
              this.toastr.error('Đã xảy ra sự cố ngoài ý muốn', '', {
                positionClass: 'toast-bottom-right',
              });
              console.log(err);
              break;
          }
        }
        throw err;
      })
    );
  }
}
