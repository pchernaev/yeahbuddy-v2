package com.chernaev.yeahbuddy.model.service;

import com.chernaev.yeahbuddy.model.entity.DTO.*;
import com.chernaev.yeahbuddy.model.entity.Food;
import com.chernaev.yeahbuddy.model.entity.Group;
import com.chernaev.yeahbuddy.model.entity.Meal;
import com.chernaev.yeahbuddy.model.entity.User;
import com.chernaev.yeahbuddy.model.entity.enums.ActivityEnum;
import com.chernaev.yeahbuddy.model.entity.enums.GenderEnum;
import com.chernaev.yeahbuddy.model.entity.enums.GoalEnum;
import com.chernaev.yeahbuddy.model.repository.FoodRepository;
import com.chernaev.yeahbuddy.model.repository.GroupRepository;
import com.chernaev.yeahbuddy.model.repository.MealRepository;
import com.chernaev.yeahbuddy.model.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class MealService {
    private final MealRepository mealRepository;
    private final FoodRepository foodRepository;
    private final UserRepository userRepository;
    private final GroupRepository groupRepository;

    public MealService(MealRepository mealRepository, FoodRepository foodRepository, UserRepository userRepository, GroupRepository groupRepository) {
        this.mealRepository = mealRepository;
        this.foodRepository = foodRepository;
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
    }

    public MealsByGroupDTO getMealsByGroupIdUserEmailAndDate(Long id, String email, LocalDate date) {
        List<Meal> meals = mealRepository.findAllByGroup_IdAndUser_EmailAndDate(id, email, date);
        List<MealToDisplayDTO> mealsToDisplay = new ArrayList<>();

        int totalCalories = 0;
        for (Meal meal : meals) {
            long mealId = meal.getId();
            String name = meal.getFood().getName();
            double size = meal.getSize();
            int calories = (int)Math.round(meal.getFood().getCalories() * (meal.getSize())/100);
            int carbs = (int)Math.round(meal.getFood().getCarbs() * (meal.getSize())/100) ;
            int fats = (int)Math.round(meal.getFood().getFats() * (meal.getSize())/100);
            int protein = (int)Math.round(meal.getFood().getProtein() * (meal.getSize())/100);

            MealToDisplayDTO mealToDisplay = new MealToDisplayDTO(
                    mealId,
                    name,
                    size,
                    calories,
                    carbs,
                    fats,
                    protein
            );
            mealsToDisplay.add(mealToDisplay);
            totalCalories += calories;
        }

        return new MealsByGroupDTO(mealsToDisplay, totalCalories);
    }

    public DailyMealSummaryDTO getDailySummary(String email, LocalDate date) {
        List<MealForSummaryDTO> meals =  processMealsForSummary(email, date);

        int totalDailyCalories = meals.stream().mapToInt(MealForSummaryDTO::getCalories).sum();
        int totalDailyCarbs = meals.stream().mapToInt(MealForSummaryDTO::getCarbs).sum();
        int totalDailyFats = meals.stream().mapToInt(MealForSummaryDTO::getFats).sum();
        int totalDailyProtein = meals.stream().mapToInt(MealForSummaryDTO::getProtein).sum();
        int dailyGoal = calculateGoalCalories(userRepository.findByEmail(email).orElseThrow());

        return new DailyMealSummaryDTO(totalDailyCalories, totalDailyCarbs, totalDailyFats, totalDailyProtein, dailyGoal);
    }

    private int calculateGoalCalories(User user){
        double calorieGoal = 0;
        double BMR = 0;
        int age = user.getAge();
        GenderEnum gender = user.getGender();
        int height = user.getHeight();
        int weight = user.getWeight();
        ActivityEnum activity = user.getActivity();
        GoalEnum goal = user.getGoal();

        if(gender == GenderEnum.MALE){
            BMR = 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age);
        } else {
            BMR = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
        }

        if(activity == ActivityEnum.SEDENTARY){
            calorieGoal = BMR * 1.2;
        } else if (activity == ActivityEnum.LIGHTLY) {
            calorieGoal = BMR * 1.375;
        } else if (activity == ActivityEnum.MODERATELY) {
            calorieGoal = BMR * 1.55;
        } else if (activity == ActivityEnum.VERY) {
            calorieGoal = BMR * 1.725;
        } else if (activity == ActivityEnum.EXTRA) {
            calorieGoal = BMR * 1.9;
        }

        if(goal == GoalEnum.EXTREAM_CUT){
            calorieGoal -= 500;
        } else if (goal == GoalEnum.CUT) {
            calorieGoal -= 300;
        } else if (goal == GoalEnum.BULK) {
            calorieGoal += 300;
        } else if(goal ==GoalEnum.EXTREAM_BULK){
            calorieGoal += 500;
        }

        return (int)Math.round(calorieGoal);
    }


    private List<MealForSummaryDTO> processMealsForSummary(String email, LocalDate date) {
        List<Meal> meals = mealRepository.findAllByUser_EmailAndDate(email, date);
        List<MealForSummaryDTO> processedMeals = new ArrayList<>();

        for (Meal meal : meals) {
            int calories = (int)Math.round(meal.getFood().getCalories() * (meal.getSize())/100);
            int carbs = (int)Math.round(meal.getFood().getCarbs() * (meal.getSize())/100);
            int fats = (int)Math.round(meal.getFood().getFats() * (meal.getSize())/100);
            int protein = (int)Math.round(meal.getFood().getProtein() * (meal.getSize())/100);
            processedMeals.add(new MealForSummaryDTO(calories, carbs, fats, protein));
        }

        return processedMeals;
    }

    public Meal addMeal(MealDTO meal) {
        User user = userRepository.findByEmail(meal.getUser_email()).orElseThrow();
        Food food = foodRepository.findById(meal.getFood_id()).orElseThrow();
        Group group = groupRepository.findById(meal.getGroup_id()).orElseThrow();

        return mealRepository.save(new Meal(meal.getSize(),meal.getDate(),food,group,user));
    }

    public List<Food> getAllMeals(String search) {
        if(!search.isEmpty()) {
            return foodRepository.findAllByNameStartingWith(search);
        }
        return foodRepository.findAll();
    }

    public Meal addNewMeal(NewMealDTO meal) {
        Food food = new Food();
        food.setName(meal.getName());
        food.setCalories(meal.getCalories());
        food.setProtein(meal.getProtein());
        food.setCarbs(meal.getCarbs());
        food.setFats(meal.getFats());

        foodRepository.save(food);

        User user = userRepository.findByEmail(meal.getUser_email()).orElseThrow();
        Group group = groupRepository.findById(meal.getGroup_id()).orElseThrow();

        return mealRepository.save(new Meal(
                meal.getSize(),
                meal.getDate(),
                food,
                group,
                user
        ));
    }
}
