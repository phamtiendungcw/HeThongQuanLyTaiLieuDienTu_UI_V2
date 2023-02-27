/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { PageProfileComponent } from '../../pages/page-profile/page-profile.component';

@Injectable({
  providedIn: 'root',
})
export class PreventUnsavedChangesGuard
  implements CanDeactivate<PageProfileComponent>
{
  canDeactivate(component: PageProfileComponent): boolean {
    if (component.editForm?.dirty) {
      return confirm(
        'Bạn có chắc chắn muốn thoát khỏi trang này? Mọi thay đổi chưa được lưu sẽ bị mất'
      );
    }
    return true;
  }
}
