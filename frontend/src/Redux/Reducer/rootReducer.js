import { combineReducers } from "redux";

// Importing individual reducers
import restaurant from "./Restaurant/restaurant.reducer";
import image from "./Image/Image.reducer";
import reviews from "./Reviews/review.reducer";
import user from "./User/user.reducer";
import food from "./Food/Food.reducer";

// Combining reducers
const rootReducer = combineReducers({
  restaurant,
  image,
  reviews,
  user,
  food,
});

export default rootReducer;
