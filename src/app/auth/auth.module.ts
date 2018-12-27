import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ThemeModule} from '../@theme/theme.module';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {RequestPasswordComponent} from './components/request-password/request-password.component';
import {LogoutComponent} from './components/logout/logout.component';
import {AuthBlockComponent} from './components/auth-block/auth-block.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';

const COMPONENTS = [
  LoginComponent,
  AuthBlockComponent,
  LogoutComponent,
  RegisterComponent,
  RequestPasswordComponent,
  ResetPasswordComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS, ThemeModule],
})

export class AuthModule { }
