package com.jpettit.jobapplicationbackend.unittests.controllers;

import com.jpettit.jobapplicationbackend.controllers.AuthenticationController;
import com.jpettit.jobapplicationbackend.exceptions.UserExistsException;
import com.jpettit.jobapplicationbackend.helpers.helper.helperpair.HelperPair;
import com.jpettit.jobapplicationbackend.helpers.helpervars.AuthenticationControllerTestVars;
import com.jpettit.jobapplicationbackend.models.requests.AuthenticationRequest;
import com.jpettit.jobapplicationbackend.models.requests.RegisterRequest;
import com.jpettit.jobapplicationbackend.models.responses.AuthenticationResponse;
import com.jpettit.jobapplicationbackend.services.AuthenticationService;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import com.jpettit.jobapplicationbackend.helpers.helper.AuthenticationControllerTestHelper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@RunWith(MockitoJUnitRunner.class)
class AuthenticationControllerTest {
    @Mock
    private AuthenticationService authenticationService;

    @InjectMocks
    private AuthenticationController sut;

    private RegisterRequest registerRequest;

    private AuthenticationRequest authRequest;

    private HelperPair<ResponseEntity<AuthenticationResponse>> pair;

    private void setRegisterRequest(RegisterRequest newRequest) {
        registerRequest = newRequest;
    }

    private void setAuthRequest(AuthenticationRequest authenticationRequest) {
        this.authRequest = authenticationRequest;
    }

    private void setActual(ResponseEntity<AuthenticationResponse> actual) {
        pair.setActual(actual);
    }

    private void setExpected(ResponseEntity<AuthenticationResponse> expected) {
        pair.setExpected(expected);
    }
    @BeforeEach
    void setUp() {
        setRegisterRequest(RegisterRequest.builder().build());
        setAuthRequest(AuthenticationRequest.builder().build());
        pair = HelperPair
                .<ResponseEntity<AuthenticationResponse>>builder().build();
    }

    @AfterEach
    void tearDown() {
        setRegisterRequest(null);
        pair = null;
    }

    @Test
    public void test_whenAuthServiceThrowsAnUserExistsException_ThenControllerShouldReturnForbidden()
            throws Exception {
        setRegisterRequest(AuthenticationControllerTestVars.alreadyExistingUserRequest);
        setExpected(new ResponseEntity<>(AuthenticationControllerTestVars.
                        alreadyExistingUserResponse, HttpStatus.OK));

        final String userExistsErrorMessage = AuthenticationControllerTestVars
                .createEmailErrorMessage(registerRequest.getEmail());
        final UserExistsException userEx = AuthenticationControllerTestVars.createUserExistsException(userExistsErrorMessage);

        when(authenticationService.register(ArgumentMatchers.any()))
                .thenThrow(userEx);

        setActual(sut.register(registerRequest));

        AuthenticationControllerTestHelper.assertHttpResponseIsEqual(pair);
    }

    @Test
    public void register_WhenPassedInANonExistentUser_ShouldReturnToken() throws UserExistsException {
        setRegisterRequest(AuthenticationControllerTestVars.validRegisterRequest);
        setExpected(AuthenticationControllerTestVars.createResponseEntity(
                AuthenticationControllerTestVars.validAuthenticationResponse, HttpStatus.OK));


        when(authenticationService.register(ArgumentMatchers.any()))
                .thenReturn(pair.getExpected().getBody());

        setActual(sut.register(registerRequest));

        AuthenticationControllerTestHelper.assertHttpResponseIsEqual(pair);
    }

    /*
    Login tests
     */

    @Test
    public void login_whenPassedValidRequest_ShouldReturnOk() {
        setAuthRequest(AuthenticationControllerTestVars.jonDoeRequest);
        setExpected(AuthenticationControllerTestVars.createResponseEntity(AuthenticationControllerTestVars.validAuthenticationResponse, HttpStatus.OK));

        when(authenticationService.login(authRequest)).thenReturn(AuthenticationControllerTestVars.validAuthenticationResponse);

        setActual(sut.login(authRequest));

        AuthenticationControllerTestHelper.assertHttpResponseIsEqual(pair);
    }

    @Test
    public void login_whenPassedRequestWithWrongPassword_ShouldReturnForbidden() {
        setAuthRequest(AuthenticationControllerTestVars.jonDoeRequest);
        setExpected(AuthenticationControllerTestVars.createResponseEntity(
                AuthenticationControllerTestVars.wrongPasswordLoginResponse, HttpStatus.OK));

        when(authenticationService.login(authRequest)).thenReturn(AuthenticationControllerTestVars.wrongPasswordLoginResponse);

        setActual(sut.login(authRequest));

        AuthenticationControllerTestHelper.assertHttpResponseIsEqual(pair);
    }

    @Test
    public void login_whenGivenAnEmptyRequest_shouldReturnForbidden() {
        setAuthRequest(AuthenticationControllerTestVars.emptyLoginRequest);
        setExpected(AuthenticationControllerTestVars.createResponseEntity(
                AuthenticationControllerTestVars.emptyLoginResponse, HttpStatus.OK));

        when(authenticationService.login(authRequest)).thenReturn(AuthenticationControllerTestVars.emptyLoginResponse);

        setActual(sut.login(authRequest));

        AuthenticationControllerTestHelper.assertHttpResponseIsEqual(pair);
    }
}