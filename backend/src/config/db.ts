import mongoose from 'mongoose';

const db = async () => {
  const mongoURI = process.env.MONGO_URI as string;

  try {
    await mongoose.connect(mongoURI);

    console.log('db connected');
  } catch (error) {
    console.error('connection failed', error);
  }
};

export default db;
