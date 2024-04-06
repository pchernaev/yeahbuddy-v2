import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import axios from "axios";
import RecipesToDisplay from "../../model/RecipesToDisplay";
import Popup from "reactjs-popup";

export const RecipesPage = () => {
    const [recipes, setRecipes] = useState<RecipesToDisplay[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const user = useContext(UserContext);
    const history = useHistory();

    function handleRedirect(e: any){
        e.preventDefault();

        history.push("/add-recipe");
    }

    async function handleAddToList(e: any) {
        e.preventDefault();
        const recipeId = e.target.id;
        const email = user.email;

       const recipeInfo = {
         recipeId: recipeId,
         email: email,
       };

       await axios.post(
         "http://localhost:8080/api/v1/recipe/info",
         recipeInfo
       );

        history.push("/list");
    }

    useEffect(() => {
      const fetchRecipes = async () => {
        if (recipes == null) {
          return (
            <Audio height="80" width="80" color="blue" ariaLabel="loading" />
          );
        }

        const url: string = `http://localhost:8080/api/v1/recipe`;

        await axios.get(url).then(function (response) {
          const responseData = response.data;
          const loadedRecipes: RecipesToDisplay[] = [];
          for (const key in responseData) {
            loadedRecipes.push({
              id: responseData[key].id,
              name: responseData[key].name,
              description: responseData[key].description,
              ingredients: responseData[key].ingredients
            });
          }

          setRecipes(loadedRecipes);
          setIsLoading(false);
        });
      };
      fetchRecipes().catch((error: any) => {
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
      <div>
        <button onClick={handleRedirect}>Add Recipe</button>
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <h2>{recipe.name}</h2>
            <Popup
              trigger={<button className="button"> See More </button>}
              modal
              nested
            >
              <form className="add-food-form">
                <div>
                  <h2>{recipe.name}</h2>
                  <p>{recipe.ingredients}</p>
                  <p>{recipe.description}</p>
                </div>
                <button id={recipe.id.toString()} onClick={handleAddToList}>Add products to list</button>
              </form>
            </Popup>
          </div>
        ))}
      </div>
    );
}