import { useContext, useState } from "react";
import User from "../../model/User";
import "./style/home.css";
import jwt_decode from "jwt-decode";
import { UserContext } from "../../context/UserContext";
import { useHistory } from "react-router-dom";

export const HomePage = () => {
  const user = useContext(UserContext);
  const history = useHistory();

  return (
    <div id="home-container">
      <div id="container">
        <section>
          <h1>Yeah Buddy</h1>
          <h3>Let your journey begin!</h3>
          {user.email ? (
            <h4>Welcome, {user.firstName} !</h4>
          ) : (
            <button
              onClick={() => {
                history.push("/login");
              }}
            >
              Start Now!
            </button>
          )}
        </section>
      </div>
      <div id="articles">
        <article>
          <div>
            <i className="fa-solid fa-bowl-food"></i>
          </div>
          <h3>Learn about what you eat</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
        </article>
        <article>
          <div>
            <i className="fa-solid fa-bars-progress"></i>
          </div>
          <h3>Track your progress</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
        </article>
        <article>
          <div>
            <i className="fa-solid fa-heart"></i>
          </div>
          <h3>Build a healty lifestyle</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
        </article>
      </div>
    </div>
  );
};
