package com.chernaev.yeahbuddy.model.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "users")
public class User extends BaseEntity {
    @Column(nullable = false)
    private String username;

    @Size(max = 50)
    @Email
    @Column(nullable = false)
    private String email;

    @Size(max = 120)
    @Column(nullable = false)
    private String password;


    @OneToMany(targetEntity = Meal.class, mappedBy = "user")
    private List<Meal> meals = new ArrayList<>();

    @OneToOne(mappedBy = "user")
    private UserInfo userInfo;
}
