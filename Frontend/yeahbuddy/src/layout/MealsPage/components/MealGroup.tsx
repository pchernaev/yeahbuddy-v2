import { Meal } from "./Meal";
import { Audio } from "react-loader-spinner";
import MealsToDisplay from "../../../model/MealsToDisplay";
import { useState, useEffect, useContext } from "react";
import { MealContext } from "../../../context/MealContext";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const MealGroup: React.FC<{ group: string; id: number }> = (props) => {
  const [meals, setMeals] = useState<MealsToDisplay[]>([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const mealsInfo = useContext(MealContext);
  const user = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const fetchMeals = async () => {
      if (mealsInfo.date == null) {
        return (
          <Audio height="80" width="80" color="blue" ariaLabel="loading" />
        );
      }


      const date: string = mealsInfo.date.toISOString().split("T")[0];
      const url: string = `http://localhost:8080/api/v1/meal/group=${props.id}/email=${user.email}/date=${date}`;

      axios.get(url).then(function (response) {
        const responseData = response.data;
        const loadedMeals: MealsToDisplay[] = [];

        for (const key in responseData.meals) {
          loadedMeals.push({
            id: responseData.meals[key].id,
            name: responseData.meals[key].name,
            calories: responseData.meals[key].calories,
            group: responseData.meals[key].group,
            size: responseData.meals[key].size,
          });
        }

        setMeals(loadedMeals);
        setTotalCalories(responseData.totalGroupCalories);
        setIsLoading(false);
      });
    };
    fetchMeals().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return <Audio height="80" width="80" color="blue" ariaLabel="loading" />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  function handleRedirect() {
    mealsInfo.setGroup(props.id);
    history.push("/add-meal");
  }

  return (
    <section className="group-container">
      <div className="group-info-container">
        <h3>{props.group}</h3>
        <h3>{totalCalories} cal.</h3>
      </div>
      <div className="meal-container">
        {meals.map((meal) => (
          <Meal meal={meal} key={meal.id} />
        ))}
        <div>
          <button onClick={handleRedirect}>ADD FOOD</button>
        </div>
      </div>
    </section>
  );
};
