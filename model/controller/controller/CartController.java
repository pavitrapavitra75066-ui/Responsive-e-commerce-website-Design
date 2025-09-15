package com.example.ecommerce.controller;

import com.example.ecommerce.model.Product;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private static final String CART_KEY = "CART_ITEMS";

    // Add item to cart (expects JSON { "id": 1, "name": "...", "price": 100.0, "imageUrl": "..." })
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody Product p, HttpSession session) {
        List<Product> cart = (List<Product>) session.getAttribute(CART_KEY);
        if (cart == null) cart = new ArrayList<>();
        cart.add(p);
        session.setAttribute(CART_KEY, cart);
        return ResponseEntity.ok(Map.of("size", cart.size()));
    }

    // Get cart items
    @GetMapping
    public List<Product> getCart(HttpSession session) {
        List<Product> cart = (List<Product>) session.getAttribute(CART_KEY);
        return cart == null ? new ArrayList<>() : cart;
    }

    // Remove item by id
    @DeleteMapping("/remove/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id, HttpSession session) {
        List<Product> cart = (List<Product>) session.getAttribute(CART_KEY);
        if (cart != null) {
            cart.removeIf(p -> p.getId().equals(id));
            session.setAttribute(CART_KEY, cart);
        }
        return ResponseEntity.ok().build();
    }

    // Clear cart
    @PostMapping("/clear")
    public ResponseEntity<?> clear(HttpSession session) {
        session.removeAttribute(CART_KEY);
        return ResponseEntity.ok().build();
    }
}
