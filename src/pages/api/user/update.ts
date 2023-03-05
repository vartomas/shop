import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuthUser } from '@/utils/auth';
import { connect } from '@/utils/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connect();
  const catcher = (error: Error) => res.status(400).json({ error });
  if (req.method === 'POST') {
    const token = req.cookies.token;
    const user = await getAuthUser(token);
    if (!user) return res.status(401).send(null);
    await user.updateOne(req.body).catch(catcher);
    res.status(200).json({
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
