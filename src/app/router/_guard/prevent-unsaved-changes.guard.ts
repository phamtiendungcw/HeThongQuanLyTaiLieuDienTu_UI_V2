/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, } from '@angular/router';
import { Observable } from 'rxjs';
import { PageProfileComponent } from '../../pages/page-profile/page-profile.component';

@Injectable({
  providedIn: 'root',
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: PageProfileComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (component.editForm?.dirty) {
      return confirm(
        'Bạn có chắc chắn muốn thoát khỏi trang này? Mọi thay đổi chưa được lưu sẽ bị mất'
      );
    }
    return true;
  }
}
