import type { IronSessionOptions } from 'iron-session';

import type { User } from '@/pages/api/auth/user';

export const sessionOptions: IronSessionOptions = {
  password: '2gyZ3GDw3LHZQKDhPmPDL3sjREVRXPr8',
  cookieName: 'iron-session/examples/next.js',
  cookieOptions: {
    secure: false,
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    user?: User;
  }
}
