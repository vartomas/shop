import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/models/user';
import { getAuthUser } from '@/utils/auth';
import { connect } from '@/utils/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connect();

  const { id } = req.query;
  if (!id) {
    return res.status(400).send(null);
  }

  if (req.method === 'POST') {
    try {
      const token = req.cookies.token;
      const user = await getAuthUser(token);

      if (!user?.admin || user._id.toString() === id) {
        return res.status(401).send(null);
      }

      const updated = await User.findByIdAndUpdate(id, { admin: req.body.value }, { new: true });

      if (!updated) {
        return res.status(400).send(null);
      }

      res.status(200).json({ admin: updated.admin });
    } catch (error) {
      res.status(400).send(null);
    }
  }
};

export default handler;
