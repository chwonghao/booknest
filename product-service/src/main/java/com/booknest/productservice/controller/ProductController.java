package com.booknest.productservice.controller;

import com.booknest.commonlib.dto.ProductDto;
import com.booknest.productservice.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public List<ProductDto> getAll() {
        return service.getAllProducts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getById(@PathVariable Long id) {
        return service.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<ProductDto> search(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String authors,
            @RequestParam(required = false) String publisher) {
        if (name != null)
            return service.searchByName(name);
        if (authors != null)
            return service.searchByAuthors(authors);
        if (publisher != null)
            return service.searchByPublisher(publisher);
        return service.getAllProducts();
    }

    @PostMapping
    public ResponseEntity<ProductDto> create(@RequestBody ProductDto dto) {
        return ResponseEntity.ok(service.createProduct(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> update(@PathVariable Long id, @RequestBody ProductDto dto) {
        return service.updateProduct(id, dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ProductDto> patch(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return service.getProductById(id).map(existingDto -> {
            updates.forEach((k, v) -> applyPatch(existingDto, k, v));
            return service.updateProduct(id, existingDto)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return service.deleteProduct(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    private void applyPatch(ProductDto dto, String key, Object value) {
        switch (key) {
            case "externalId" -> dto.setExternalId((String) value);
            case "name" -> dto.setName((String) value);
            case "authors" -> dto.setAuthors((String) value);
            case "publisher" -> dto.setPublisher((String) value);
            case "language" -> dto.setLanguage((String) value);
            case "isbn" -> dto.setIsbn((String) value);
            case "pagesNumber" -> dto.setPagesNumber(castInt(value));
            case "publishYear" -> dto.setPublishYear(castInt(value));
            case "publishMonth" -> dto.setPublishMonth(castInt(value));
            case "publishDay" -> dto.setPublishDay(castInt(value));
            case "rating" -> dto.setRating(castDouble(value));
            case "ratingDist1" -> dto.setRatingDist1((String) value);
            case "ratingDist2" -> dto.setRatingDist2((String) value);
            case "ratingDist3" -> dto.setRatingDist3((String) value);
            case "ratingDist4" -> dto.setRatingDist4((String) value);
            case "ratingDist5" -> dto.setRatingDist5((String) value);
            case "ratingDistTotal" -> dto.setRatingDistTotal((String) value);
            case "countsOfReview" -> dto.setCountsOfReview(castInt(value));
            case "countOfTextReviews" -> dto.setCountOfTextReviews(castInt(value));
            case "description" -> dto.setDescription((String) value);
            case "imageUrl" -> dto.setImageUrl((String) value);
            case "price" -> {
                if (value instanceof Number num) {
                    dto.setPrice(BigDecimal.valueOf(num.doubleValue()));
                } else if (value instanceof String str) {
                    dto.setPrice(new BigDecimal(str));
                }
            }
            case "stockQuantity" -> dto.setStockQuantity(castLong(value));
            case "categoryId" -> dto.setCategoryId(castLong(value));
        }
    }

    private Integer castInt(Object v) {
        if (v == null)
            return null;
        if (v instanceof Number n)
            return n.intValue();
        return Integer.valueOf(v.toString());
    }

    private Double castDouble(Object v) {
        if (v == null)
            return null;
        if (v instanceof Number n)
            return n.doubleValue();
        return Double.valueOf(v.toString());
    }
    private Long castLong(Object v) {
        if (v == null)
            return null;
        if (v instanceof Number n)
            return n.longValue();
        return Long.valueOf(v.toString());
    }
}
