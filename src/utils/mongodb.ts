import mongoose from 'mongoose';

export const connect = async () =>
  await mongoose
    .connect(
      process.env.NODE_ENV === 'development'
        ? (process.env.MONGODB_URI as string)
        : (process.env.MONGODB_URI_PROD as string)
    )
    .catch((error) => console.log(error));
