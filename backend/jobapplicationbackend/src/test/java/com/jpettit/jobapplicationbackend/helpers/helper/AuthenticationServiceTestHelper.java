package com.jpettit.jobapplicationbackend.helpers.helper;

import com.jpettit.jobapplicationbackend.enums.ErrorType;
import com.jpettit.jobapplicationbackend.models.requests.RegisterRequest;
import com.jpettit.jobapplicationbackend.models.responses.AuthenticationResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

import static org.junit.jupiter.api.Assertions.*;

public class AuthenticationServiceTestHelper {
    public static final RegisterRequest validRequest =
            RegisterRequest
                    .builder()
                    .email("noname@email.com")
                    .firstname("John")
                    .lastname("Doe")
                    .password("password94_")
                    .build();

    public static final AuthenticationResponse validAuthResponse =
            AuthenticationResponse.builder()
                    .token("Token")
                    .statusCode(HttpStatus.OK.value())
                    .errorMessage("")
                    .errorType(ErrorType.NONE)
                    .build();
    public static final Authentication defaultAuth = new Authentication() {
        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return null;
        }

        @Override
        public Object getCredentials() {
            return null;
        }

        @Override
        public Object getDetails() {
            return null;
        }

        @Override
        public Object getPrincipal() {
            return null;
        }

        @Override
        public boolean isAuthenticated() {
            return false;
        }

        @Override
        public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {

        }

        @Override
        public String getName() {
            return null;
        }
    };

    public static void assertAuthenticationResponsesAreEqual(final AuthenticationResponse actual,
                                                             final AuthenticationResponse expected) {
        assertEquals(expected.getToken(), actual.getToken());
        assertEquals(expected.getErrorMessage(), actual.getErrorMessage());
        assertEquals(expected.getStatusCode(), actual.getStatusCode());
        assertEquals(expected.getErrorType(), actual.getErrorType());
    }
}
