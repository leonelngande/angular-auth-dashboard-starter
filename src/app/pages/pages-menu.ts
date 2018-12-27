import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/dashboard',
    home: true,
  },
  {
    title: 'Components',
    icon: 'nb-gear',
    children: [
      {
        title: 'Tree',
        link: '/components/tree',
      }, {
        title: 'Notifications',
        link: '/components/notifications',
      },
    ],
  },
  {
    title: 'Miscellaneous',
    icon: 'nb-shuffle',
    children: [
      {
        title: '404',
        link: '/miscellaneous/404',
      },
    ],
  },
  {
    title: 'AuthService',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
