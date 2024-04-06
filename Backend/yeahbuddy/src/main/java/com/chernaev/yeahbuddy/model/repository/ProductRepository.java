package com.chernaev.yeahbuddy.model.repository;

import com.chernaev.yeahbuddy.model.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByShoppingListId(long id);
}
