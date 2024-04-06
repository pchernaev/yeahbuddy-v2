package com.chernaev.yeahbuddy.model.repository;

import com.chernaev.yeahbuddy.model.entity.Ingredient;
import com.chernaev.yeahbuddy.model.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
    List<Ingredient> findAllByNameStartingWith(String search);
    Ingredient findByName(String name);

}
