import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

export const connect = async () => await mongoose.connect(MONGODB_URI as string).catch((error) => console.log(error));
