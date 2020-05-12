import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import FormItem from "./components/Forms/FormItem";
import EditProfile from "./pages/EditProfile";
import EditItem from "./pages/EditItem";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/item/create" component={FormItem} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute
          exact
          path="/profile/settings"
          component={EditProfile}
        />
        <ProtectedRoute exact path="/item/edit/:id" component={EditItem} />
      </Switch>
    </div>
  );
}

export default App;
