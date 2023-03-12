package com.chernaev.yeahbuddy.model.entity;

import com.chernaev.yeahbuddy.model.entity.enums.ActivityEnum;
import com.chernaev.yeahbuddy.model.entity.enums.GenderEnum;
import com.chernaev.yeahbuddy.model.entity.enums.GoalEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "user_info")
public class UserInfo extends BaseEntity{

    @Column
    private int age;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GenderEnum gender;

    @Column
    private int height;

    @Column
    private int weight;

    @Column
    @Enumerated(EnumType.STRING)
    private ActivityEnum activity;

    @Column
    @Enumerated(EnumType.STRING)
    private GoalEnum goal;

    @OneToOne
    private User user;
}
