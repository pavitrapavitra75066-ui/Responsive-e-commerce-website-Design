package com.example.ecommerce.controller;

import com.example.ecommerce.model.Product;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class ProductController {

    // Hard-coded example products
    @GetMapping("/api/products")
    public List<Product> list() {
        return Arrays.asList(
            new Product(1L, "Classic T-Shirt", "Comfortable cotton t-shirt", 299.0, "/images/tshirt.png"),
            new Product(2L, "Sneakers", "Stylish running shoes", 2499.0, "/images/sneakers.png"),
            new Product(3L, "Wireless Headphones", "Noise-cancelling", 4599.0, "/images/headphones.png"),
            new Product(4L, "Backpack", "Durable travel backpack", 1999.0, "/images/backpack.png")
        );
    }
}
