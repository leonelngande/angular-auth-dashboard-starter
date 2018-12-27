import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {NbAuthComponent} from '@nebular/auth';
import {LoginComponent} from './auth/components/login/login.component';
import {RegisterComponent} from './auth/components/register/register.component';
import {LogoutComponent} from './auth/components/logout/logout.component';
import {RequestPasswordComponent} from './auth/components/request-password/request-password.component';
import {ResetPasswordComponent} from './auth/components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
      {
        path: 'request-password',
        component: RequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
    ],
  },
  { path: '', loadChildren: 'app/pages/pages.module#PagesModule' },
  // { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
