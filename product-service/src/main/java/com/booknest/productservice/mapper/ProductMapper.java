package com.booknest.productservice.mapper;

import com.booknest.commonlib.dto.ProductDto;
import com.booknest.productservice.model.Product;
import com.booknest.productservice.model.PublishInfo;
import com.booknest.productservice.model.RatingInfo;
import com.booknest.productservice.model.ReviewInfo;

public class ProductMapper {

    public static ProductDto toDto(Product p) {
        ProductDto dto = new ProductDto();
        dto.setId(p.getId());
        dto.setExternalId(p.getExternalId());
        dto.setName(p.getName());
        dto.setAuthors(p.getAuthors());
        dto.setPublisher(p.getPublisher());
        dto.setLanguage(p.getLanguage());
        dto.setIsbn(p.getIsbn());
        dto.setPagesNumber(p.getPagesNumber());

        PublishInfo pub = p.getPublishInfo();
        if (pub != null) {
            dto.setPublishYear(pub.getPublishYear());
            dto.setPublishMonth(pub.getPublishMonth());
            dto.setPublishDay(pub.getPublishDay());
        }

        RatingInfo r = p.getRatingInfo();
        if (r != null) {
            dto.setRating(r.getRating());
            dto.setRatingDist1(r.getRatingDist1());
            dto.setRatingDist2(r.getRatingDist2());
            dto.setRatingDist3(r.getRatingDist3());
            dto.setRatingDist4(r.getRatingDist4());
            dto.setRatingDist5(r.getRatingDist5());
            dto.setRatingDistTotal(r.getRatingDistTotal());
        }

        ReviewInfo rv = p.getReviewInfo();
        if (rv != null) {
            dto.setCountsOfReview(rv.getCountsOfReview());
            dto.setCountOfTextReviews(rv.getCountOfTextReviews());
        }

        dto.setDescription(p.getDescription());
        dto.setStockQuantity(p.getStockQuantity());
        dto.setPrice(p.getPrice());
        return dto;
    }

    public static void updateEntity(Product p, ProductDto dto) {
        p.setExternalId(dto.getExternalId());
        p.setName(dto.getName());
        p.setAuthors(dto.getAuthors());
        p.setPublisher(dto.getPublisher());
        p.setLanguage(dto.getLanguage());
        p.setIsbn(dto.getIsbn());
        p.setPagesNumber(dto.getPagesNumber());

        PublishInfo pub = p.getPublishInfo() != null ? p.getPublishInfo() : new PublishInfo();
        pub.setPublishYear(dto.getPublishYear());
        pub.setPublishMonth(dto.getPublishMonth());
        pub.setPublishDay(dto.getPublishDay());
        p.setPublishInfo(pub);

        RatingInfo r = p.getRatingInfo() != null ? p.getRatingInfo() : new RatingInfo();
        r.setRating(dto.getRating());
        r.setRatingDist1(dto.getRatingDist1());
        r.setRatingDist2(dto.getRatingDist2());
        r.setRatingDist3(dto.getRatingDist3());
        r.setRatingDist4(dto.getRatingDist4());
        r.setRatingDist5(dto.getRatingDist5());
        r.setRatingDistTotal(dto.getRatingDistTotal());
        p.setRatingInfo(r);

        ReviewInfo rv = p.getReviewInfo() != null ? p.getReviewInfo() : new ReviewInfo();
        rv.setCountsOfReview(dto.getCountsOfReview());
        rv.setCountOfTextReviews(dto.getCountOfTextReviews());
        p.setReviewInfo(rv);

        p.setDescription(dto.getDescription());
        p.setStockQuantity(dto.getStockQuantity());
        p.setPrice(dto.getPrice());
    }
}
