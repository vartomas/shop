import mongoose from 'mongoose';

const connection = { isConnected: 0 as mongoose.ConnectionStates };

export const connect = async () => {
  if (connection.isConnected) return;

  const db = await mongoose.connect(
    process.env.NODE_ENV === 'development'
      ? (process.env.MONGODB_URI as string)
      : (process.env.MONGODB_URI_PROD as string)
  );

  connection.isConnected = db.connections[0].readyState;
};
