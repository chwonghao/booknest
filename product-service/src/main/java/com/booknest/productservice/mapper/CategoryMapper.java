package com.booknest.productservice.mapper;

import com.booknest.commonlib.dto.CategoryDto;
import com.booknest.productservice.model.Category;

public class CategoryMapper {

    public static CategoryDto toDto(Category category) {
        if (category == null) return null;
        return new CategoryDto(
            category.getId(),
            category.getName(),
            category.getDescription()
        );
    }

    public static Category toEntity(CategoryDto dto) {
        if (dto == null) return null;
        Category category = new Category();
        category.setId(dto.getId());
        category.setName(dto.getName());
        category.setDescription(dto.getDescription());
        return category;
    }

    public static void updateEntity(Category category, CategoryDto dto) {
        if (dto.getName() != null) {
            category.setName(dto.getName());
        }
        if (dto.getDescription() != null) {
            category.setDescription(dto.getDescription());
        }
    }
}
