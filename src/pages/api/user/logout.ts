import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuthUser } from '@/utils/auth';
import { connect } from '@/utils/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connect();
  const catcher = (error: Error) => res.status(400).json({ error });
  if (req.method === 'POST') {
    const token = req.cookies.token;
    const user = await getAuthUser(token);
    if (!user) return res.status(401).json({ success: false, message: 'Access denied' });
    await user
      .updateOne({
        $pull: {
          tokens: {
            token,
          },
        },
      })
      .catch(catcher);
    res.status(200).setHeader('Set-Cookie', 'token=a; Max-Age=0; Path=/').json({ success: true });
  }
};

export default handler;
