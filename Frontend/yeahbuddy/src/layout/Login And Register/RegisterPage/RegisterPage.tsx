import "./style/RegisterPage.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function changeFName(e: any) {
    setFirstName(e.target.value);
  }
  function changeLName(e: any) {
    setLastName(e.target.value);
  }
  function changeEmail(e: any) {
    setEmail(e.target.value);
  }
  function changePassword(e: any) {
    setPassword(e.target.value);
  }

  const submitData = (e: any) => {
    e.preventDefault();

    let params = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:8080/api/v1/auth/register", params)
      .then(function () {
        history.push("/login");
      });
  };

  return (
    <div id="register-container">
      <h1>Register</h1>
      <form autoComplete="off" onSubmit={submitData}>
        <div>
          <label htmlFor="first-name">First Name:</label>
          <i className="fa-solid fa-user"></i>
          <input type="text" id="first-name" onChange={changeFName} />
        </div>
        <div>
          <label htmlFor="last-name">Last Name:</label>
          <i className="fa-solid fa-user"></i>
          <input type="text" id="last-name" onChange={changeLName} />
        </div>
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
        <div id="button-container">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};
