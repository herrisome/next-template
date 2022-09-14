import { atom } from 'recoil';

export const userInfoState = atom({
  key: 'nameState',
  default: {},
});

// export const lengthState = selector({
//   key: 'lengthState',
//   get: ({ get }) => {
//     const name = get(userInfoState);
//     return name.length;
//   },
// });
