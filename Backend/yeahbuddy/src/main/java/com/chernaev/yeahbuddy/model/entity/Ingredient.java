package com.chernaev.yeahbuddy.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ingredient")
public class Ingredient extends BaseEntity{
    @Column(nullable = false)
    private String name;

    @JsonIgnore
    @ManyToMany
    private List<Recipe> recipes = new ArrayList<>();
}
