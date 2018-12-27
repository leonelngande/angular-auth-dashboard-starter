import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutService } from './layout.service';
import {ApiService} from '../api/api.service';
import {LoggedInUserResolver} from '../resolvers/logged-in-user.resolver';
import {UserResolver} from '../resolvers/user.resolver';
import {UserService} from './user.service';

const RESOLVERS = [
  LoggedInUserResolver,
  UserResolver,
];

const SERVICES = [
  ApiService,
  UserService,
  LayoutService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
    ...RESOLVERS,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
        ...RESOLVERS,
      ],
    };
  }
}
