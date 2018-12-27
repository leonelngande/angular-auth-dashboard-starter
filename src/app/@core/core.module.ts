import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbAuthJWTToken,
  NbAuthModule,
  NbDummyAuthStrategy,
  NbPasswordAuthStrategy,
} from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';

const socialLinks = [
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'socicon-facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'socicon-twitter',
  },
];

const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    success: true,
  },
};

const formSettingLogin: any = {
  ...formSetting,
  strategy: 'email',
};

const formSettingRegister: any = {
  ...formSetting,
  strategy: 'email',
};

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({

    strategies: [
      NbDummyAuthStrategy.setup({
        name: 'emailDummy',
      }),
      NbPasswordAuthStrategy.setup({
        name: 'email',
        token: {
          class: NbAuthJWTToken,
          key: 'access_token',
        },
        refreshToken: {
          endpoint: `/auth/refresh_token`,
          method: 'post',
          redirect: {
            success: '/',
            failure: '/auth/login',
          },
        },

        baseEndpoint: '/api',
        login: {
          endpoint: '/auth/login',
          method: 'post',
        },
        register: {
          redirect: {
            success: '/',
          },
          endpoint: '/auth/signup', // used only by sub distributor registration for now
          method: 'post',
        },
        logout: {
          endpoint: '/auth/logout',
          method: 'delete',
        },
        requestPass: {
          endpoint: '/auth/password/create',
          method: 'post',
        },
        resetPass: {
          endpoint: '/auth/password/reset',
          method: 'post',
        },
      }),
    ],
    forms: {
      login: formSettingLogin,
      register: formSettingRegister,
      requestPassword: formSetting,
      resetPassword: formSetting,
      logout: {
        redirect: {
          success: '/',
          failure: '/',
        },
      },
      validation: {
        password: {
          minLength: 4,
        },
        fullName: {
          required: false,
          minLength: 4,
          maxLength: 50,
        },
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
