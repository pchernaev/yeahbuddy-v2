import { useContext, useState } from "react";
import User from "../../model/User";
import "./style/home.css";
import jwt_decode from "jwt-decode";
import { UserContext } from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../Navbar And Footer/Navbar";
import { Footer } from "../Navbar And Footer/Footer";

export const HomePage = () => {
  const user = useContext(UserContext);
  const history = useHistory();

  if (user.email != null) {
    const url: string = `http://localhost:8080/api/v1/user/email=${user.email}`;
    axios.get(url).then(function (response) {
      const responseData = response.data;
      if (responseData.activity == null) {
        history.push("/user-info");
      }
    });
  }

  return (
    <div>
      <Navbar />
      <div id="home-container">
        <div id="container">
          <section>
            {user.email ? (
              <h2>Welcome, {user.firstName} !</h2>
            ) : (
              <div></div>
            )}
            <h1>Let your journey begin!</h1>
          </section>
        </div>
        <div id="articles">
          <article>
            <div>
              <i className="fa-solid fa-bowl-food"></i>
            </div>
            <h3>Learn about what you eat</h3>
            <p>
              When it comes to our diets, we often hear the phrase "you are what
              you eat." But do we really understand what that means? Learning
              about what we eat is an important step in making informed choices
              about our health and wellbeing.
            </p>
          </article>
          <article>
            <div>
              <i className="fa-solid fa-bars-progress"></i>
            </div>
            <h3>Track your progress</h3>
            <p>
              Tracking your fitness progress is an important part of achieving
              your health and wellness goals. By monitoring your progress, you
              can see how far you've come and make adjustments to your routine
              to keep moving forward.
            </p>
          </article>
          <article>
            <div>
              <i className="fa-solid fa-heart"></i>
            </div>
            <h3>Build a healty lifestyle</h3>
            <p>
              Building a healthy lifestyle is a long-term commitment that
              requires a balance of healthy habits, including good nutrition,
              regular exercise, stress management, and adequate sleep. By making
              small changes to your daily routine, you can build a healthier
              lifestyle and improve your overall wellbeing.
            </p>
          </article>
        </div>
      </div>
      <Footer />
    </div>
  );
};
