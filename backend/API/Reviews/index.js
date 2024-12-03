import express from 'express';
import { ReviewModel } from '../../database/allModels.js';

const Router = express.Router();
Router.use(express.json());
/*
Route     /
Des       Add a new review
Params    none
Body      { experienceType, stars, reviewText }
Access    Public
Method    POST
*/
Router.post('/api/reviews', async (req, res) => {
  console.log("hadfsd sdfsadf ")
  try {
    const { experienceType, stars, reviewText } = req.body;
    console.log(experienceType,stars, reviewText );
    // Input Validation
    if (!experienceType || !stars) {
      return res.status(400).json({ error: 'Experience type and stars are required.' });
    }

    if (stars < 1 || stars > 5) {
      return res.status(400).json({ error: 'Stars must be between 1 and 5.' });
    }

    // Create a new review
    const review = new ReviewModel({ experienceType, stars, reviewText });
    console.log(review)
    await review.save();

    return res.status(201).json({ message: 'Review saved successfully!', review });
  } catch (error) {
    
    return res.status(500).json({ error: error.message,something:"hey bro i am from catch ronak worked " });
  }
});

/*
Route     /
Des       Get all reviews
Params    none
Access    Public
Method    GET
*/
Router.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await ReviewModel.find().sort({ createdAt: -1 });
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route     /delete/:_id
Des       Delete a review by ID
Params    _id
Access    Public
Method    DELETE
*/
Router.delete('/api/reviews/:_id', async (req, res) => {
  try {
    const { _id } = req.params;

    // Check if the review exists
    const deletedReview = await ReviewModel.findByIdAndDelete(_id);
    if (!deletedReview) {
      return res.status(404).json({ error: 'Review not found.' });
    }

    return res.status(200).json({ message: 'Successfully deleted the review.' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
