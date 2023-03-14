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
      if (!user) return res.status(401).send(null);
      const confirm = await bcrypt.compare(req.body.password, user.password);
      if (confirm) {
        const token = generateToken(user._id);
        user.tokens.push({ token, createdAt: new Date().getTime() });
        await user.save();
        res
          .status(200)
          .setHeader('Set-Cookie', serialize('token', token, { path: '/', maxAge: 60 * 60 * 24 * 365 }))
          .json({
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            adress: user.adress,
            city: user.city,
            country: user.country,
            phonenumber: user.phonenumber,
            admin: user.admin,
          });
      } else res.status(401).send(null);
    } catch (error) {
      res.status(401).json(error);
    }
  }
};

export default handler;
