import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Layout from "./components/layout/Layout";
import Login from "./pages/login/Login";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Layout>
  );
};

export default App;
