package com.jpettit.jobapplicationbackend.helpers.helper;

import com.jpettit.jobapplicationbackend.helpers.helper.helperpair.HelperPair;
import com.jpettit.jobapplicationbackend.models.responses.AuthenticationResponse;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;

public class AuthenticationControllerTestHelper {
    public static void assertHttpResponseIsEqual(HelperPair<ResponseEntity<AuthenticationResponse>> pair) {
        assertEquals(pair.getActual().getBody(), pair.getExpected().getBody());
        assertEquals(pair.getActual().getStatusCode(), pair.getExpected().getStatusCode());
    }

    public static void assertValidResponsesAreEqualWithTokenFormattedCorrectly(
            HelperPair<AuthenticationResponse> pair) {
        assertEquals(pair.getExpected().getErrorType(),
                pair.getActual().getErrorType());
        assertEquals(pair.getExpected().getErrorMessage(),
                pair.getActual().getErrorMessage());
        assertEquals(pair.getExpected().getStatusCode(),
                pair.getActual().getStatusCode());
        AuthenticationControllerTestHelper
                .assertStringContainsSpecificCharacterNumberOfTimes(
                        pair.getActual().getToken(),
                        '.', 2L);
    }

    public static void assertErrorResponsesAreEqual(HelperPair<AuthenticationResponse> pair) {
        assertEquals(pair.getExpected().getErrorType(),
                pair.getActual().getErrorType());
        assertEquals(pair.getExpected().getErrorMessage(),
                pair.getActual().getErrorMessage());
        assertEquals(pair.getExpected().getStatusCode(),
                pair.getActual().getStatusCode());
        assertEquals(pair.getExpected().getToken(), pair.getActual().getToken());
    }

    public static void assertStringContainsSpecificCharacterNumberOfTimes(
            String input, char characterToMatch, long times) {
        final long actualCount = input.codePoints()
                .filter(ch -> ch == characterToMatch).count();
        assertEquals(times, actualCount);
    }
}
