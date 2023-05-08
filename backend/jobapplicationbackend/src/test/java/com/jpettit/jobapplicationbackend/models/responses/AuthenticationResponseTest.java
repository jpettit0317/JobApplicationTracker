package com.jpettit.jobapplicationbackend.models.responses;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jpettit.jobapplicationbackend.helpers.helper.AuthenticationResponseTestHelper;
import com.jpettit.jobapplicationbackend.helpers.helper.helperpair.HelperPair;
import com.jpettit.jobapplicationbackend.helpers.helpervars.AuthenticationResponseTestVars;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class AuthenticationResponseTest {
    private AuthenticationResponse sut;

    @BeforeEach
    void setUp() {
        sut = AuthenticationResponse.builder().build();
    }

    @AfterEach
    void tearDown() { setSut(null); }


    private void setSut(AuthenticationResponse response) {
        sut = response;
    }

    @Test
    void toJSONString_shouldReturnString() {
        setSut(AuthenticationResponseTestVars.response);
        final String errorMessageStart = "When getting JSON string for " + sut.toString();
        try {
           final String expected = convertResponseToString();
           final String actual = sut.toJSONString();
            HelperPair<String> pair = HelperPair.<String>builder()
                    .actual(actual)
                    .expected(expected)
                    .build();
           AuthenticationResponseTestHelper.assertStringsAreEqual(pair, errorMessageStart);
        } catch (JsonProcessingException e) {
            final String message = sut.toString() + " threw an exception "
                    + e.getMessage();
            fail(message);
        }
    }

    public String convertResponseToString() throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(sut);
    }
}