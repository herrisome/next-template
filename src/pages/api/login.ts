import axios from 'axios';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

import { sessionOptions } from '@/lib/session';


export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = await axios.post(
      `https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal`,
      {
        app_id: process.env.APP_ID,
        app_secret: process.env.APP_SECRET,
      }
    );
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token.data.tenant_access_token}`;

    const {
      data: { data,code },
    } = await axios.post(
      'https://open.feishu.cn/open-apis/authen/v1/access_token',
      {
        grant_type: 'authorization_code',
        code: req.body.code,
      }
    );
      const user = { isLoggedIn: true, ...data }

    if (code === 0) {
        req.session.user = user;
        await req.session.save();
        res.json(user);
    }else{
        res.json({
            isLoggedIn: false,
            login: '',
            avatarUrl: '',
        });
    }
  } catch (error) {
    await res.status(500).json({message: (error as Error).message});
  }
}
