package com.chernaev.yeahbuddy.model.service;

import com.chernaev.yeahbuddy.model.entity.*;
import com.chernaev.yeahbuddy.model.entity.DTO.MealDTO;
import com.chernaev.yeahbuddy.model.entity.DTO.ProductDTO;
import com.chernaev.yeahbuddy.model.repository.ProductRepository;
import com.chernaev.yeahbuddy.model.repository.ShoppingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoppingListService {
    private final ProductRepository productRepository;
    private final ShoppingListRepository shoppingListRepository;

    public ShoppingListService(
            ProductRepository productRepository,
            ShoppingListRepository shoppingListRepository) {
        this.productRepository = productRepository;
        this.shoppingListRepository = shoppingListRepository;
    }

    public List<Product> getProductsByEmail(String email){
        ShoppingList currentShoppingList = shoppingListRepository.findByUserEmail(email).orElseThrow();
        List<Product> products = productRepository.findAllByShoppingListId(currentShoppingList.getId());
        return products;
    }

    public void deleteProduct(long id) {
        Product product = productRepository.findById(id).orElseThrow();
        productRepository.delete(product);
    }

    public Product addProduct(ProductDTO product) {
        ShoppingList shoppingList = shoppingListRepository.findByUserEmail(product.getEmail()).orElseThrow();
        return productRepository.save(new Product(product.getName(), product.getQuantity(), shoppingList));
    }

}
