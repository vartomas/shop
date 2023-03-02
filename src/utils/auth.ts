import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { User } from '@/models/user';

export const generateToken = (_id: Types.ObjectId) =>
  jwt.sign({ _id: _id.toString() }, process.env.JWT_SECRET as string);

const decodeId = (token: string) => {
  try {
    const decodedId = jwt.verify(token, process.env.JWT_SECRET as string);
    return decodedId;
  } catch (error) {
    return null;
  }
};

export const getAuthUser = async (token: string | undefined) => {
  if (!token) {
    return null;
  }

  const decodedId = decodeId(token);
  if (!decodedId) {
    return null;
  }

  const user = await User.findOne({ _id: decodedId, 'tokens.token': token });
  if (!user) {
    return null;
  }

  return user;
};
