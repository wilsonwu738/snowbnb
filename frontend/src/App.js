import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import ListingIndex from "./components/ListingIndex";
import ListingShow from "./components/ListingShow";
import ReservationIndex from "./components/ReservationIndex";
import ReviewForm from "./components/ReviewsIndex/ReviewForm";

//routes are defined here, specific component in each route will be render when the route matches. useParams can be used for the :id

function App() {

  
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/listings/:listingId/reviews/:reviewId/edit"><ReviewForm /></Route>
        <Route path="/listings/:listingId/newreview"><ReviewForm /></Route>
        <Route path="/listings/:listingId"><ListingShow /></Route>  
        <Route path="/trips"><ReservationIndex /></Route>
        <Route path="/"><ListingIndex /></Route>
      </Switch>
    </>
  );
}

export default App;