package com.jpettit.jobapplicationbackend.unittests.models;

import com.jpettit.jobapplicationbackend.models.UserCredential;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class UserCredentialTest {
    private UserCredential sut;

    private void initSut(Optional<String> email, Optional<String> password) {
        String emailAddress = "";
        String pass = "";

        if (email.isPresent()) {
            emailAddress = email.get();
        }
        if (password.isPresent()) {
            pass = password.get();
        }

        sut = UserCredential.createCredential(emailAddress, pass);
    }

    private ArrayList<Optional<String>> createOptionalStrings(String[] inputs) {
        ArrayList<Optional<String>> result = new ArrayList<>();

        for (String input : inputs) {
            result.add(Optional.of(input));
        }

        return result;
    }
    @AfterEach
    void tearDown() {
        sut = null;
    }

    @Test
    public void testWhenLoginIsSetWithValidEmailAndPassword_isInvalidShouldReturnFalse() {
        final Optional<String> email = Optional.of("test@test.com");
        final Optional<String> password = Optional.of("password");
        initSut(email, password);
        final String errorMessage = String.format("isInvalid should return false when passed in %s", sut.toString());

        assertFalse(sut.isInvalid(), errorMessage);
    }

    @Test
    public void testWhenLoginIsSetWithEmptyEmailOrPassword_isInvalidShouldReturnTrue() {
        final ArrayList<Optional<String>> emails = createOptionalStrings(new String[]{"test@email.com", ""});
        final ArrayList<Optional<String>> passwords = createOptionalStrings(new String[]{"", "password"});

        for (int i = 0; i < emails.size(); i++) {
            final Optional<String> email = emails.get(i);
            final Optional<String> password = passwords.get(i);

            initSut(email, password);

            assertTrue(sut.isInvalid(), String.format("isInvalid should return true when passed in %s", sut.toString()));
        }
    }
}