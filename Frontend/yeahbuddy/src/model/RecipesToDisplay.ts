class RecipesToDisplay {
  id: number;
  name: string;
  description: string;
  ingredients: string;

  constructor(
    id: number,
    name: string,
    description: string,
    ingredients: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.ingredients = ingredients;
  }
}

export default RecipesToDisplay;
