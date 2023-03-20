import MealsToDisplay from "../../../model/MealsToDisplay";

export const Meal: React.FC<{meal: MealsToDisplay}> = (props) => {
  return (
    <div className="meal">
      <p>{props.meal.name} {props.meal.size}g.</p>
      <p>{props.meal.calories} cal.</p>
    </div>
  );
};
