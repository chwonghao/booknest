package com.booknest.commonlib.dto;

import java.math.BigDecimal;

public class ProductDto {
    private Long id;
    private String externalId;
    private String name;
    private String authors;
    private String publisher;
    private String language;
    private String isbn;
    private Integer pagesNumber;

    private Integer publishYear;
    private Integer publishMonth;
    private Integer publishDay;

    private Double rating;
    private String ratingDist1;
    private String ratingDist2;
    private String ratingDist3;
    private String ratingDist4;
    private String ratingDist5;
    private String ratingDistTotal;

    private Integer countsOfReview;
    private Integer countOfTextReviews;

    private String description;
    private Long stockQuantity;
    private BigDecimal price;

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
    public Integer getPublishYear() { return publishYear; }
    public void setPublishYear(Integer publishYear) { this.publishYear = publishYear; }
    public Integer getPublishMonth() { return publishMonth; }
    public void setPublishMonth(Integer publishMonth) { this.publishMonth = publishMonth; }
    public Integer getPublishDay() { return publishDay; }
    public void setPublishDay(Integer publishDay) { this.publishDay = publishDay; }
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    public String getRatingDist1() { return ratingDist1; }
    public void setRatingDist1(String ratingDist1) { this.ratingDist1 = ratingDist1; }
    public String getRatingDist2() { return ratingDist2; }
    public void setRatingDist2(String ratingDist2) { this.ratingDist2 = ratingDist2; }
    public String getRatingDist3() { return ratingDist3; }
    public void setRatingDist3(String ratingDist3) { this.ratingDist3 = ratingDist3; }
    public String getRatingDist4() { return ratingDist4; }
    public void setRatingDist4(String ratingDist4) { this.ratingDist4 = ratingDist4; }
    public String getRatingDist5() { return ratingDist5; }
    public void setRatingDist5(String ratingDist5) { this.ratingDist5 = ratingDist5; }
    public String getRatingDistTotal() { return ratingDistTotal; }
    public void setRatingDistTotal(String ratingDistTotal) { this.ratingDistTotal = ratingDistTotal; }
    public Integer getCountsOfReview() { return countsOfReview; }
    public void setCountsOfReview(Integer countsOfReview) { this.countsOfReview = countsOfReview; }
    public Integer getCountOfTextReviews() { return countOfTextReviews; }
    public void setCountOfTextReviews(Integer countOfTextReviews) { this.countOfTextReviews = countOfTextReviews; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Long getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Long stockQuantity) { this.stockQuantity = stockQuantity; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
}
