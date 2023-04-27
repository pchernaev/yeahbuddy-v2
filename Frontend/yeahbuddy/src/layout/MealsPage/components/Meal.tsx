import axios from "axios";
import MealsToDisplay from "../../../model/MealsToDisplay";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useContext } from "react";
import { MealContext } from "../../../context/MealContext";

export const Meal: React.FC<{ meal: MealsToDisplay }> = (props) => {
  const mealsContext = useContext(MealContext);

  async function handleDelete(e: any) {
    e.preventDefault();

    await axios.delete(`http://localhost:8080/api/v1/meal/${props.meal.id}`);
    mealsContext.setChange(!mealsContext.change);
  }

  return (
    <div className="meal">
      <Popup
        trigger={
          <p id="meal-name">
            {props.meal.name} {props.meal.size}g.
          </p>
        }
        modal
        nested
      >
        <form onSubmit={handleDelete}>
          <div id="meal-summary-container">
            <h2>{props.meal.name}</h2>
            <p>Calories: {props.meal.calories}</p>
            <p>Protein: {props.meal.protein}</p>
            <p>Carbs: {props.meal.carbs}</p>
            <p>Fats: {props.meal.fats}</p>
            <div className="button-container">
              <button type="submit">Delete</button>
            </div>
          </div>
        </form>
      </Popup>
      <p>{props.meal.calories} cal.</p>
    </div>
  );
};
