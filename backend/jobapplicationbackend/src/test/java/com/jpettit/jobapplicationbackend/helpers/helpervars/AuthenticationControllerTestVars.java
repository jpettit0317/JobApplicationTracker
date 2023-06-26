package com.jpettit.jobapplicationbackend.helpers.helpervars;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;
import com.jpettit.jobapplicationbackend.enums.ErrorType;
import com.jpettit.jobapplicationbackend.enums.Role;
import com.jpettit.jobapplicationbackend.exceptions.UserExistsException;
import com.jpettit.jobapplicationbackend.models.requests.AuthenticationRequest;
import com.jpettit.jobapplicationbackend.models.requests.RegisterRequest;
import com.jpettit.jobapplicationbackend.models.responses.AuthenticationResponse;
import com.jpettit.jobapplicationbackend.models.user.User;
import com.jpettit.jobapplicationbackend.staticVars.ErrorMessages;
import com.jpettit.jobapplicationbackend.staticVars.Routes;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class AuthenticationControllerTestVars {
    public static final String userExistsErrorMessageTail = "already exists.";
    public static final String registerURL = Routes.BaseRoutes.authBaseRoute
            + Routes.PostRoutes.register;
    public static final User userJane = User
            .builder()
            .firstname("Jane")
            .lastname("Doe")
            .email("noname2@email.com")
            .password("testPassword94_")
            .role(Role.USER)
            .id(1L)
            .build();

    public static final RegisterRequest validRegisterRequest =
            RegisterRequest.builder()
                    .email("noname@email.com")
                    .firstname("John")
                    .lastname("Doe")
                    .password("password94_j")
                    .build();

    public static final RegisterRequest alreadyExistingUserRequest =
            RegisterRequest
                    .builder()
                    .firstname(userJane.getFirstname())
                    .lastname(userJane.getLastname())
                    .email(userJane.getEmail())
                    .password(userJane.getPassword())
                    .build();

    public static final AuthenticationRequest jonDoeRequest = AuthenticationRequest.builder()
            .email("jondoe@email.com")
            .password("password94_")
            .build();

    public static final AuthenticationRequest emptyLoginRequest = AuthenticationRequest
            .builder()
            .email("")
            .password("")
            .build();

    public static final AuthenticationResponse alreadyExistingUserResponse =
            AuthenticationResponse
                    .builder()
                    .token("")
                    .errorMessage(userJane.getEmail() + " " + userExistsErrorMessageTail)
                    .statusCode(HttpStatus.FORBIDDEN.value())
                    .errorType(ErrorType.USER_EXISTS)
                    .build();

    public static final AuthenticationResponse validAuthenticationResponse =
            AuthenticationResponse
                    .builder()
                    .token("Token")
                    .errorMessage("")
                    .statusCode(HttpStatus.OK.value())
                    .errorType(ErrorType.NONE)
                    .build();

    public static final AuthenticationResponse wrongPasswordLoginResponse =
            AuthenticationResponse
                    .builder()
                    .token("")
                    .errorMessage(ErrorMessages.AuthMessages.invalidInput)
                    .statusCode(HttpStatus.FORBIDDEN.value())
                    .errorType(ErrorType.INVALID_INPUT)
                    .build();

    public static final AuthenticationResponse emptyLoginResponse =
            AuthenticationResponse
                    .builder()
                    .token("")
                    .errorMessage(ErrorMessages.AuthMessages.invalidInput)
                    .statusCode(HttpStatus.FORBIDDEN.value())
                    .errorType(ErrorType.INVALID_INPUT)
                    .build();

    public static String createEmailErrorMessage(String email) {
        return email + " " + userExistsErrorMessageTail;
    }

    public static UserExistsException createUserExistsException(final String message) {
        return new UserExistsException(message);
    }

    public static AuthenticationResponse transformStringToResponse(String input) {
        final String token = JsonPath.read(input, "$.token");
        final String errorMessage = JsonPath.read(input, "$.errorMessage");
        final String errorType = JsonPath.read(input, "$.errorType");
        final int statusCode = JsonPath.read(input, "$.statusCode");

        return AuthenticationResponse
                .builder()
                .token(token)
                .errorType(errorType)
                .statusCode(statusCode)
                .errorMessage(errorMessage)
                .build();
    }

    public static String transformObjectToJSONString(Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (JsonProcessingException jsonProcessingException) {
            System.out.println("Couldn't parse object.");
            return "";
        }
    }

    public static ResponseEntity<AuthenticationResponse> createResponseEntity (
            final AuthenticationResponse response, HttpStatus statusCode) {
        return new ResponseEntity<>(response, statusCode);
    }
}
