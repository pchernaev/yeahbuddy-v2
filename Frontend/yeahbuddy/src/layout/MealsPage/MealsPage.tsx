import { useState } from "react";
import { MealContext } from "../../context/MealContext";
import { MealGroup } from "./components/MealGroup";
import { MealsInfo } from "./components/MealsInfo";
import "./style/MealsPage.css";
import { Navbar } from "../Navbar And Footer/Navbar";
import { Footer } from "../Navbar And Footer/Footer";

export const MealsPage = () => {
  return (
    <div>
      <Navbar/>
      <div id="meals-page-container">
        <MealsInfo />
        <MealGroup group={"Breakfast"} id={1} />
        <MealGroup group={"Lunch"} id={2} />
        <MealGroup group={"Dinner"} id={3} />
        <MealGroup group={"Snack"} id={4} />
      </div>
      <Footer/>
    </div>
  );
};
