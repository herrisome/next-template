import { atom } from 'recoil';

export const userState = atom({
  key: 'user', // unique ID (with respect to other atoms/selectors)
  default: {
    UserAvatarUrl: '',
    userId: '',
    userName: '',
    userEmail: '',
    userRole: '',
  }, // default value (aka initial value)
});
