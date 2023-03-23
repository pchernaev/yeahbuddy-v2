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
public class UserInfoDTO {
    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private int age;
    private GenderEnum gender;
    private int height;
    private int weight;
    private ActivityEnum activity;
    private GoalEnum goal;
}
