import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import ListingIndex from "./components/ListingIndex";

function App() {
  return (
    <>
      <Navigation />
        <Switch>
          <Route path="/">
            <ListingIndex />
          </Route>
        </Switch>
    </>
  );
}

export default App;