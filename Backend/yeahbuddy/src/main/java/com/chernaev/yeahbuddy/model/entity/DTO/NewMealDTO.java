package com.chernaev.yeahbuddy.model.entity.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NewMealDTO {
    private String name;
    private int calories;
    private int protein;
    private int carbs;
    private int fats;
    private double size;
    private LocalDate date;
    private long group_id;
    private String user_email;
}
