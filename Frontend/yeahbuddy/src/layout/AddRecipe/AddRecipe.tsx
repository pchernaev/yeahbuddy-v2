import axios from "axios";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import IngredientsToAdd from "../../model/IngredientsToAdd";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";


export const AddRecipe = () => {
    const [ingredientsToAdd, setIngredientsToAdd] = useState<IngredientsToAdd[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [newIngredientName, setNewIngredientName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [search, setSearch] = useState("");
    const [change, setChange] = useState(true);

    const history = useHistory();


    function changeName(e: any){
        setName(e.target.value);
    }

    function changeDescription(e: any){
        setDescription(e.target.value);
    }

    function addIngredient(e: any){
        let currentIngredients = ingredients;
        const newIngredient = e.target.innerText;
        if(!currentIngredients.includes(newIngredient)){
            currentIngredients.push(newIngredient);
            setIngredients(currentIngredients);
            setChange(!change);
        }
    }

    function removeIngredient(e: any) {
      let currentIngredients = ingredients;
      currentIngredients.splice(currentIngredients.indexOf(e.target.name),1);
      setIngredients(currentIngredients);
      setChange(!change);
    }

    function changeSearch(e: any){
        setSearch(e.target.value)
    }

    function changeNewIngredientName(e: any) {
        setNewIngredientName(e.target.value);
    }

    async function addNewIngredient(e: any) {
        const newIngredient = {
            name: newIngredientName
        };
        await axios.post("http://localhost:8080/api/v1/recipe/new-ingredient", newIngredient);
        setChange(!change);
    }

    async function handleSubmit(e: any){
        e.preventDefault();

        const newRecipe = {
          name: name,
          description: description,
          ingredients: ingredients 
        };
        await axios.post("http://localhost:8080/api/v1/recipe", newRecipe);

        history.push("/recipes");
    }

    useEffect(() => {
      const fetchIngredients = async () => {
        await axios.get(`http://localhost:8080/api/v1/recipe/ingredients/search=${search}`)
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
      <div>
        <p>Name</p>
        <input type="text" onChange={changeName} />
        <br />
        <br />
        <p>Selected Ingredients</p>
        {ingredients.map((ingredient, i) => (
          <div key={ingredient}>
            <p>{ingredient}</p>
            <button onClick={removeIngredient} name={ingredient}>
              X
            </button>
          </div>
        ))}
        <input
          type="text"
          placeholder="Search for ingredient"
          onChange={changeSearch}
        />
        <Popup trigger={<button className="button"> + </button>} modal nested>
          <form className="add-food-form" onSubmit={addNewIngredient}>
            <input
              type="text"
              id="name-input"
              onChange={changeNewIngredientName}
            />
            <label htmlFor="name-input">Name</label>
            <div className="btn-container">
              <button type="submit">
                Add
              </button>
            </div>
          </form>
        </Popup>
        {ingredientsToAdd.map((ingredient) => (
          <div key={ingredient.id}>
            <p onClick={addIngredient}>{ingredient.name}</p>
          </div>
        ))}
        <p>Description</p>
        <input type="text" onChange={changeDescription} />
        <br />
        <br />
        <button onClick={handleSubmit}>Add</button>
      </div>
    );
}