package com.jpettit.jobapplicationbackend.integrationtests.AuthenticationController;

import com.jpettit.jobapplicationbackend.helpers.helper.AuthenticationControllerTestHelper;
import com.jpettit.jobapplicationbackend.helpers.helper.helperpair.HelperPair;
import com.jpettit.jobapplicationbackend.helpers.helpervars.AuthenticationControllerTestVars;
import com.jpettit.jobapplicationbackend.models.requests.AuthenticationRequest;
import com.jpettit.jobapplicationbackend.models.requests.RegisterRequest;
import com.jpettit.jobapplicationbackend.models.responses.AuthenticationResponse;
import com.jpettit.jobapplicationbackend.models.user.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@ExtendWith(MockitoExtension.class)
@RunWith(MockitoJUnitRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class AuthenticationControllerIntLoginTest {
    @Autowired
    MockMvc mockMvc;

    private final MediaType jsonMediaType = MediaType.APPLICATION_JSON;

    private HelperPair<AuthenticationResponse> pair;

    private void setActualResponse(AuthenticationResponse response) {
        pair.setActual(response);
    }

    private void setExpectedResponse(AuthenticationResponse response) {
        pair.setExpected(response);
    }

    private void addUserToDatabase() throws Exception {
        final User userToAdd = AuthenticationControllerTestVars.userJane;
        final RegisterRequest request = createRequestFromUser(userToAdd);
        final String registerRequest = transformObjectToString(request);
        getResponseFromPost(AuthenticationControllerTestVars.registerURL,
                jsonMediaType, registerRequest);
    }

    private RegisterRequest createRequestFromUser(final User user) {
        return RegisterRequest.builder()
                .email(user.getEmail())
                .password(user.getPassword())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .build();
    }

    public String getResponseFromPost(String url, MediaType type, String content)
            throws Exception {
        return mockMvc.perform(post(url)
                        .accept(type)
                        .contentType(type)
                        .content(content))
                .andReturn().getResponse().getContentAsString();
    }

    public AuthenticationResponse transformStringToResponse(String responseString) {
        return AuthenticationControllerTestVars.transformStringToResponse(responseString);
    }

    public String transformObjectToString(Object object) {
        return AuthenticationControllerTestVars.transformObjectToJSONString(object);
    }

    @BeforeEach
    void setUp() throws Exception {
        pair = HelperPair.<AuthenticationResponse>builder().build();
        addUserToDatabase();
    }

    @AfterEach
    void tearDown()  {
        pair = null;
    }

    @Test
    public void login_whenUserExistsAndCredentialsAreCorrect_ShouldReturnSuccess() throws Exception {
        final User user = AuthenticationControllerTestVars.userJane;
        final AuthenticationRequest janeDoeRequest = AuthenticationRequest.builder()
                .email(user.getEmail())
                .password(user.getPassword())
                .build();
        final String janeDoRequestString = transformObjectToString(janeDoeRequest);
        setExpectedResponse(AuthenticationControllerTestVars.validAuthenticationResponse);

        final String responseStr = getResponseFromPost(
                AuthenticationControllerTestVars.loginURL, jsonMediaType, janeDoRequestString);
        setActualResponse(transformStringToResponse(responseStr));

        AuthenticationControllerTestHelper.assertValidResponsesAreEqualWithTokenFormattedCorrectly(pair);
    }

    @Test
    public void login_whenUserExistsAndCredentialsAreIncorrect_ShouldReturnForbidden() throws Exception {
        final User user = AuthenticationControllerTestVars.userJane;
        final AuthenticationRequest janeDoeRequest = AuthenticationRequest.builder()
                .email(user.getEmail())
                .password("password94_;;")
                .build();
        final String janeDoRequestString = transformObjectToString(janeDoeRequest);
        setExpectedResponse(AuthenticationControllerTestVars.wrongPasswordLoginResponse);

        final String responseStr = getResponseFromPost(
                AuthenticationControllerTestVars.loginURL, jsonMediaType, janeDoRequestString);
        setActualResponse(transformStringToResponse(responseStr));

        AuthenticationControllerTestHelper.assertErrorResponsesAreEqual(pair);
    }

    @Test
    public void login_whenGivenAnEmptyCredentials_ShouldReturnForbidden() throws Exception {
        final AuthenticationRequest emptyRequest = AuthenticationRequest.builder()
                .email("")
                .password("")
                .build();
        final String emptyRequestString = transformObjectToString(emptyRequest);
        setExpectedResponse(AuthenticationControllerTestVars.wrongPasswordLoginResponse);

        final String responseStr = getResponseFromPost(
                AuthenticationControllerTestVars.loginURL, jsonMediaType, emptyRequestString);
        setActualResponse(transformStringToResponse(responseStr));

        AuthenticationControllerTestHelper.assertErrorResponsesAreEqual(pair);
    }
}
