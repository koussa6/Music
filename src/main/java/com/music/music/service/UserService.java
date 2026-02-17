package com.music.music.service;

import com.music.music.documents.User;
import com.music.music.dto.RegisterRequest;
import com.music.music.dto.UserResponse;
import com.music.music.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public UserResponse registerUser(RegisterRequest request){
        if(userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email's already used");
        }
        User user= User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(User.Role.USER)
                .build();
        userRepository.save(user);
        return UserResponse.builder().id(user.getId()).email(user.getEmail()).role(UserResponse.Role.USER).build();
    }
    public UserResponse promoteToAdmin(String email){
        User existingUser=findByEmail(email);
        existingUser.setRole(User.Role.ADMIN);
        User savedUser=userRepository.save(existingUser);
        return UserResponse.builder()
                .id(savedUser.getId())
                .email(savedUser.getEmail())
                .role(UserResponse.Role.ADMIN)
                .build();
    }
    public User findByEmail(String email){
        return userRepository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("User not found by given email "+email));
    }
}
