import mongoose from 'mongoose';

export default async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true, // Allows MongoDB connection string to use new parser
      useUnifiedTopology: true, // Uses the MongoDB driver's new connection management engine
    });
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
};
