import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {breadcrumb: 'dashboard'},
      },
      {
        path: 'components',
        loadChildren: './components/components.module#ComponentsModule',
        data: {breadcrumb: 'components'},
      },
      {
        path: 'miscellaneous',
        loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
        data: {breadcrumb: 'miscellaneous'},
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      }, {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
