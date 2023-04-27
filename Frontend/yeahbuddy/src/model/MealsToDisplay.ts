class MealsToDisplay {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  group: number;
  size: number;

  constructor(
    id: number,
    name: string,
    calories: number,
    protein: number,
    carbs: number,
    fats: number,
    group: number,
    size: number
  ) {
    this.id = id;
    this.name = name;
    this.calories = calories;
    this.protein = protein;
    this.carbs = carbs;
    this.fats = fats;
    this.group = group;
    this.size = size;
  }
}

export default MealsToDisplay;
