import "./style/AddFood.css";
import { Food } from "./components/Food";

export const AddMeal = () => {
  return (
    <div>
      <div id="search-container">
        <div>
          <input type="text" placeholder="Search for food" />
        </div>
        <div>
          <button>+</button>
        </div>
      </div>
      <Food />
      <Food />
      <Food />
    </div>
  );
};
