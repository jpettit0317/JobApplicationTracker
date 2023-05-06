package com.jpettit.jobapplicationbackend.helpers.helpervars;

import com.jpettit.jobapplicationbackend.enums.ErrorType;
import com.jpettit.jobapplicationbackend.models.responses.AuthenticationResponse;
import org.springframework.http.HttpStatus;

public class AuthenticationResponseTestVars {
    public static final AuthenticationResponse response = AuthenticationResponse
            .builder()
            .token("Token")
            .errorMessage("")
            .statusCode(HttpStatus.OK.value())
            .errorType(ErrorType.NONE)
            .build();
}
