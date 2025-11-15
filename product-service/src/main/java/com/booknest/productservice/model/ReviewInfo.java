package com.booknest.productservice.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class ReviewInfo {
    private Integer countsOfReview;
    private Integer countOfTextReviews;

    public Integer getCountsOfReview() { return countsOfReview; }
    public void setCountsOfReview(Integer countsOfReview) { this.countsOfReview = countsOfReview; }
    public Integer getCountOfTextReviews() { return countOfTextReviews; }
    public void setCountOfTextReviews(Integer countOfTextReviews) { this.countOfTextReviews = countOfTextReviews; }
}
