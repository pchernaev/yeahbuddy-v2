package com.chernaev.yeahbuddy.model.repository;

import com.chernaev.yeahbuddy.model.entity.ShoppingList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShoppingListRepository extends JpaRepository<ShoppingList, Long> {
    Optional<ShoppingList> findByUserEmail(String email);
}
