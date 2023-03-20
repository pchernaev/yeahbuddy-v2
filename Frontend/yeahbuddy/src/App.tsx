import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./auth/PrivateRoute";
import { LoginPage } from "./layout/Login And Register/LoginPage/LoginPage";
import { RegisterPage } from "./layout/Login And Register/RegisterPage/RegisterPage";
import { AddMeal } from "./layout/AddMeal/AddMeal";
import { Navbar } from "./layout/Navbar And Footer/Navbar";
import { MealsPage } from "./layout/MealsPage/MealsPage";
import { HomePage } from "./layout/HomePage/HomePage";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import User from "./model/User";
import { setAuthToken } from "./auth/setAuthToken";
import { ProfilePage } from "./layout/ProfilePage/ProfilePage";
import { MealContext } from "./context/MealContext";

function App() {
  const [date, setDate] = useState(new Date());
  const [group, setGroup] = useState(1);

  const [user, setUser] = useState<User>(() => {
    const token = localStorage.getItem("auth");

    if (token) {
      const parsedToken: any = jwt_decode(token);
      setAuthToken(token);

      if (parsedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("auth");
        return new User();
      } else {
        const user = new User(
          parsedToken.firstName,
          parsedToken.lastName,
          parsedToken.sub
        );
        return user;
      }
    }

    return new User();
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <UserContext.Provider value={user}>
            <Route exact path="/" component={withRouter(HomePage)} />
            <Route path="/home" component={withRouter(HomePage)} />
            <Route path="/login" component={withRouter(LoginPage)} />
            <Route path="/register" component={withRouter(RegisterPage)} />
            <MealContext.Provider value={{ date, setDate, group, setGroup }}>
              <PrivateRoute path="/add-meal" component={AddMeal} />
              <PrivateRoute path="/meals" component={MealsPage} />
            </MealContext.Provider>
            <PrivateRoute path="/profile" component={ProfilePage} />
          </UserContext.Provider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
