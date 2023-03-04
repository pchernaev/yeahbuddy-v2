import { Meal } from "./Meal";

export const MealGroup = () => {
  return (
    <section className="group-container">
      <div className="group-info-container">
        <h3>Breakfast</h3>
        <h3>555 cal.</h3>
      </div>
      <div className="meal-container">
        <Meal />
        <Meal />
        <div>
          <button>ADD FOOD</button>
        </div>
      </div>
    </section>
  );
};
