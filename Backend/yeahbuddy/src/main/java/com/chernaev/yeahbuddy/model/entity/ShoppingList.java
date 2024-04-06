package com.chernaev.yeahbuddy.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
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
@Table(name = "shopping_list")
public class ShoppingList extends BaseEntity{
    @OneToOne(mappedBy = "shoppingList")
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "shoppingList",targetEntity = Product.class)
    private List<Product> products = new ArrayList<>();
}
