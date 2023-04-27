import "./style/LoginPage.css";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";


export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function changeEmail(e: any) {
    setEmail(e.target.value);
  }

  function changePassword(e: any) {
    setPassword(e.target.value);
  }

  const login = (e: any) => {
    e.preventDefault();

    let params = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:8080/api/v1/auth/authenticate", params)
      .then(function (response) {
        localStorage.setItem("auth", response.data.token);
        history.push("/");
        window.location.reload();
      });
  };

  return (
    <div id="login-container">
      <div className="login">
        <h1>Log In</h1>
        <form autoComplete="off" onSubmit={login}>
          <div>
            <label htmlFor="email">Email:</label>
            <i className="fa-regular fa-envelope"></i>
            <input type="email" id="email" onChange={changeEmail} />
          </div>
          <div>
            <label htmlFor="pass">Password:</label>
            <i className="fa-solid fa-lock"></i>
            <input type="password" id="pass" onChange={changePassword} />
          </div>
          <p>
            Don't have an account?{" "}
            <Link to="/register" id="sign-up-link">
              Sign up
            </Link>
          </p>
          <div id="button-container">
            <button type="submit">Log in</button>
          </div>
        </form>
      </div>
    </div>
  );
};
