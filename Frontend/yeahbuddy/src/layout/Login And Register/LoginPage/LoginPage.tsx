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
        <img
          src="data:image/png;base64,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"
          alt="Logo"
        />
        <h1>Let your journey begin!</h1>
        <form autoComplete="off" onSubmit={login}>
          <div>
            <label htmlFor="email">Email</label>
            <i className="fa-regular fa-envelope"></i>
            <input type="email" id="email" onChange={changeEmail} />
          </div>
          <div>
            <label htmlFor="pass">Password</label>
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
