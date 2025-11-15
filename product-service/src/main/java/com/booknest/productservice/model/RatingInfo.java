package com.booknest.productservice.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class RatingInfo {
    private Double rating;
    private String ratingDist1;
    private String ratingDist2;
    private String ratingDist3;
    private String ratingDist4;
    private String ratingDist5;
    private String ratingDistTotal;

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
}
