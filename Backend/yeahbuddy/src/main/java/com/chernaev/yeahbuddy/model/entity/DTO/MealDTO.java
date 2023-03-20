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
public class MealDTO {
    private double size;
    private LocalDate date;
    private long food_id;
    private long group_id;
    private String user_email;
}
