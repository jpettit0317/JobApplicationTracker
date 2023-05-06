package com.jpettit.jobapplicationbackend.helpers.helper;

import com.jpettit.jobapplicationbackend.models.requests.RegisterRequest;
import com.jpettit.jobapplicationbackend.models.responses.AuthenticationResponse;
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

    public static void assertAuthenticationResponsesAreEqual(final AuthenticationResponse actual,
                                                             final AuthenticationResponse expected) {
        assertEquals(expected.getToken(), actual.getToken());
        assertEquals(expected.getErrorMessage(), actual.getErrorMessage());
        assertEquals(expected.getStatusCode(), actual.getStatusCode());
        assertEquals(expected.getErrorType(), actual.getErrorType());
    }
}
