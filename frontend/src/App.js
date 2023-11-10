import React, {useEffect, useState} from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import ListingIndex from "./components/ListingIndex";
import ListingShow from "./components/ListingShow";
import ReservationIndex from "./components/ReservationIndex";
import ReviewForm from "./components/ReviewForm";

//routes are defined here, specific component in each route will be render when the route matches. useParams can be used for the :id

function App() {
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    setIsHomePage(location.pathname === '/');
  }, [location]);
  
  return (
    <>
      <Navigation isSticky={isHomePage} showSearch={isHomePage}/>
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