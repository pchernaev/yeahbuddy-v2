package com.chernaev.yeahbuddy.controller;

import com.chernaev.yeahbuddy.model.entity.DTO.*;
import com.chernaev.yeahbuddy.model.entity.Food;
import com.chernaev.yeahbuddy.model.entity.Meal;
import com.chernaev.yeahbuddy.model.service.MealService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/meal")
public class MealController {
    private final MealService mealService;

    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    @CrossOrigin
    @GetMapping("/group={id}/email={email}/date={date}")
    public ResponseEntity<MealsByGroupDTO> getAllMealByGroupEmailAndUser (
            @PathVariable Long id,
            @PathVariable String email,
            @PathVariable LocalDate date) {
        return ResponseEntity.ok(mealService.getMealsByGroupIdUserEmailAndDate(id, email, date));
    }
    @CrossOrigin
    @GetMapping("/email={email}/date={date}")
    public ResponseEntity<DailyMealSummaryDTO> getSummary (
            @PathVariable String email,
            @PathVariable LocalDate date) {
        return ResponseEntity.ok(mealService.getDailySummary(email, date));
    }
    @CrossOrigin
    @PostMapping
    public ResponseEntity<Meal> addMeal (@RequestBody MealDTO meal) {
        return ResponseEntity.ok(mealService.addMeal(meal));
    }

    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<Food>> getAllMeals () {
        return ResponseEntity.ok(mealService.getAllMeals());
    }

    @CrossOrigin
    @PostMapping("/new-meal")
    public ResponseEntity<Meal> addNewMeal (@RequestBody NewMealDTO meal) {
        return ResponseEntity.ok(mealService.addNewMeal(meal));
    }
}
