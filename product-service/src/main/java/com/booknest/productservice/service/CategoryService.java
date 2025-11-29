package com.booknest.productservice.service;

import com.booknest.commonlib.dto.CategoryDto;
import com.booknest.productservice.mapper.CategoryMapper;
import com.booknest.productservice.model.Category;
import com.booknest.productservice.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository repository;

    public CategoryService(CategoryRepository repository) {
        this.repository = repository;
    }

    public List<CategoryDto> getAllCategories() {
        return repository.findAll().stream()
                .map(CategoryMapper::toDto)
                .toList();
    }

    public Optional<CategoryDto> getCategoryById(Long id) {
        return repository.findById(id).map(CategoryMapper::toDto);
    }

    public CategoryDto createCategory(CategoryDto dto) {
        Category category = CategoryMapper.toEntity(dto);
        return CategoryMapper.toDto(repository.save(category));
    }

    public Optional<CategoryDto> updateCategory(Long id, CategoryDto dto) {
        return repository.findById(id).map(existing -> {
            CategoryMapper.updateEntity(existing, dto);
            return CategoryMapper.toDto(repository.save(existing));
        });
    }

    public boolean deleteCategory(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
