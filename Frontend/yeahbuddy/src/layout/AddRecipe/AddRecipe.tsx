import axios from "axios";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import IngredientsToAdd from "../../model/IngredientsToAdd";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import { Navbar } from "../Navbar And Footer/Navbar";
import { Footer } from "../Navbar And Footer/Footer";
import "./style/AddRecipe.css";

export const AddRecipe = () => {
  const [ingredientsToAdd, setIngredientsToAdd] = useState<IngredientsToAdd[]>(
    []
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredientName, setNewIngredientName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [search, setSearch] = useState("");
  const [change, setChange] = useState(true);

  const history = useHistory();

  function changeName(e: any) {
    setName(e.target.value);
  }

  function changeDescription(e: any) {
    setDescription(e.target.value);
  }

  function addIngredient(e: any) {
    let currentIngredients = ingredients;
    const newIngredient = e.target.innerText;
    if (!currentIngredients.includes(newIngredient)) {
      currentIngredients.push(newIngredient);
      setIngredients(currentIngredients);
      setChange(!change);
    }
  }

  function removeIngredient(e: any) {
    let currentIngredients = ingredients;
    currentIngredients.splice(currentIngredients.indexOf(e.target.name), 1);
    setIngredients(currentIngredients);
    setChange(!change);
  }

  function changeSearch(e: any) {
    setSearch(e.target.value);
  }

  function changeNewIngredientName(e: any) {
    setNewIngredientName(e.target.value);
  }

  async function addNewIngredient(e: any) {
    const newIngredient = {
      name: newIngredientName,
    };
    await axios.post(
      "http://localhost:8080/api/v1/recipe/new-ingredient",
      newIngredient
    );
    setChange(!change);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    const newRecipe = {
      name: name,
      description: description,
      ingredients: ingredients,
    };
    await axios.post("http://localhost:8080/api/v1/recipe", newRecipe);

    history.push("/recipes");
  }

  useEffect(() => {
    const fetchIngredients = async () => {
      await axios
        .get(`http://localhost:8080/api/v1/recipe/ingredients/search=${search}`)
        .then(function (response) {
          const responseData = response.data;
          const loadedIngredients: IngredientsToAdd[] = [];
          for (const key in responseData) {
            loadedIngredients.push({
              id: responseData[key].id,
              name: responseData[key].name,
            });
          }
          setIngredientsToAdd(loadedIngredients);
          setIsLoading(false);
        });
    };
    fetchIngredients().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [search, change]);

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
    <div id="add-recipe-container">
      <Navbar />
      <h1>Add Recipe</h1>
      <br />
      <br />
      <div id="recipe-search-container">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Search for ingredient"
          onChange={changeSearch}
          id="search-ingr-input"
        />

        <Popup trigger={<button className="button"> + </button>} modal nested>
          <form className="add-food-form" onSubmit={addNewIngredient}>
            <div id="add-input-div">
              <label htmlFor="name-input">Name</label>
              <input
                type="text"
                id="name-input"
                onChange={changeNewIngredientName}
              />
            </div>

            <div className="btn-container">
              <button type="submit">Add</button>
            </div>
          </form>
        </Popup>
      </div>
      <div className="custom-scrollbar">
        {ingredientsToAdd.map((ingredient) => (
          <div key={ingredient.id} className="ingredient-container">
            <p onClick={addIngredient}>{ingredient.name}</p>
          </div>
        ))}
      </div>
      <h2>Selected Ingredients</h2>
      {ingredients.map((ingredient, i) => (
        <div id="selected-ingr-div" key={ingredient}>
          <p>{ingredient}</p>
          <button onClick={removeIngredient} name={ingredient}>
            -
          </button>
        </div>
      ))}
      <input
        className="recipe-more-info"
        type="text"
        onChange={changeName}
        placeholder="Title..."
      />
      <br />
      <textarea
        className="recipe-more-info-textarea"
        rows={6}
        cols={37}
        onChange={changeDescription}
        placeholder="Description..."
      />
      <br />
      <br />
      <button className="add-recipe-button" onClick={handleSubmit}>Add</button>
      <Footer />
    </div>
  );
};
