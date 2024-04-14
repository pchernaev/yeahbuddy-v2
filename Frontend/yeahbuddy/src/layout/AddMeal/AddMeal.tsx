import "./style/AddFood.css";
import { Food } from "./components/Food";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import MealsToDisplay from "../../model/MealsToDisplay";
import MealsToAdd from "../../model/MealsToAdd";
import Popup from "reactjs-popup";
import { Audio } from "react-loader-spinner";
import { MealContext } from "../../context/MealContext";
import { UserContext } from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import { Footer } from "../Navbar And Footer/Footer";
import { Navbar } from "../Navbar And Footer/Navbar";

export const AddMeal = () => {
  const [meals, setMeals] = useState<MealsToAdd[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [name, setName] = useState("");
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);
  const [size, setSize] = useState(0);
  const [search, setSearch] = useState("");

  const mealInfo = useContext(MealContext);
  const user = useContext(UserContext);

  const history = useHistory();

  function changeName(e: any) {
    setName(e.target.value);
  }

  function changeCalories(e: any) {
    setCalories(e.target.value);
  }

  function changeProtein(e: any) {
    setProtein(e.target.value);
  }

  function changeCarbs(e: any) {
    setCarbs(e.target.value);
  }

  function changeFats(e: any) {
    setFats(e.target.value);
  }

  function changeSize(e: any) {
    setSize(e.target.value);
  }

  function changeSearch(e: any) {
    setSearch(e.target.value);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    const newMeal = {
      name: name,
      calories: calories,
      protein: protein,
      carbs: carbs,
      fats: fats,
      size: size,
      date: mealInfo.date,
      group_id: mealInfo.group,
      user_email: user.email,
    };
    await axios.post("http://localhost:8080/api/v1/meal/new-meal", newMeal);

    history.push("/meals");
  }

  useEffect(() => {
    const fetchMeals = async () => {
      await axios.get(`http://localhost:8080/api/v1/meal/search=${search}`)
      .then(function (response) {
        const responseData = response.data;
        const loadedMeals: MealsToAdd[] = [];
        for (const key in responseData) {
          loadedMeals.push({
            id: responseData[key].id,
            name: responseData[key].name,
            calories: responseData[key].calories,
            carbs: responseData[key].carbs,
            fats: responseData[key].fats,
            protein: responseData[key].protein,
          });
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      });
    };
    fetchMeals().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [search]);

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
    <div>
      <Navbar />
      <div id="add-meal-container">
        <h1>Choose Food</h1>
        <div id="search-container">
          <div>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Search for food"
              onChange={changeSearch}
            />
          </div>
          <div>
            <Popup
              trigger={<button className="button"> + </button>}
              modal
              nested
            >
              <form className="add-food-form" onSubmit={handleSubmit}>
                <div className="name-container">
                  <h2 id="add-food-text">Add Food</h2>
                </div>
                <div id="nutrient-container">
                  <div id="one">
                    <label htmlFor="name-input">Name</label>
                    <label htmlFor="calorie-input">Calories</label>
                    <label htmlFor="protein-input">Protein</label>
                    <label htmlFor="carb-input">Carbs</label>
                    <label htmlFor="fat-input">Fats</label>
                    <label htmlFor="size-input">Size</label>
                  </div>
                  <div id="two">
                    <input type="text" id="name-input" onChange={changeName} />
                    <input
                      type="text"
                      id="calorie-input"
                      onChange={changeCalories}
                    />
                    <input
                      type="text"
                      id="protein-input"
                      onChange={changeProtein}
                    />
                    <input type="text" id="carb-input" onChange={changeCarbs} />
                    <input type="text" id="fat-input" onChange={changeFats} />
                    <input type="text" id="size-input" onChange={changeSize} />
                  </div>
                  <div id="three">
                    <br />
                    <label htmlFor="calorie-input">/100g</label>
                    <label htmlFor="calorie-input">/100g</label>
                    <label htmlFor="calorie-input">/100g</label>
                    <label htmlFor="calorie-input">/100g</label>
                  </div>
                </div>

                {/* <div className="input-container"></div>
                <div className="input-container"></div>
                <div className="input-container"></div>
                <div className="input-container"></div>
                <div className="input-container"></div>
                <div className="input-container"></div> */}
                <div className="btn-container">
                  <button type="submit">Add</button>
                </div>
              </form>
            </Popup>
          </div>
        </div>
        {meals.map((meal) => (
          <Food meal={meal} key={meal.id} />
        ))}
      </div>
      <Footer />
    </div>
  );
};
