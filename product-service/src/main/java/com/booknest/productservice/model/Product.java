package com.booknest.productservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String externalId;

    @NotBlank
    private String name;

    private String authors;
    private String publisher;
    private String language;
    private String isbn;

    private Integer pagesNumber;

    @Embedded
    private PublishInfo publishInfo = new PublishInfo();

    @Embedded
    private RatingInfo ratingInfo = new RatingInfo();

    @Embedded
    private ReviewInfo reviewInfo = new ReviewInfo();

    @Column(length = 2000)
    private String description;

    private Long stockQuantity;
    private BigDecimal price;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getExternalId() { return externalId; }
    public void setExternalId(String externalId) { this.externalId = externalId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAuthors() { return authors; }
    public void setAuthors(String authors) { this.authors = authors; }
    public String getPublisher() { return publisher; }
    public void setPublisher(String publisher) { this.publisher = publisher; }
    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }
    public Integer getPagesNumber() { return pagesNumber; }
    public void setPagesNumber(Integer pagesNumber) { this.pagesNumber = pagesNumber; }
    public PublishInfo getPublishInfo() { return publishInfo; }
    public void setPublishInfo(PublishInfo publishInfo) { this.publishInfo = publishInfo; }
    public RatingInfo getRatingInfo() { return ratingInfo; }
    public void setRatingInfo(RatingInfo ratingInfo) { this.ratingInfo = ratingInfo; }
    public ReviewInfo getReviewInfo() { return reviewInfo; }
    public void setReviewInfo(ReviewInfo reviewInfo) { this.reviewInfo = reviewInfo; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Long getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Long stockQuantity) { this.stockQuantity = stockQuantity; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
