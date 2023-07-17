package com.jpettit.jobapplicationbackend.integrationtests.AuthenticationController;

import com.jpettit.jobapplicationbackend.helpers.helper.AuthenticationControllerTestHelper;
import com.jpettit.jobapplicationbackend.helpers.helper.helperpair.HelperPair;
import com.jpettit.jobapplicationbackend.helpers.helpervars.AuthenticationControllerTestVars;
import com.jpettit.jobapplicationbackend.models.requests.RegisterRequest;
import com.jpettit.jobapplicationbackend.models.responses.AuthenticationResponse;
import com.jpettit.jobapplicationbackend.models.user.User;
import com.jpettit.jobapplicationbackend.repos.UserRepository;
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
class AuthenticationControllerIntTest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    private RegisterRequest registerRequest;

    private final MediaType jsonMediaType = MediaType.APPLICATION_JSON;

    private String responseString = "";

    private HelperPair<AuthenticationResponse> responsePair;

    private void setRegisterRequest(RegisterRequest newRequest) {
        registerRequest = newRequest;
    }

    private void setResponseString(String newResponse) {
        responseString = newResponse;
    }

    private void setActualResponse(AuthenticationResponse newResponse) {
        responsePair.setActual(newResponse);
    }

    private void setExpectedResponse(AuthenticationResponse newResponse) {
        responsePair.setExpected(newResponse);
    }

    private void addUserToDatabase() {
        final User userToAdd = AuthenticationControllerTestVars.userJane;
        userRepository.save(userToAdd);
    }

    private void removeAllUsersFromDatabase() {
        userRepository.deleteAll();
    }

    @BeforeEach
    void setUp() {
        setRegisterRequest(RegisterRequest.builder().build());
        responsePair = HelperPair.<AuthenticationResponse>builder().build();
        addUserToDatabase();
    }

    @AfterEach
    void tearDown() {
        setRegisterRequest(null);
        setResponseString("");
        responsePair = null;
        removeAllUsersFromDatabase();
    }

    @Test
    public void register_whenPassedInUserThatDoesNotExist_ShouldReturnToken() throws Exception {
        setExpectedResponse(AuthenticationControllerTestVars.validAuthenticationResponse);
        setRegisterRequest(AuthenticationControllerTestVars
                .validRegisterRequest);
        final String registerRequestAsString = transformObjectToString(registerRequest);

        setResponseString(getResponseFromPost(AuthenticationControllerTestVars
                        .registerURL, jsonMediaType, registerRequestAsString));
        setActualResponse(transformStringToResponse(responseString));

        AuthenticationControllerTestHelper
                .assertValidResponsesAreEqualWithTokenFormattedCorrectly(responsePair);
    }

    @Test
    public void register_whenPassedInUserThatDoesExist_ShouldReturnEmpty() throws Exception {
        setRegisterRequest(AuthenticationControllerTestVars.alreadyExistingUserRequest);
        setExpectedResponse(AuthenticationControllerTestVars.alreadyExistingUserResponse);
        final String registerRequestAsString = transformObjectToString(registerRequest);

        setResponseString(getResponseFromPost(AuthenticationControllerTestVars
                        .registerURL, jsonMediaType, registerRequestAsString));
        setActualResponse(transformStringToResponse(responseString));

        AuthenticationControllerTestHelper.assertErrorResponsesAreEqual(responsePair);
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
}