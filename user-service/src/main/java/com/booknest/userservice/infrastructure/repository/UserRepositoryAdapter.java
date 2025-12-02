package com.booknest.userservice.infrastructure.repository;

import com.booknest.userservice.domain.model.User;
import com.booknest.userservice.domain.repository.UserRepository;
import com.booknest.userservice.infrastructure.persistence.UserEntity;
import com.booknest.userservice.infrastructure.persistence.UserMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserRepositoryAdapter implements UserRepository {

    private final JpaUserRepository jpaRepo;

    public UserRepositoryAdapter(JpaUserRepository jpaRepo) {
        this.jpaRepo = jpaRepo;
    }

    @Override
    public List<User> findAll() {
        return jpaRepo.findAll().stream()
                      .map(UserMapper::toDomain)
                      .toList();
    }

    @Override
    public Optional<User> findById(Long id) {
        return jpaRepo.findById(id).map(UserMapper::toDomain);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return jpaRepo.findByEmail(email).map(UserMapper::toDomain);
    }

    @Override
    public User save(User user) {
        UserEntity entity = UserMapper.toEntity(user);
        UserEntity saved = jpaRepo.save(entity);
        return UserMapper.toDomain(saved);
    }

    @Override
    public void deleteById(Long id) {
        jpaRepo.deleteById(id);
    }
}
