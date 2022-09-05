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

    const data = await axios.post(
      'https://open.feishu.cn/open-apis/ephemeral/v1/send',
      {
        open_id: 'ou_19d3bdee147b4141547a2ae4b7643e84',
        chat_id: 'oc_f32c119151a40858e3db432b35d37224',
        msg_type: 'interactive',
        card: {
          elements: [
            {
              fields: [
                {
                  is_short: true,
                  text: {
                    content:
                      '**👤 提交人：**\n<at email=zhangjian43@cmbc.com.cn></at>',
                    tag: 'lark_md',
                  },
                },
                {
                  is_short: true,
                  text: {
                    content: '**📅 计划开始时间：**\n2022-09-01 15:13:20',
                    tag: 'lark_md',
                  },
                },
              ],
              tag: 'div',
            },
            {
              fields: [
                {
                  is_short: false,
                  text: {
                    content:
                      '**📚 任务：**\nXXXX检查 确认系统运行情况，检查并处理异常交易',
                    tag: 'lark_md',
                  },
                },
              ],
              tag: 'div',
            },
            {
              tag: 'hr',
            },
            {
              actions: [
                {
                  tag: 'button',
                  text: {
                    content: '立即开始',
                    tag: 'plain_text',
                  },
                  type: 'primary',
                  value: {
                    key1: 'value1',
                  },
                },
                {
                  tag: 'button',
                  text: {
                    content: '完成调度',
                    tag: 'plain_text',
                  },
                  type: 'danger',
                  value: {
                    key2: 'value2',
                  },
                },
              ],
              tag: 'action',
            },
          ],
          header: {
            template: 'blue',
            title: {
              content: '📪 你有一条调度任务需要处理！',
              tag: 'plain_text',
            },
          },
        },
      }
    );

    res.json(data.data);
  } catch (error) {
    await res.status(500).json({ message: (error as Error).message });
  }
}
