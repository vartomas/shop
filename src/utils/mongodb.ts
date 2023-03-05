import mongoose from 'mongoose';

export const connect = async () =>
  await mongoose.connect(process.env.MONGODB_URI as string).catch((error) => console.log(error));
