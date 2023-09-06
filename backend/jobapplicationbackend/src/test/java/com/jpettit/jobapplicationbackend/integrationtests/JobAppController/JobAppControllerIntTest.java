package com.jpettit.jobapplicationbackend.integrationtests.JobAppController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.jpettit.jobapplicationbackend.enums.ErrorType;
import com.jpettit.jobapplicationbackend.helpers.helper.JobAppControllerTestHelper;
import com.jpettit.jobapplicationbackend.helpers.helper.JobApplicationIntTestHelper;
import com.jpettit.jobapplicationbackend.helpers.helper.helperpair.HelperPair;
import com.jpettit.jobapplicationbackend.helpers.helpervars.JobControllerIntTestHelperVars;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import com.jpettit.jobapplicationbackend.models.requests.AddJobAppRequest;
import com.jpettit.jobapplicationbackend.models.requests.RegisterRequest;
import com.jpettit.jobapplicationbackend.models.responses.AddJobAppResponse;
import com.jpettit.jobapplicationbackend.models.user.User;
import com.jpettit.jobapplicationbackend.repos.UserRepository;
import com.jpettit.jobapplicationbackend.services.JwtService;
import com.jpettit.jobapplicationbackend.staticVars.ErrorMessages;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@ExtendWith(MockitoExtension.class)
@RunWith(MockitoJUnitRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class JobAppControllerIntTest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    private final MediaType jsonMediaType = MediaType.APPLICATION_JSON;


    private AddJobAppRequest addJobAppRequest;

    @BeforeEach
    void setUp() {
        addJobAppRequest = AddJobAppRequest.builder().build();
        addUserToDatabase(JobControllerIntTestHelperVars.userJane);
    }

    @AfterEach
    void tearDown() {
        addJobAppRequest = null;
        removeAllUsersFromDatabase();
    }

    private void removeAllUsersFromDatabase() {
        userRepository.deleteAll();
    }
    private String getWrongErrorToken() {
        return jwtService.generateToken(JobControllerIntTestHelperVars.userJon);
    }
    private AddJobAppRequest createAddJobRequest(final JobApplication jobApp, final String token) {
        return AddJobAppRequest.builder()
                .jobApp(jobApp)
                .token(token)
                .build();
    }

    private void addUserToDatabase(final User user) {
        try {
            final String registerRequestString = createRegisterRequest(user).toJSONString();
            final String registerResponse = getTokenFromPost(JobControllerIntTestHelperVars.addUserURL,
                    jsonMediaType, registerRequestString);
            final String token = JobControllerIntTestHelperVars.getTokenFromResponse(registerResponse);
            addJobAppRequest.setToken(token);
        } catch (JsonProcessingException e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            fail();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private RegisterRequest createRegisterRequest(final User user) {
        return RegisterRequest.builder()
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .password(user.getPassword())
                .build();
    }
    private String getAddJobAppResponseFromPost(final String url, final MediaType type, final String content) throws Exception {
        return mockMvc.perform(post(url)
                        .accept(type)
                        .contentType(type)
                        .content(content))
                .andReturn().getResponse().getContentAsString();
    }

    private String getTokenFromPost(final String url, final MediaType type, final String content) throws Exception {
        return mockMvc.perform(post(url)
                .accept(type)
                .contentType(type)
                .content(content))
                .andReturn().getResponse().getContentAsString();
    }

    @Test
    public void addUser_whenPassedInNoInterviewJobApp_ShouldReturnCreated() {
        try {
            addJobAppRequest.setJobApp(JobControllerIntTestHelperVars.noInterviewJobApp);
            final String addJobAppRequestString = addJobAppRequest.toJSONString();
            final String response = getAddJobAppResponseFromPost(
                    JobControllerIntTestHelperVars.addJobAppURL,
                    jsonMediaType,
                    addJobAppRequestString);
            final AddJobAppResponse actualAddJobAppResponse = JobControllerIntTestHelperVars.getResponseFromString(response);
            final AddJobAppResponse expectedAddJobAppResponse = AddJobAppResponse.builder()
                    .statusCode(HttpStatus.CREATED.value())
                    .errorType(ErrorType.NONE)
                    .errorMessage("")
                    .build();

            assertEquals(expectedAddJobAppResponse, actualAddJobAppResponse);
        } catch (Exception e) {
            JobApplicationIntTestHelper.logErrorAndFail(e);
        }
    }

    @Test
    public void addUser_whenPassedInOneInterviewJobApp_ShouldReturnCreated() {
        try {
            addJobAppRequest.setJobApp(JobControllerIntTestHelperVars.oneInterviewJobApp);
            final String addJobAppRequestString = addJobAppRequest.toJSONString();
            final String response = getAddJobAppResponseFromPost(
                    JobControllerIntTestHelperVars.addJobAppURL,
                    jsonMediaType,
                    addJobAppRequestString
            );
            final AddJobAppResponse actualAddJobAppResponse = JobControllerIntTestHelperVars.getResponseFromString(response);
            final AddJobAppResponse expectedAddJobAppResponse = AddJobAppResponse.builder()
                    .statusCode(HttpStatus.CREATED.value())
                    .errorType(ErrorType.NONE)
                    .errorMessage("")
                    .build();

            assertEquals(expectedAddJobAppResponse, actualAddJobAppResponse);
        } catch (Exception e) {
            JobApplicationIntTestHelper.logErrorAndFail(e);
        }
    }

    @Test
    public void addUser_whenPassedInAnInterviewButNonExistingUser_ShouldReturnForbidden() {
        try {
            final String badToken = getWrongErrorToken();
            addJobAppRequest.setToken(badToken);
            addJobAppRequest.setJobApp(JobControllerIntTestHelperVars.oneInterviewJobApp);
            final String addJobAppRequestString = addJobAppRequest.toJSONString();
            final String response = getAddJobAppResponseFromPost(
                    JobControllerIntTestHelperVars.addJobAppURL,
                    jsonMediaType,
                    addJobAppRequestString
            );
            final AddJobAppResponse actualAddJobAppResponse = JobControllerIntTestHelperVars.getResponseFromString(response);
            final AddJobAppResponse expectedAddJobAppResponse = AddJobAppResponse.builder()
                    .statusCode(HttpStatus.NOT_FOUND.value())
                    .errorType(ErrorType.OTHER)
                    .errorMessage(ErrorMessages.AddJobAppMessages.unexpectedError)
                    .build();

            JobApplicationIntTestHelper.assertResponsesAreEqual(actualAddJobAppResponse, expectedAddJobAppResponse);
        } catch (Exception e) {
            JobApplicationIntTestHelper.logErrorAndFail(e);
        }
    }
}