package com.booknest.userservice.application.service;

import com.booknest.userservice.application.dto.UserPatchCommand;
import com.booknest.userservice.domain.model.User;
import com.booknest.userservice.domain.repository.UserRepository;
import com.booknest.userservice.domain.service.UserDomainService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserApplicationService {

    private final UserRepository repository;
    private final UserDomainService domainService;

    public UserApplicationService(UserRepository repository, UserDomainService domainService) {
        this.repository = repository;
        this.domainService = domainService;
    }

    // Lấy tất cả user
    public List<User> getAllUsers() {
        return repository.findAll();
    }

    // Lấy user theo ID
    public Optional<User> getUserById(Long id) {
        return repository.findById(id);
    }

    // Lấy user theo email
    public Optional<User> getUserByEmail(String email) {
        return repository.findByEmail(email);
    }

    // Tạo user mới
    public User createUser(User user) {
        domainService.validateNewUser(user);
        domainService.initializeUser(user);
        return repository.save(user);
    }

    // Cập nhật user toàn bộ
    public Optional<User> updateUser(Long id, User userDetails) {
        return repository.findById(id).map(existing -> {
            domainService.updateUserDetails(existing, userDetails);
            return repository.save(existing);
        });
    }

    // Patch user bằng UserPatchCommand
    public Optional<User> patchUser(Long id, UserPatchCommand command) {
        return repository.findById(id).map(existing -> {
            domainService.applyPatch(existing, command);
            return repository.save(existing);
        });
    }

    // Xoá user
    public boolean deleteUser(Long id) {
        if (repository.findById(id).isPresent()) {
            repository.deleteById(id);   // dùng deleteById thay vì delete(User)
            return true;
        }
        return false;
    }
}
