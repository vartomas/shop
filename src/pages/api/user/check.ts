import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuthUser } from '@/utils/auth';
import { connect } from '@/utils/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connect();
  if (req.method === 'POST') {
    const token = req.cookies.token;
    const user = await getAuthUser(token);
    if (!user) return res.status(401).json({ success: false, message: 'Access denied' });
    res.status(200).json({ email: user.email });
  }
};

export default handler;