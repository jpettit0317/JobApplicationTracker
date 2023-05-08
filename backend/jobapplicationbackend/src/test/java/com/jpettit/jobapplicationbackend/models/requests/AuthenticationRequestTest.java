package com.jpettit.jobapplicationbackend.models.requests;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class AuthenticationRequestTest {
    private AuthenticationRequest sut;
    private final String fakeEmail = "fakeemail@email.com";
    private final String fakePassword = "superSecurePassword_1";
    @AfterEach
    void tearDown() {
        sut = null;
    }

    private void initSut(String email, String password) {
        sut = AuthenticationRequest
                .builder()
                .email(email)
                .password(password)
                .build();
    }

    @Test
    public void test_WhenRequestAsEmailAndPassword_ThenIsRequestValidShouldReturnTrue() {
        initSut(fakeEmail, fakePassword);

        final boolean actualValue = sut.isRequestValid();
        final String errorMessage = getErrorMessage(true,
                "email and password are both filled in");

        assertTrue(actualValue, errorMessage);
    }

    @Test
    public void test_WhenRequestHasNoEmailButHasPassword_ThenIsRequestValidShouldReturnFalse() {
        initSut("", fakePassword);

        final boolean actualValue = sut.isRequestValid();
        final String errorMessage = getErrorMessage(false,
                "email is empty but password is filled in");

        assertFalse(actualValue, errorMessage);
    }

    @Test
    public void test_WhenRequestHasNoPasswordButHasEmail_ThenIsRequestValidShouldReturnFalse() {
        initSut(fakeEmail, "");

        final boolean actualValue = sut.isRequestValid();
        final String errorMessage = getErrorMessage(false,
                "email is filled in password is empty");

        assertFalse(actualValue, errorMessage);
    }

    private String getErrorMessage(boolean isTrue, String tailMessage) {
        final String sutAsString = sut.toString();
        return String.format("%s isRequestValid " +
                "should return %b when %s", sutAsString, isTrue, tailMessage);
    }
}