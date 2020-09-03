import React from "react";
import { Switch, Route } from "react-router-dom";
import GetBooks from "../src/BooksComponents/GetBooks";
import DetailsBooks from "../src/BooksComponents/DetailsBooks";
import CreateBooks from "./BooksComponents/CreateBooks";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={GetBooks} />
      <Route path="/details/:id" component={DetailsBooks} />
      <Route path="/create" component={CreateBooks} />
    </Switch>
  );
};
export default Routes;
