import { NextApiRequest, NextApiResponse } from 'next';

export default async function loginRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // console.log(req.body);
    res.json(req.body);
  } catch (error) {
    await res.status(500).json({ message: (error as Error).message });
  }
}
