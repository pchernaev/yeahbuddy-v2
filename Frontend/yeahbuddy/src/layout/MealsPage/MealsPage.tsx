import { useState } from "react";
import { MealContext } from "../../context/MealContext";
import { MealGroup } from "./components/MealGroup";
import { MealsInfo } from "./components/MealsInfo";
import "./style/MealsPage.css";

export const MealsPage = () => {
  return (
    <div id="meals-page-container">
      <MealsInfo />
      <MealGroup group={"Breakfast"} id={1} />
      <MealGroup group={"Lunch"} id={2} />
      <MealGroup group={"Dinner"} id={3} />
      <MealGroup group={"Snack"} id={4} />
    </div>
  );
};
