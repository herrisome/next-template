import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: '登陆',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'zhangjian' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await axios.post('http://localhost:8000/api/v1/login', {
          code: '0',
          uuid: '0',
          ...credentials,
        });

        // axios.defaults.headers.common[
        //   'Authorization'
        // ] = `Bearer ${res.data.data.token}`;

        const user = await axios.get('http://localhost:8000/api/v1/getinfo', {
          headers: {
            Authorization: `Bearer ${res.data.token}`,
          },
        });

        // 如果没有错误并且我们有用户数据，则返回它
        if (res.data.code === 200) {
          return {
            ...user.data.data,
            user: user.data.data,
            // ...res.data,
          };
        }
        // 如果无法检索到用户数据，则返回 null
        return null;
      },
    }),
  ],
  debug: false,
});
