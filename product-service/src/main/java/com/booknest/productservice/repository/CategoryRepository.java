package com.booknest.productservice.repository;

import com.booknest.productservice.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // Tìm category theo tên (nếu cần)
    Optional<Category> findByName(String name);

    // Kiểm tra tồn tại theo tên
    boolean existsByName(String name);
}
