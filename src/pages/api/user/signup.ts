import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import { User } from '@/models/user';
import { generateToken } from '@/utils/auth';
import { connect } from '@/utils/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connect();
  const catcher = () => res.status(400).send(null);
  if (req.method === 'POST') {
    const user = await User.create(req.body).catch(catcher);
    if (!user) return res.status(400).send(null);
    const token = generateToken(user._id);
    user.tokens.push({ token });
    await user.save();
    res
      .status(200)
      .setHeader('Set-Cookie', serialize('token', token, { path: '/' }))
      .json({
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        adress: user.adress,
        city: user.city,
        coutnry: user.country,
        phonenumber: user.phonenumber,
      });
  }
};

export default handler;
