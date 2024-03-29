package com.jpettit.jobapplicationbackend.unittests.services;

import com.jpettit.jobapplicationbackend.enums.ErrorType;
import com.jpettit.jobapplicationbackend.enums.Role;
import com.jpettit.jobapplicationbackend.exceptions.UserExistsException;
import com.jpettit.jobapplicationbackend.helpers.helper.AuthenticationServiceTestHelper;
import com.jpettit.jobapplicationbackend.models.requests.AuthenticationRequest;
import com.jpettit.jobapplicationbackend.models.requests.RegisterRequest;
import com.jpettit.jobapplicationbackend.models.responses.AuthenticationResponse;
import com.jpettit.jobapplicationbackend.models.user.User;
import com.jpettit.jobapplicationbackend.repos.UserRepository;
import com.jpettit.jobapplicationbackend.services.AuthenticationService;
import com.jpettit.jobapplicationbackend.services.JwtService;
import com.jpettit.jobapplicationbackend.staticVars.ErrorMessages;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthenticationService sut;

    /*
    Register tests
     */

    @Test
    public void register_WhenPassedInAnEmailThatExists_ShouldThrowUserExistsException() {
        final RegisterRequest request = AuthenticationServiceTestHelper.validRequest;
        final Optional<User> optionalUser = Optional.of(
                User.builder()
                        .firstname("John")
                        .lastname("Doe")
                        .email("noname@email.com")
                        .password("password94_")
                        .role(Role.USER)
                        .build()
        );
        when(passwordEncoder.encode(optionalUser.get().getPassword()))
                .thenReturn("password94_");
        when(userRepository.findByEmail(ArgumentMatchers.anyString()))
                .thenReturn(optionalUser);
        assertThrows(UserExistsException.class, () -> sut.register(request));
    }

    @Test
    public void register_WhenPassedInNonExistentRegister_ShouldReturnResponse() throws UserExistsException {
        final RegisterRequest request = AuthenticationServiceTestHelper.validRequest;
        final AuthenticationResponse expectedResponse = AuthenticationResponse.builder()
                .token("Token")
                .statusCode(HttpStatus.OK.value())
                .errorMessage("")
                .errorType(ErrorType.NONE)
                .build();
        final Optional<User> emptyUser = Optional.empty();
        final Optional<User> user = Optional.of(
                User.builder()
                        .email(request.getEmail())
                        .firstname(request.getFirstname())
                        .lastname(request.getLastname())
                        .role(Role.USER)
                        .password(request.getPassword())
                        .build()
        );
        when(passwordEncoder.encode(ArgumentMatchers.anyString()))
                .thenReturn(request.getPassword());
        when(userRepository.findByEmail(ArgumentMatchers.anyString()))
                .thenReturn(emptyUser);
        when(userRepository.save(ArgumentMatchers.any())).thenReturn(user.get());
        when(jwtService.generateToken(ArgumentMatchers.any())).thenReturn("Token");

        final AuthenticationResponse actualResponse = sut.register(request);

        AuthenticationServiceTestHelper.assertAuthenticationResponsesAreEqual(actualResponse, expectedResponse);

    }

    /*
    doesUserExist tests
     */
    @Test
    public void doesUserExist_whenEmailAlreadyExists_shouldReturnTrue() {
        final Optional<User> user = Optional.of(User.builder()
                        .password("password")
                        .role(Role.USER)
                        .firstname("John")
                        .lastname("Doe")
                        .email("noname@email.com")
                .build());
        when(userRepository.findByEmail(ArgumentMatchers.anyString()))
                .thenReturn(user);

        final boolean actualValue = sut.doesUserExist(user.get().getEmail());
        assertTrue(actualValue);
    }

    @Test
    public void doesUserExist_whenEmailDoesNotExist_shouldReturnFalse() {
        final Optional<User> user = Optional.of(User.builder()
                .password("password")
                .role(Role.USER)
                .firstname("John")
                .lastname("Doe")
                .email("noname@email.com")
                .build());
        when(userRepository.findByEmail(ArgumentMatchers.anyString()))
                .thenReturn(Optional.empty());

        final boolean actualValue = sut.doesUserExist(user.get().getEmail());
        assertFalse(actualValue);
    }

    /*
    Login tests
     */

    @Test
    public void login_whenGivenLoginThatExistsAndCorrect_shouldReturnSuccessfulResponse() {
        final User user = User.builder()
                .email("johndoe@email.com")
                .password("password94_;")
                .build();
        final AuthenticationRequest request = AuthenticationRequest.builder()
                .email(user.getEmail())
                .password(user.getPassword())
                .build();
        final AuthenticationResponse expectedResponse = AuthenticationServiceTestHelper.validAuthResponse;
        final UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());

        when(authenticationManager.authenticate(token)).thenReturn(AuthenticationServiceTestHelper.defaultAuth);
        when(userRepository.findByEmail(ArgumentMatchers.anyString()))
                .thenReturn(Optional.of(user));
        when(jwtService.generateToken(ArgumentMatchers.any())).thenReturn("Token");

        final AuthenticationResponse actualResponse = sut.login(request);
        AuthenticationServiceTestHelper.assertAuthenticationResponsesAreEqual(actualResponse, expectedResponse);
    }

    @Test
    public void login_whenGivenLoginThatThrowsAnAuthenticationException_shouldReturnFailureResponse() {
        final User user = User.builder()
                .email("johndoe@email.com")
                .password("password94_;")
                .build();
        final AuthenticationRequest request = AuthenticationRequest.builder()
                .email(user.getEmail())
                .password(user.getPassword())
                .build();
        final AuthenticationResponse expectedResponse = AuthenticationResponse.builder()
                .token("")
                .errorMessage(ErrorMessages.AuthMessages.invalidInput)
                .errorType(ErrorType.INVALID_INPUT)
                .statusCode(HttpStatus.FORBIDDEN.value())
                .build();
        final UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());

        when(authenticationManager.authenticate(token)).thenThrow(new AuthenticationException("Invalid email or password.") {
        });

        final AuthenticationResponse actualResponse = sut.login(request);
        AuthenticationServiceTestHelper.assertAuthenticationResponsesAreEqual(actualResponse, expectedResponse);
    }

    @Test
    public void login_whenGivenLoginThatThrowsAnIllegalArgumentException_shouldReturnFailureResponse() {
        final User user = User.builder()
                .email("johndoe@email.com")
                .password("password94_;")
                .build();
        final AuthenticationRequest request = AuthenticationRequest.builder()
                .email(user.getEmail())
                .password(user.getPassword())
                .build();
        final AuthenticationResponse expectedResponse = AuthenticationResponse.builder()
                .token("")
                .errorMessage(ErrorMessages.AuthMessages.invalidInput)
                .errorType(ErrorType.OTHER)
                .statusCode(HttpStatus.FORBIDDEN.value())
                .build();
        final UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        final IllegalArgumentException illArgEx = new IllegalArgumentException("Illegal.");
        when(authenticationManager.authenticate(token)).thenThrow(illArgEx);

        final AuthenticationResponse actualResponse = sut.login(request);
        AuthenticationServiceTestHelper.assertAuthenticationResponsesAreEqual(actualResponse, expectedResponse);
    }

    @Test
    public void login_whenPassedInEmptyUser_ShouldReturnError() {
        final AuthenticationRequest request = AuthenticationRequest.builder()
                .email("")
                .password("")
                .build();
        final AuthenticationResponse expectedResponse = AuthenticationResponse.builder()
                .errorMessage(ErrorMessages.AuthMessages.invalidInput)
                .errorType(ErrorType.INVALID_INPUT)
                .statusCode(HttpStatus.FORBIDDEN.value())
                .token("")
                .build();

        final AuthenticationResponse actualResponse = sut.login(request);

        AuthenticationServiceTestHelper.assertAuthenticationResponsesAreEqual(actualResponse, expectedResponse);
    }
}