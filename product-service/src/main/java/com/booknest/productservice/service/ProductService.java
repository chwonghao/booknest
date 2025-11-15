package com.booknest.productservice.service;

import com.booknest.commonlib.dto.ProductDto;
import com.booknest.productservice.mapper.ProductMapper;
import com.booknest.productservice.model.Product;
import com.booknest.productservice.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<ProductDto> getAllProducts() {
        return repository.findAll().stream().map(ProductMapper::toDto).toList();
    }

    public Optional<ProductDto> getProductById(Long id) {
        return repository.findById(id).map(ProductMapper::toDto);
    }

    public ProductDto createProduct(ProductDto dto) {
        Product p = new Product();
        ProductMapper.updateEntity(p, dto);
        p.setCreatedAt(LocalDateTime.now());
        p.setUpdatedAt(LocalDateTime.now());
        return ProductMapper.toDto(repository.save(p));
    }

    public Optional<ProductDto> updateProduct(Long id, ProductDto dto) {
        return repository.findById(id).map(existing -> {
            ProductMapper.updateEntity(existing, dto);
            existing.setUpdatedAt(LocalDateTime.now());
            return ProductMapper.toDto(repository.save(existing));
        });
    }

    public boolean deleteProduct(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<ProductDto> searchByName(String name) {
        return repository.findByNameContainingIgnoreCase(name).stream().map(ProductMapper::toDto).toList();
    }

    public List<ProductDto> searchByAuthors(String authors) {
        return repository.findByAuthorsContainingIgnoreCase(authors).stream().map(ProductMapper::toDto).toList();
    }

    public List<ProductDto> searchByPublisher(String publisher) {
        return repository.findByPublisherContainingIgnoreCase(publisher).stream().map(ProductMapper::toDto).toList();
    }
}
