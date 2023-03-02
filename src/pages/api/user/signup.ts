import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import { User } from '@/models/user';
import { generateToken } from '@/utils/auth';
import { connect } from '@/utils/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connect();
  const catcher = (error: Error) => res.status(400).json({ error });
  if (req.method === 'POST') {
    const user = await User.create(req.body).catch(catcher);
    if (!user) return;
    const token = generateToken(user._id);
    user.tokens.push({ token });
    await user.save();
    res
      .status(200)
      .setHeader('Set-Cookie', serialize('token', token, { path: '/' }))
      .json({ success: true });
  }
};

export default handler;
