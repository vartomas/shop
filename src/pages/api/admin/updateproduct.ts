import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';
import { Product } from '@/models/product';
import { getAuthUser } from '@/utils/auth';
import { connect } from '@/utils/mongodb';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, new Date().getTime() + file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req: NextApiRequest & { file: File & { filename: string } }, res: NextApiResponse) {
    res.status(501).send(null);
  },
  onNoMatch(req, res) {
    res.status(405).send(null);
  },
});

apiRoute.use(upload.single('image'));

apiRoute.post(async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).send(null);
  }

  try {
    await connect();

    const token = req.cookies.token;
    const user = await getAuthUser(token);
    if (!user?.admin) {
      return res.status(401).send(null);
    }

    const updateBody = {
      ...req.body,
      image: req.file ? 'uploads/' + req.file.filename : undefined,
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, updateBody, { new: true });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).send(null);
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
