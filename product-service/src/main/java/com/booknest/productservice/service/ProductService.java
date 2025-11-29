package com.booknest.productservice.service;

import com.booknest.commonlib.dto.ProductDto;
import com.booknest.productservice.mapper.ProductMapper;
import com.booknest.productservice.model.Product;
import com.booknest.productservice.model.Category;
import com.booknest.productservice.repository.ProductRepository;
import com.booknest.productservice.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository,
                          CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(ProductMapper::toDto)
                .toList();
    }

    public Optional<ProductDto> getProductById(Long id) {
        return productRepository.findById(id).map(ProductMapper::toDto);
    }

    public ProductDto createProduct(ProductDto dto) {
        Product p = new Product();
        Category category = null;
        if (dto.getCategoryId() != null) {
            category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new IllegalArgumentException("Category not found"));
        }
        ProductMapper.updateEntity(p, dto, category);
        p.setCreatedAt(LocalDateTime.now());
        p.setUpdatedAt(LocalDateTime.now());
        return ProductMapper.toDto(productRepository.save(p));
    }

    public Optional<ProductDto> updateProduct(Long id, ProductDto dto) {
        return productRepository.findById(id).map(existing -> {
            Category category = null;
            if (dto.getCategoryId() != null) {
                category = categoryRepository.findById(dto.getCategoryId())
                        .orElseThrow(() -> new IllegalArgumentException("Category not found"));
            }
            ProductMapper.updateEntity(existing, dto, category);
            existing.setUpdatedAt(LocalDateTime.now());
            return ProductMapper.toDto(productRepository.save(existing));
        });
    }

    public boolean deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<ProductDto> searchByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name).stream()
                .map(ProductMapper::toDto)
                .toList();
    }

    public List<ProductDto> searchByAuthors(String authors) {
        return productRepository.findByAuthorsContainingIgnoreCase(authors).stream()
                .map(ProductMapper::toDto)
                .toList();
    }

    public List<ProductDto> searchByPublisher(String publisher) {
        return productRepository.findByPublisherContainingIgnoreCase(publisher).stream()
                .map(ProductMapper::toDto)
                .toList();
    }

    public List<ProductDto> searchByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId).stream()
                .map(ProductMapper::toDto)
                .toList();
    }
}
