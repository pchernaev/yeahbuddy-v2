import { MealGroup } from "./components/MealGroup";
import { MealsInfo } from "./components/MealsInfo";
import "./style/MealsPage.css";

export const MealsPage = () => {
  return (
    <div>
      <MealsInfo />
      <MealGroup />
      <MealGroup />
      <MealGroup />
      <MealGroup />
    </div>
  );
};
