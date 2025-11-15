package com.booknest.productservice.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class PublishInfo {
    private Integer publishYear;
    private Integer publishMonth;
    private Integer publishDay;

    public Integer getPublishYear() { return publishYear; }
    public void setPublishYear(Integer publishYear) { this.publishYear = publishYear; }
    public Integer getPublishMonth() { return publishMonth; }
    public void setPublishMonth(Integer publishMonth) { this.publishMonth = publishMonth; }
    public Integer getPublishDay() { return publishDay; }
    public void setPublishDay(Integer publishDay) { this.publishDay = publishDay; }
}
