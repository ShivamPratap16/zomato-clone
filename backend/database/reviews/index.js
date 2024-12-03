import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    food: {
      type: mongoose.Types.ObjectId,
      ref: 'Foods',
      required: function () {
        return this.reviewType === 'food';
      },
    },
    restaurant: {
      type: mongoose.Types.ObjectId,
      ref: 'Restaurants',
      required: function () {
        return this.reviewType === 'restaurant';
      },
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'Users',
      // required: true,
    },
    rating: {
      type: Number,
      // required: true,
      min: 1,
      max: 5, // Ensure rating is between 1 and 5
    },
    reviewText: {
      type: String,
      trim: true,
    },
    reviewType: {
      type: String,
      enum: ['food', 'restaurant'], // Specify the type of review
      // required: true,
    },
    photos: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Images',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Adding indexes for faster queries
ReviewSchema.index({ user: 1 });
ReviewSchema.index({ food: 1 });
ReviewSchema.index({ restaurant: 1 });

export const ReviewModel = mongoose.model('Reviews', ReviewSchema);
