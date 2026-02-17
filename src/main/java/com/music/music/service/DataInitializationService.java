package com.music.music.service;

import com.music.music.documents.User;
import com.music.music.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class DataInitializationService implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public void run(String... args) throws Exception {
        createDefaultAdminUser();
    }

    private void createDefaultAdminUser() {
        if(!userRepository.existsByEmail("admin@musify.com")){
            User adminUser=User.builder().email("admin@musify.com").password("admin123").role(User.Role.ADMIN).build();
            userRepository.save(adminUser);
            log.info("Default admin user created: email=admin@musify.com, password=admin123");
        }else{
            log.info("Admin user already exists");
        }
    }
}
