import { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '@/models/product';
import { getAuthUser } from '@/utils/auth';
import { connect } from '@/utils/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connect();

  if (req.method === 'POST') {
    try {
      const token = req.cookies.token;
      const user = await getAuthUser(token);

      if (!user?.admin) {
        return res.status(401).send(null);
      }

      const deleted = await Product.findByIdAndDelete(req.body.id);

      if (!deleted) {
        return res.status(400).send(null);
      }

      res.status(200).send(null);
    } catch (error) {
      res.status(400).send(null);
    }
  }
};

export default handler;
