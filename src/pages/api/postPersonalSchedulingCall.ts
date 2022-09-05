import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function loginRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //获取TOKEN
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

    const data = await axios.patch(
      'https://open.feishu.cn/open-apis/im/v1/messages/om_cc41eb50de2dd56a4e7a420d3a4455ea/urgent_phone?user_id_type=open_id',
      {
        user_id_list: ['ou_19d3bdee147b4141547a2ae4b7643e84'],
      }
    );

    res.json(data.data);
  } catch (error) {
    await res.status(500).json({ message: (error as Error).message });
  }
}
