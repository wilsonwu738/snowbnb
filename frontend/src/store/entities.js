import listingsReducer from "./listings";
import reservationsReducer from "./reservations";
import reviewsReducer from "./reviews";
import { combineReducers } from "redux";

const entitiesReducer = combineReducers({
  listings: listingsReducer,
  reservations: reservationsReducer,
  reviews: reviewsReducer
})

export default entitiesReducer