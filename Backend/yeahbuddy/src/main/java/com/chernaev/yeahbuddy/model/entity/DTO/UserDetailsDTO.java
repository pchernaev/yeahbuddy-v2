package com.chernaev.yeahbuddy.model.entity.DTO;

import com.chernaev.yeahbuddy.model.entity.enums.ActivityEnum;
import com.chernaev.yeahbuddy.model.entity.enums.GenderEnum;
import com.chernaev.yeahbuddy.model.entity.enums.GoalEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailsDTO {
    private long id;
    private int age;
    private int height;
    private int weight;
    private ActivityEnum activity;
    private GoalEnum goal;
}
