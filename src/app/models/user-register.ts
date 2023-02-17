/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

export interface UserRegister {
  username: string;
  password: string;
  email: string;
  phone?: string;
  hoVaTen: string;
  ngayThangNamSinh?: Date;
  diaChi?: string;
  gioiTinh?: boolean;
  soCMND?: string;
  noiCapCMND?: string;
  ngayCapCMND?: Date;
  isRememberMe?: boolean;
}
