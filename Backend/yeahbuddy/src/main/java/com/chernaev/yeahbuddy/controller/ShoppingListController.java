package com.chernaev.yeahbuddy.controller;

import com.chernaev.yeahbuddy.model.entity.DTO.NewMealDTO;
import com.chernaev.yeahbuddy.model.entity.DTO.ProductDTO;
import com.chernaev.yeahbuddy.model.entity.Meal;
import com.chernaev.yeahbuddy.model.entity.Product;
import com.chernaev.yeahbuddy.model.service.ShoppingListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/list")
public class ShoppingListController {
    private final ShoppingListService shoppingListService;

    public ShoppingListController(ShoppingListService shoppingListService) {
        this.shoppingListService = shoppingListService;
    }

    @GetMapping("/email={email}")
    @CrossOrigin
    public ResponseEntity<List<Product>> getProducts(@PathVariable String email){
        return ResponseEntity.ok(shoppingListService.getProductsByEmail(email));
    }

    @CrossOrigin
    @PostMapping("/new-product")
    public ResponseEntity<Product> addNewProduct (@RequestBody ProductDTO product) {
        return ResponseEntity.ok(shoppingListService.addProduct(product));
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<Product> delete (@PathVariable long id) {
        shoppingListService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
}
