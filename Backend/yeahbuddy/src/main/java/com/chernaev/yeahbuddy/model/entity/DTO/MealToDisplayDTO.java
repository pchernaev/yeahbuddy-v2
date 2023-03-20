package com.chernaev.yeahbuddy.model.entity.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MealToDisplayDTO {
    private long id;
    private String name;
    private double size;
    private int calories;
    private int cabs;
    private int fats;
    private int protein;
}
