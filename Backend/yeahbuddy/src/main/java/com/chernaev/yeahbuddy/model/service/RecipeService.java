package com.chernaev.yeahbuddy.model.service;

import com.chernaev.yeahbuddy.model.entity.*;
import com.chernaev.yeahbuddy.model.entity.DTO.NewIngredientDTO;
import com.chernaev.yeahbuddy.model.entity.DTO.NewRecipeDTO;
import com.chernaev.yeahbuddy.model.entity.DTO.RecipeDTO;
import com.chernaev.yeahbuddy.model.entity.DTO.RecipeInfoDTO;
import com.chernaev.yeahbuddy.model.repository.IngredientRepository;
import com.chernaev.yeahbuddy.model.repository.ProductRepository;
import com.chernaev.yeahbuddy.model.repository.RecipeRepository;
import com.chernaev.yeahbuddy.model.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final IngredientRepository ingredientRepository;

    public RecipeService(RecipeRepository recipeRepository, UserRepository userRepository, ProductRepository productRepository, IngredientRepository ingredientRepository) {
        this.recipeRepository = recipeRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.ingredientRepository = ingredientRepository;
    }

    public List<RecipeDTO> getRecipes(){
        List<Recipe> recipes = recipeRepository.findAll();
        List<RecipeDTO> recipesToSend = new ArrayList<>();

        for (Recipe recipe : recipes) {
            long id = recipe.getId();
            String name = recipe.getName();
            String description = recipe.getDescription();

            StringBuilder str = new StringBuilder();
            List<Ingredient> ingredientsList = recipe.getIngredients();

            for (Ingredient ing : ingredientsList) {
                str.append(String.format("%s ", ing.getName()));
            }

            String ingredients = str.toString();

            RecipeDTO recipeDTO = new RecipeDTO(id, name, description, ingredients);
            recipesToSend.add(recipeDTO);
        }

        return recipesToSend;
    }

    public Recipe addToList(RecipeInfoDTO recipeInfo) {
        Recipe recipe = recipeRepository.findById(recipeInfo.getRecipeId()).orElseThrow();
        User user = userRepository.findByEmail(recipeInfo.getEmail()).orElseThrow();
        ShoppingList shoppingList = user.getShoppingList();
        List<Ingredient> ingredients = recipe.getIngredients();

        for (Ingredient ingredient : ingredients) {
            Product product = new Product(ingredient.getName(), shoppingList);
            productRepository.save(product);
        }

        return recipe;
    }

    public List<Ingredient> getAllIngredients(String search){
        if(!search.isEmpty()) {
            return ingredientRepository.findAllByNameStartingWith(search);
        }
        return ingredientRepository.findAll();
    }

    public Recipe addNewRecipe(NewRecipeDTO recipeDTO){
        List<String> ingredientsNames = recipeDTO.getIngredients();
        Recipe recipe = new Recipe(recipeDTO.getName(), recipeDTO.getDescription(), new ArrayList<>());
        List<Ingredient> ingredients = recipe.getIngredients();

        for (String ingr : ingredientsNames) {
            Ingredient ingredient = ingredientRepository.findByName(ingr);
            List<Recipe> recipes = ingredient.getRecipes();
            recipes.add(recipe);
            ingredients.add(ingredient);
        }
        return recipeRepository.save(recipe);
    }

    public Ingredient addNewIngredient(NewIngredientDTO ingredientDTO){
        Ingredient newIngredient = new Ingredient(ingredientDTO.getName(), new ArrayList<>());

        return ingredientRepository.save(newIngredient);
    }
}
