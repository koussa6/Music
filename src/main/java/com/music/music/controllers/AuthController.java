package com.music.music.controllers;


import com.music.music.documents.User;
import com.music.music.dto.AuthRequest;
import com.music.music.dto.AuthResponse;
import com.music.music.dto.RegisterRequest;
import com.music.music.dto.UserResponse;
import com.music.music.service.AppUserDetailsService;
import com.music.music.service.UserService;
import com.music.music.util.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService appUserDetailsService;
    private final JwtUtils jwtUtils;
    @PostMapping("/register")
    public ResponseEntity<?>register(@RequestBody RegisterRequest request){
        try{
            UserResponse response=userService.registerUser(request);
            return ResponseEntity.ok(response);
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?>login(@RequestBody AuthRequest request){
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));
            UserDetails userDetails= appUserDetailsService.loadUserByUsername(request.getEmail());
            User existingUser=userService.findByEmail(request.getEmail());
            if(request.getPortal().equalsIgnoreCase("admin")&& existingUser.getRole().name().equalsIgnoreCase("User")){
                return ResponseEntity.badRequest().body(Map.of("message","Email/Password is incorrect"));
            }
            String token=jwtUtils.generateToken(userDetails,existingUser.getRole().name());
            return ResponseEntity.ok(new AuthResponse(token,request.getEmail(),existingUser.getRole().name()));
        }catch (BadCredentialsException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @PostMapping("/promote-to-admin")
    public ResponseEntity<?>promote(@RequestBody Map<String,String> request){
        try{
            userService.promoteToAdmin(request.get("email"));
            return ResponseEntity.ok().body("User promoted");
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    };
}
