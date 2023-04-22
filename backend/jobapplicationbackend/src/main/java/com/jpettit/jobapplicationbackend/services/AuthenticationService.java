package com.jpettit.jobapplicationbackend.services;

import com.jpettit.jobapplicationbackend.enums.Role;
import com.jpettit.jobapplicationbackend.exceptions.UserExistsException;
import com.jpettit.jobapplicationbackend.models.requests.AuthenticationRequest;
import com.jpettit.jobapplicationbackend.models.responses.AuthenticationResponse;
import com.jpettit.jobapplicationbackend.models.requests.RegisterRequest;
import com.jpettit.jobapplicationbackend.models.user.User;
import com.jpettit.jobapplicationbackend.repos.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) throws UserExistsException {

        var user = User
                .builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .role(Role.USER)
                .build();

        if (doesUserExist(user.getEmail())) {
            final String error = user.getEmail() + " already exists.";
            throw new UserExistsException(error);
        }
        repository.save(user);

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .errorMessage("")
                .statusCode(HttpStatus.OK.value())
                .build();
    }

    public boolean doesUserExist(String email) {
        return repository.findByEmail(email).isPresent();
    }

    public AuthenticationResponse login(AuthenticationRequest request) throws IllegalArgumentException {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        } catch (AuthenticationException authEx) {
            System.out.println(authEx.getMessage());
        }

        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

}
