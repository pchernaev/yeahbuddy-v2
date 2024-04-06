package com.chernaev.yeahbuddy.controller;

import com.chernaev.yeahbuddy.model.entity.*;
import com.chernaev.yeahbuddy.model.entity.DTO.*;
import com.chernaev.yeahbuddy.model.service.RecipeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/recipe")
public class RecipeController {
    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping
    @CrossOrigin
    public ResponseEntity<List<RecipeDTO>> getRecipes(){
        return ResponseEntity.ok(recipeService.getRecipes());
    }

    @CrossOrigin
    @PostMapping("/info")
    public ResponseEntity<Recipe> addNewMeal (@RequestBody RecipeInfoDTO recipeInfo) {
        return ResponseEntity.ok(recipeService.addToList(recipeInfo));
    }

    @CrossOrigin
    @GetMapping("ingredients/search={search}")
    public ResponseEntity<List<Ingredient>> getAllIngredients (@PathVariable String search) {
        return ResponseEntity.ok(recipeService.getAllIngredients(search));
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<Recipe> addNewRecipe (@RequestBody NewRecipeDTO recipe) {
        return ResponseEntity.ok(recipeService.addNewRecipe(recipe));
    }

    @CrossOrigin
    @PostMapping("/new-ingredient")
    public ResponseEntity<Ingredient> addNewIngredient (@RequestBody NewIngredientDTO ingredient) {
        return ResponseEntity.ok(recipeService.addNewIngredient(ingredient));
    }
}
