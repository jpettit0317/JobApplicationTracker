package com.jpettit.jobapplicationbackend.services;

import com.jpettit.jobapplicationbackend.enums.ErrorType;
import com.jpettit.jobapplicationbackend.enums.Role;
import com.jpettit.jobapplicationbackend.exceptions.UserExistsException;
import com.jpettit.jobapplicationbackend.models.requests.AuthenticationRequest;
import com.jpettit.jobapplicationbackend.models.responses.AuthenticationResponse;
import com.jpettit.jobapplicationbackend.models.requests.RegisterRequest;
import com.jpettit.jobapplicationbackend.models.user.User;
import com.jpettit.jobapplicationbackend.repos.UserRepository;
import com.jpettit.jobapplicationbackend.staticVars.ErrorMessages;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

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
                .errorType(ErrorType.NONE)
                .build();
    }

    public boolean doesUserExist(String email) {
        return repository.findByEmail(email).isPresent();
    }

    public void authenticateUser(AuthenticationRequest request)
            throws IllegalArgumentException, AuthenticationException {
        final UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
        authenticationManager.authenticate(token);
    }

    public AuthenticationResponse handleGeneratingToken(String email) {
        try {
            var user = repository.findByEmail(email)
                    .orElseThrow();
            final String jwToken = jwtService.generateToken(user);

            return AuthenticationResponse.builder()
                    .token(jwToken)
                    .statusCode(HttpStatus.OK.value())
                    .errorType(ErrorType.NONE)
                    .errorMessage("")
                    .build();
        } catch(NoSuchElementException ex) {
            return AuthenticationResponse.builder()
                    .token("")
                    .statusCode(HttpStatus.FORBIDDEN.value())
                    .errorType(ErrorType.INVALID_INPUT)
                    .errorMessage(ErrorMessages.AuthMessages.invalidInput)
                    .build();
        }
    }
    public AuthenticationResponse login(AuthenticationRequest request) throws IllegalArgumentException, NoSuchElementException {
        if (isAuthRequestEmpty(request)) {
            return getEmptyUserInput();
        }
        try {
          authenticateUser(request);
        } catch (AuthenticationException authEx) {
            return AuthenticationResponse.builder()
                    .token("")
                    .errorMessage(ErrorMessages.AuthMessages.invalidInput)
                    .errorType(ErrorType.INVALID_INPUT)
                    .statusCode(HttpStatus.FORBIDDEN.value())
                    .build();
        } catch (IllegalArgumentException ex) {
            return AuthenticationResponse.builder()
                    .token("")
                    .errorMessage(ErrorMessages.AuthMessages.invalidInput)
                    .errorType(ErrorType.OTHER)
                    .statusCode(HttpStatus.FORBIDDEN.value())
                    .build();
        }

        return handleGeneratingToken(request.getEmail());
    }

    private boolean isAuthRequestEmpty(AuthenticationRequest request) {
        return request.getEmail().equals("") ||
                request.getPassword().equals("");
    }

    private AuthenticationResponse getEmptyUserInput() {
        return AuthenticationResponse.builder()
                .token("")
                .errorMessage(ErrorMessages.AuthMessages.invalidInput)
                .statusCode(HttpStatus.FORBIDDEN.value())
                .errorType(ErrorType.INVALID_INPUT)
                .build();
    }

}
