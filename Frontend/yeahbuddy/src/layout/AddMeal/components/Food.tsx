import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { MealContext } from "../../../context/MealContext";
import { UserContext } from "../../../context/UserContext";
import MealsToAdd from "../../../model/MealsToAdd";

export const Food: React.FC<{meal: MealsToAdd}> = (props) => {
  const [calories, setCalories] = useState(props.meal.calories);
  const [protein, setProtein] = useState(props.meal.protein);
  const [carbs, setCarbs] = useState(props.meal.carbs);
  const [fats, setFats] = useState(props.meal.fats);
  const mealInfo = useContext(MealContext);
  const user = useContext(UserContext);
  const [size, setSize] = useState(100)
  const history = useHistory();

  function changeSize(e: any) {
    const size = e.target.value;
    setSize(size);
    setCalories(Math.round(props.meal.calories / 100 * size));
    setProtein(Math.round(props.meal.protein / 100 * size));
    setCarbs(Math.round(props.meal.carbs / 100 * size));
    setFats(Math.round(props.meal.fats / 100 * size));
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    
    const meal = {
      size: size,
      date: mealInfo.date,
      food_id: props.meal.id,
      group_id: mealInfo.group,
      user_email: user.email
    } 

    await axios.post("http://localhost:8080/api/v1/meal",meal);
    
    history.push("/meals");
  }


  return (
    <div className="food-container">
      <div>
        <h4>{props.meal.name}</h4>
        <h5>{props.meal.calories} cal. / 100g.</h5>
      </div>
      <div>
        <Popup trigger={<button className="button"> + </button>} modal nested>
          <form className="add-food-form">
            <div className="name-container">
              <h2>{props.meal.name}</h2>
            </div>
            <div className="food-info-container">
              <p id="cal-p">Calories: {calories}</p>
              <p>Protein: {protein}g</p>
              <p>Carbs: {carbs}g</p>
              <p>Fats: {fats}g</p>
            </div>
            <div className="input-container">
              <input type="text" id="gram-input" onChange={changeSize} defaultValue={100}/>
              <label htmlFor="gram-input">grams</label>
            </div>
            <div className="btn-container">
              <button onClick={handleSubmit}>Add</button>
            </div>
          </form>
        </Popup>
      </div>
    </div>
  );
};
