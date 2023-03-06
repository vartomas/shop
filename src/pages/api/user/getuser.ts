import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuthUser } from '@/utils/auth';
import { connect } from '@/utils/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connect();
  if (req.method === 'GET') {
    const token = req.cookies.token;
    const user = await getAuthUser(token);
    if (!user) return res.status(401).send(null);
    res.status(200).json({
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      adress: user.adress,
      city: user.city,
      country: user.country,
      phonenumber: user.phonenumber,
      admin: user.admin,
    });
  }
};

export default handler;
