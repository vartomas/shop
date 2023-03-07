import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/models/user';
import { getAuthUser } from '@/utils/auth';
import { connect } from '@/utils/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connect();
  if (req.method === 'POST') {
    const token = req.cookies.token;
    const user = await getAuthUser(token);
    if (!user) return res.status(401).send(null);
    try {
      const updated = await User.findOneAndUpdate(
        { _id: user._id },
        { ...req.body, admin: user.admin, email: user.email },
        { new: true }
      );

      if (!updated) return res.status(400).send(null);

      res.status(200).json({
        email: updated.email,
        firstname: updated.firstname,
        lastname: updated.lastname,
        adress: updated.adress,
        city: updated.city,
        country: updated.country,
        phonenumber: updated.phonenumber,
        admin: user.admin,
      });
    } catch (error) {
      res.status(400).send(null);
    }
  }
};

export default handler;
