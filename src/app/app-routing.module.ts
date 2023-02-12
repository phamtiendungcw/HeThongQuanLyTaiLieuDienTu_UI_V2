/*
 * Copyright (c) 2023. Phạm Tiến Dũng (DungCW)
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageError404Component } from './pages/errors/page-error404/page-error404.component';
import { PageError500Component } from './pages/errors/page-error500/page-error500.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'client',
    loadChildren: () =>
      import('./components/client/client.module').then((m) => m.ClientModule),
  },
  { path: 'not-found', component: PageError404Component },
  { path: 'server-error', component: PageError500Component },
  { path: '**', component: PageError404Component, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
