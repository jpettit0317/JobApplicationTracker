package com.jpettit.jobapplicationbackend.integrationtests.JobAppController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.jpettit.jobapplicationbackend.enums.ErrorType;
import com.jpettit.jobapplicationbackend.helpers.helper.JobAppControllerTestHelper;
import com.jpettit.jobapplicationbackend.helpers.helper.JobApplicationIntTestHelper;
import com.jpettit.jobapplicationbackend.helpers.helpervars.JobControllerIntTestHelperVars;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobAppData;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterview;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterviewData;
import com.jpettit.jobapplicationbackend.models.requests.AddJobAppRequest;
import com.jpettit.jobapplicationbackend.models.requests.RegisterRequest;
import com.jpettit.jobapplicationbackend.models.responses.AddJobAppResponse;
import com.jpettit.jobapplicationbackend.models.responses.DeleteJobAppResponse;
import com.jpettit.jobapplicationbackend.models.responses.GetJobAppsResponse;
import com.jpettit.jobapplicationbackend.models.user.User;
import com.jpettit.jobapplicationbackend.repos.JobAppDataRepository;
import com.jpettit.jobapplicationbackend.repos.JobInterviewDataRepository;
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

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

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

    @Autowired
    private JobAppDataRepository jobAppDataRepository;

    @Autowired
    private JobInterviewDataRepository jobInterviewDataRepository;

    private final MediaType jsonMediaType = MediaType.APPLICATION_JSON;


    private AddJobAppRequest addJobAppRequest;

    @BeforeEach
    void setUp() {
        addJobAppRequest = AddJobAppRequest.builder().build();
        addUserToDatabase();
        addJobAppToDatabase();
    }

    @AfterEach
    void tearDown() {
        addJobAppRequest = null;
        removeAllUsersFromDatabase();
        removeAllJobAppDataFromDatabase();
    }

    private void removeAllUsersFromDatabase() {
        userRepository.deleteAll();
    }

    private void removeAllJobAppDataFromDatabase() {
        jobInterviewDataRepository.deleteAll();
        jobAppDataRepository.deleteAll();
    }

    private String getWrongErrorToken() {
        return jwtService.generateToken(JobControllerIntTestHelperVars.userJon);
    }
    private void addUserToDatabase() {
        final User user = JobControllerIntTestHelperVars.userJane;
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

    private void addJobAppToDatabase() {
        final User user = JobControllerIntTestHelperVars.userJane;
        try {
            final JobApplication jobApp = JobControllerIntTestHelperVars.uuidJobApp;
            final JobInterview jobInterview = jobApp.getInterviews().get(0);
            final JobAppData jobAppData = JobControllerIntTestHelperVars.getJobAppDataFromJobApp(jobApp, user.getEmail());
            final JobInterviewData jobInterviewData = JobControllerIntTestHelperVars.getJobInterviewDataFromJobInterview(jobInterview);

            jobAppDataRepository.save(jobAppData);
            jobInterviewDataRepository.save(jobInterviewData);
        } catch (Exception e) {
            JobApplicationIntTestHelper.logErrorAndFail(e);
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

    private String getAllJobAppsResponse(final String url, final MediaType type) throws Exception {
        return mockMvc.perform(get(url).accept(type))
                .andReturn().getResponse().getContentAsString();
    }

    private DeleteJobAppResponse getDeleteJobAppResponse(final String url, final MediaType type) throws Exception {
        final String resp = mockMvc.perform(delete(url).accept(type)).andReturn().getResponse().getContentAsString();
        return JobControllerIntTestHelperVars.getDeleteJobAppsResponse(resp);
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

    @Test
    public void getAllJobApps_whenGivenValidToken_ShouldReturnSuccess() {
        final String token = addJobAppRequest.getToken();
        final String baseURL = JobControllerIntTestHelperVars.baseGetAllJobAppsURL;
        final String getAllJobAppsURL = JobControllerIntTestHelperVars.createGetJobAppsURL(baseURL, token);
        final GetJobAppsResponse expectedResponse = GetJobAppsResponse.builder()
                .jobApps(new ArrayList<>(List.of(JobControllerIntTestHelperVars.uuidJobApp)))
                .errorMessage("")
                .errorType(ErrorType.NONE)
                .statusCode(HttpStatus.OK.value())
                .build();
        try {
            final String response = getAllJobAppsResponse(getAllJobAppsURL, jsonMediaType);
            final GetJobAppsResponse actual = JobControllerIntTestHelperVars.getJobAppsResponse(response);
            System.out.println("The acutal response is " + actual.toJSONString());
            JobApplicationIntTestHelper.assertGetAllJobAppsResponseAreEqual(actual, expectedResponse);
        } catch (Exception e) {
            JobApplicationIntTestHelper.logErrorAndFail(e);
        }
    }

    @Test
    public void getAllJobApps_whenGivenInvalidToken_shouldReturnFailure() {
        final String token = getWrongErrorToken();
        final String baseURL = JobControllerIntTestHelperVars.baseGetAllJobAppsURL;
        final String getAllJobAppsURL = JobControllerIntTestHelperVars.createGetJobAppsURL(baseURL, token);
        final GetJobAppsResponse errorResp = GetJobAppsResponse.builder()
                .statusCode(HttpStatus.FORBIDDEN.value())
                .errorType(ErrorType.OTHER)
                .errorMessage(ErrorMessages.OtherMessages.unexpectedError)
                .jobApps(new ArrayList<>())
                .build();
        try {
            final String response = getAllJobAppsResponse(getAllJobAppsURL, jsonMediaType);
            final GetJobAppsResponse actual = JobControllerIntTestHelperVars.getJobAppsResponse(response);
            JobApplicationIntTestHelper.assertGetAllJobAppsResponseAreEqual(actual, errorResp);
        } catch (Exception e) {
            JobApplicationIntTestHelper.logErrorAndFail(e);
        }
    }

    @Test
    public void getNewJobApps_whenGivenValidToken_shouldReturnSuccess() {
        final String token = addJobAppRequest.getToken();
        final String baseURL = JobControllerIntTestHelperVars.baseGetNewJobAppsURL;
        final ZonedDateTime dateLastChecked = JobControllerIntTestHelperVars.minDate;
        final String getNewJobAppsURL = JobControllerIntTestHelperVars.createGetNewJobAppsURL(baseURL, token,
                dateLastChecked, DateTimeFormatter.ISO_INSTANT);
        final GetJobAppsResponse expectedResp = GetJobAppsResponse.builder()
                .statusCode(HttpStatus.OK.value())
                .errorType(ErrorType.NONE)
                .errorMessage("")
                .jobApps(new ArrayList<>(List.of(JobControllerIntTestHelperVars.uuidJobApp)))
                .build();
        try {
            final String response = getAllJobAppsResponse(getNewJobAppsURL, jsonMediaType);
            final GetJobAppsResponse actual = JobControllerIntTestHelperVars.getJobAppsResponse(response);
            JobApplicationIntTestHelper.assertGetAllJobAppsResponseAreEqual(actual, expectedResp);
        } catch (Exception e) {
            JobApplicationIntTestHelper.logErrorAndFail(e);
        }
    }

    @Test
    public void getNewJobApps_whenGivenTokenThatIsExpired_ShouldReturnFailure()  {
        final String token = getWrongErrorToken();
        final String baseURL = JobControllerIntTestHelperVars.baseGetNewJobAppsURL;
        final ZonedDateTime dateLastChecked = JobControllerIntTestHelperVars.jan1_3000;
        final String getNewJobAppsURL = JobControllerIntTestHelperVars.createGetNewJobAppsURL(baseURL, token
                , dateLastChecked, DateTimeFormatter.ISO_INSTANT);
        final GetJobAppsResponse expectedResp = GetJobAppsResponse.builder()
                .statusCode(HttpStatus.FORBIDDEN.value())
                .errorType(ErrorType.OTHER)
                .errorMessage(ErrorMessages.OtherMessages.unexpectedError)
                .jobApps(new ArrayList<>())
                .build();
        try {
            final String response = getAllJobAppsResponse(getNewJobAppsURL, jsonMediaType);
            final GetJobAppsResponse actual = JobControllerIntTestHelperVars.getJobAppsResponse(response);
            JobApplicationIntTestHelper.assertGetAllJobAppsResponseAreEqual(actual, expectedResp);
        } catch (Exception e) {
            JobApplicationIntTestHelper.logErrorAndFail(e);
        }
    }

    @Test
    public void getNewJobApps_whenGivenWrongDateFormat_ShouldReturnFailure()  {
        final String token = getWrongErrorToken();
        final String baseURL = JobControllerIntTestHelperVars.baseGetNewJobAppsURL;
        final ZonedDateTime dateLastChecked = JobControllerIntTestHelperVars.jan1_3000;
        final String getNewJobAppsURL = JobControllerIntTestHelperVars.createGetNewJobAppsURL(baseURL, token
                , dateLastChecked, DateTimeFormatter.ISO_ZONED_DATE_TIME);
        final GetJobAppsResponse expectedResp = GetJobAppsResponse.builder()
                .statusCode(HttpStatus.FORBIDDEN.value())
                .errorType(ErrorType.OTHER)
                .errorMessage(ErrorMessages.OtherMessages.unexpectedError)
                .jobApps(new ArrayList<>())
                .build();
        try {
            final String response = getAllJobAppsResponse(getNewJobAppsURL, jsonMediaType);
            final GetJobAppsResponse actual = JobControllerIntTestHelperVars.getJobAppsResponse(response);
            JobApplicationIntTestHelper.assertGetAllJobAppsResponseAreEqual(actual, expectedResp);
        } catch (Exception e) {
            JobApplicationIntTestHelper.logErrorAndFail(e);
        }
    }

    @Test
    public void deleteJobApp_whenGivenValidToken_shouldReturnSuccess() {
        final String token = addJobAppRequest.getToken();
        final UUID id = JobControllerIntTestHelperVars.uuidJobApp.getId();

        final String deleteURL = JobControllerIntTestHelperVars.createDeleteJobAppURL(
                JobControllerIntTestHelperVars.baseDeleteJobAppsURL, token, id
        );

        final DeleteJobAppResponse expected = DeleteJobAppResponse.builder()
                .errorType(ErrorType.NONE)
                .statusCode(HttpStatus.OK.value())
                .errorMessage("")
                .build();

        try {
            final DeleteJobAppResponse actual = getDeleteJobAppResponse(deleteURL, jsonMediaType);
            JobAppControllerTestHelper.assertDeleteResponsesAreEqual(expected, actual);
        } catch (Exception e) {
            JobApplicationIntTestHelper.logErrorAndFail(e);
        }
    }

    @Test
    public void deleteJobApp_whenGivenInvalidToken_shouldReturnForbidden() {
        final String token = getWrongErrorToken();
        final UUID id = JobControllerIntTestHelperVars.uuidJobApp.getId();

        final DeleteJobAppResponse expected = DeleteJobAppResponse.builder()
                .errorType(ErrorType.OTHER)
                .errorMessage(ErrorMessages.OtherMessages.unexpectedError)
                .statusCode(HttpStatus.FORBIDDEN.value())
                .build();

        final String deleteURL = JobControllerIntTestHelperVars.createDeleteJobAppURL(
                JobControllerIntTestHelperVars.baseDeleteJobAppsURL, token, id
        );

        try {
            final DeleteJobAppResponse actual = getDeleteJobAppResponse(deleteURL, jsonMediaType);
            JobAppControllerTestHelper.assertDeleteResponsesAreEqual(expected, actual);
        } catch (Exception e) {
            JobApplicationIntTestHelper.logErrorAndFail(e);
        }
    }
}