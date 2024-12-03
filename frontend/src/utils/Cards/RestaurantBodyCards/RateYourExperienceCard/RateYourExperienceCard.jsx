import { useState } from "react";
import { Formik, Form } from "formik";
import axios from "axios";

import css from "./RateYourExperienceCard.module.css";
import RadioBtn from "../../../FormUtils/RadioUtil/RadioUtil";
import RatingNumberBox from '../../../RestaurantUtils/RatingNumberBox/RatingNumberBox';

const RateYourExperienceCard = () => {
  const [stars, setStars] = useState(0);
  const [quots] = useState(["", "Horrible", "Bad", "Average", "Good", "Excellent"]);

  const handleSubmit = async (values) => {
//okay let's create chat gpt prompt to send review to backend

  // const reviewData = {
  //   experienceType: values.type,
  //   stars,
  //   reviewText: values.reviewText
  // };
  // console.log(reviewData);
  //now let's send this review data to backend
  // try {
  //   const response = await axios.post('http://localhost:4000/review/api/reviews', reviewData);
  //   console.log(response.data);
  //   alert('Review submitted successfully!');
  // } catch (error) {
  //   console.error(error);
  // } 


    console.log(values);
    const reviewData = {
      experienceType: values.type,
      stars,
      reviewText: values.reviewText
    };
    console.log(reviewData);
    try {
      const response = await axios.post('http://localhost:4000/review/api/reviews', reviewData);
      console.log(response.data);
      alert('Review submitted successfully!');
    } catch (error) {
      console.error(error)
      console.log(response)
      alert('Failed to submit the review.');
      res.status(500).json({ error: error.message });
    }
  };


  return (
    <div className={css.outerDiv}>
      <div className={css.innerDiv}>
        <div className={css.ttl}>Rate your experience for</div>
        <Formik
          initialValues={{ type: "dining", reviewText: "" }}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form className={css.form}>
              <div className={css.radioOptns}>
                <RadioBtn label="Dining" name="type" value="dining" />
                <RadioBtn label="Delivery" name="type" value="delivery" />
              </div>
              <div className={css.ratingBox}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <RatingNumberBox
                    key={num}
                    stars={stars}
                    txt={`${num}`}
                    iconR={stars > num}
                    isActive={stars >= num}
                    onClick={() => setStars(num)}
                  />
                ))}
                <div className={css.ratingTxt}>{quots[stars]}</div>
              </div>
              <textarea
                name="reviewText"
                placeholder="Write a review..."
                value={values.reviewText}
                onChange={handleChange}
                className={css.textarea}
              />
              <button type="submit" className={css.submitBtn}>
                Submit Review
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RateYourExperienceCard;
