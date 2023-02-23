/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Component, EventEmitter, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from '../../../models/user';
import { AccountService } from '../../../service/account.service';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.scss'],
})
export class RolesModalComponent {
  @Input() updateSelectedRoles = new EventEmitter();
  user!: User;
  roles!: any[];

  constructor(
    public bsModalRef: BsModalRef,
    public accountService: AccountService
  ) {}

  updateRoles() {
    this.updateSelectedRoles.emit(this.roles);
    this.bsModalRef.hide();
  }
}
