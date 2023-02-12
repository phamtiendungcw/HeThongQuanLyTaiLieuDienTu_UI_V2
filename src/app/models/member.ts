/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { Photo } from './photo';

export interface Member {
  id: number;
  userName: string;
  email: string;
  phone: string;
  hoVaTen: string;
  photoUrl: string;
  tuoi: number;
  ngayThangNamSinh: Date;
  diaChi: string;
  gioiTinh: boolean;
  soCMND: string;
  noiCapCMND: string;
  ngayCapCMND: Date;
  ngayKhoiTao: Date;
  ngayTruyCap: Date;
  photos: Photo[];
}
