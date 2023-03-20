package com.chernaev.yeahbuddy.model.entity.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MealForSummaryDTO {
    private int calories;
    private int carbs;
    private int fats;
    private int protein;
}
