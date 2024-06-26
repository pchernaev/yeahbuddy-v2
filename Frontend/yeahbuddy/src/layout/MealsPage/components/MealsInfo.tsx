import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MealContext } from "../../../context/MealContext";
import { Audio } from "react-loader-spinner";
import axios from "axios";
import MealsToDisplay from "../../../model/MealsToDisplay";
import { UserContext } from "../../../context/UserContext";

export const MealsInfo = () => {
  const mealInfo = useContext(MealContext);
  const user = useContext(UserContext);

  const [totalDailyCalories, setTotalDailyCalories] = useState(0);
  const [totalDailyCarbs, setTotalDailyCarbs] = useState(0);
  const [totalDailyFats, setTotalDailyFats] = useState(0);
  const [totalDailyProtein, setTotalDailyProtein] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const date = mealInfo.date.toISOString().split("T")[0];

      const url: string = `http://localhost:8080/api/v1/meal/email=${user.email}/date=${date}`;

      await axios.get(url).then(function (response) {
        const responseData = response.data;
        setTotalDailyCalories(responseData.totalDailyCalories);
        setTotalDailyCarbs(responseData.totalCarbs);
        setTotalDailyFats(responseData.totalFats);
        setTotalDailyProtein(responseData.totalProtein);
        setDailyGoal(responseData.dailyGoal);

        setIsLoading(false);
      });
    };
    fetchMeals().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [mealInfo.change, mealInfo.date]);

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

  function incrementDate() {
    const date = mealInfo.date;
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 1);
    mealInfo.setDate(newDate); 
  }

   function decrementDate() {
     const date = mealInfo.date;
     const newDate = new Date(date);
     newDate.setDate(date.getDate() - 1);
     mealInfo.setDate(newDate);
   }

  return (
    <div id="meals-info">
      <section>
        <div id="date-section">
          <button onClick={decrementDate}>&lt;</button>
          <DatePicker
            selected={mealInfo.date}
            onChange={(date: any) => {
              mealInfo.setDate(date);
            }}
            withPortal
          />
          <button onClick={incrementDate}> &gt;</button>
        </div>
        <div>
          <h3>
            {totalDailyCalories} / {dailyGoal} cal
          </h3>
          <div id="macros-container">
            <h5>Protein: {totalDailyProtein} g.</h5>
            <h5>Carbs: {totalDailyCarbs} g.</h5>
            <h5>Fats: {totalDailyFats} g.</h5>
          </div>
        </div>
      </section>
    </div>
  );
};
