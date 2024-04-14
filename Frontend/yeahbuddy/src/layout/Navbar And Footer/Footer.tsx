import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./style/nav.css";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="icon-container">
        <i className="fa-solid fa-book"></i>
        <Link to="/meals" className="text">
          Diary
        </Link>
      </div>
      <div className="icon-container">
        <i className="fa-solid fa-utensils"></i>
        <Link to="/recipes" className="text">
          Recipes
        </Link>
      </div>
      <div className="icon-container">
        <i className="fa-solid fa-list"></i>
        <Link to="/list" className="text">
          List
        </Link>
      </div>
      <div className="icon-container">
        <i className="fa-solid fa-graduation-cap"></i>
        <Link to="/chat" className="text">
          Coach
        </Link>
      </div>
    </div>
  );
};
