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

  // const [selectedDate, setSelectedDate] = useState(mealInfo.date);
  const [totalDailyCalories, setTotalDailyCalories] = useState(0);
  const [totalDailyCarbs, setTotalDailyCarbs] = useState(0);
  const [totalDailyFats, setTotalDailyFats] = useState(0);
  const [totalDailyProtein, setTotalDailyProtein] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const date = mealInfo.date.toISOString().split("T")[0];
      
      const url: string = `http://localhost:8080/api/v1/meal/email=${user.email}/date=${date}`;
      console.log(url)
      axios.get(url).then(function (response) {
        const responseData = response.data;

        setTotalDailyCalories(responseData.totalDailyCalories);
        setTotalDailyCarbs(responseData.totalCarbs);
        setTotalDailyFats(responseData.totalFats);
        setTotalDailyProtein(responseData.totalProtein);

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

  return (
    <div id="meals-info">
      <section>
        <div>
          <DatePicker
            selected={mealInfo.date}
            onChange={(date: any) => {
              // setSelectedDate(date);
              mealInfo.setDate(date);
            }}
            withPortal
          />
        </div>
        <div>
          <h3>{totalDailyCalories} / 3000 cal</h3>
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
