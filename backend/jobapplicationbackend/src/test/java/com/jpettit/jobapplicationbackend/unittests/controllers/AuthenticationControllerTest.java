package com.jpettit.jobapplicationbackend.unittests.controllers;

import com.jpettit.jobapplicationbackend.controllers.AuthenticationController;
import com.jpettit.jobapplicationbackend.models.requests.AuthenticationRequest;
import com.jpettit.jobapplicationbackend.services.AuthenticationService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.BDDMockito.given;

@AutoConfigureJsonTesters
@WebMvcTest(AuthenticationController.class)
class AuthenticationControllerTest {
    @Autowired
    private MockMvc mvc;

    @Mock
    private AuthenticationService authenticationService;

    @InjectMocks
    private AuthenticationController sut;


    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    public void testWhenLoginHasNoUsernameOrNoPassword_controllerShouldReturn403() {
    }

    private final AuthenticationRequest createResponse(String email, String password) {
        return AuthenticationRequest.
                builder()
                .email(email)
                .password(password)
                .build();
    }
}