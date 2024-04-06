package com.chernaev.yeahbuddy.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "product")
public class Product extends BaseEntity {
    @Column(nullable = false)
    private String name;

    private double quantity;

    @JsonIgnore
    @ManyToOne
    private ShoppingList shoppingList;

    public Product(String name, ShoppingList shoppingList){
        this.name = name;
        this.shoppingList = shoppingList;
    }
}
