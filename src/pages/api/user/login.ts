import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';
import { User } from '@/models/user';
import { generateToken } from '@/utils/auth';
import { connect } from '@/utils/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connect();
  if (req.method === 'POST') {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(401).json({ success: false, message: 'Wrong username or password' });
      const confirm = await bcrypt.compare(req.body.password, user.password);
      if (confirm) {
        const token = generateToken(user._id);
        user.tokens.push({ token });
        await user.save();
        res
          .status(200)
          .setHeader('Set-Cookie', serialize('token', token, { path: '/' }))
          .json({
            success: true,
            email: user.email,
          });
      } else res.status(401).json({ success: false, message: 'Wrong username or password' });
    } catch (error) {
      res.status(401).json(error);
    }
  }
};

export default handler;
