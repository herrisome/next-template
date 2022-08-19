import { NextApiRequest, NextApiResponse } from 'next';

// export default withIronSessionApiRoute(getUser, sessionOptions);

export function getUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userData = {
      userAvatarUrl:
        'https://artbreeder.b-cdn.net/imgs/12c8f184bb0f3e4d01d701d1d6b9.jpeg',
      userId: 'artbreeder',
      userName: 'art breeder',
      userEmail: 'artbreeder@art.com',
      userRole: 'admin',
    };
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
