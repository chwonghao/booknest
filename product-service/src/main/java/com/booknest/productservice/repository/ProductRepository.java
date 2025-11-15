package com.booknest.productservice.repository;

import com.booknest.productservice.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByAuthorsContainingIgnoreCase(String authors);
    List<Product> findByPublisherContainingIgnoreCase(String publisher);
    Product findByExternalId(String externalId);
    Product findByIsbn(String isbn);
}
