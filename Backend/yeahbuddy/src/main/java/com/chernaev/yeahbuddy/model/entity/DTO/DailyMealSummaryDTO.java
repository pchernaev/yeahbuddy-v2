package com.chernaev.yeahbuddy.model.entity.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DailyMealSummaryDTO {
    private int totalDailyCalories;
    private int totalCarbs;
    private int totalFats;
    private int totalProtein;
}
