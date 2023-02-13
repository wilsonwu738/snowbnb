import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import ListingIndex from "./components/ListingIndex";

//routes are defined here

function App() {
  return (
    <>
      <Navigation />
        <Switch>
          <Route path="listings/:listingsId"></Route>
          <Route path="/"><ListingIndex /></Route>
        </Switch>
    </>
  );
}

export default App;