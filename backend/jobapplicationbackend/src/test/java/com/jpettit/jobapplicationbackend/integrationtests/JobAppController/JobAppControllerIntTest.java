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
import com.jpettit.jobapplicationbackend.models.responses.GetOneJobAppResponse;
import com.jpettit.jobapplicationbackend.models.user.User;
import com.jpettit.jobapplicationbackend.repos.JobAppDataRepository;
import com.jpettit.jobapplicationbackend.repos.JobInterviewDataRepository;
import com.jpettit.jobapplicationbackend.repos.UserRepository;
import com.jpettit.jobapplicationbackend.services.JwtService;
import com.jpettit.jobapplicationbackend.staticVars.ErrorMessages;
import org.json.JSONObject;
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

import java.time.Instant;
import java.time.ZoneId;
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

    private JobAppData jobAppData;

    private JobInterviewData jobInterviewData;

    @BeforeEach
    void setUp() {
        addJobAppRequest = AddJobAppRequest.builder().build();
        addUserToDatabase();
        addJobAppToDatabase();
    }

    @AfterEach
    void tearDown() {
        addJobAppRequest = null;
        jobAppData = null;
        jobInterviewData = null;
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
            final String registerResponse = getTokenFromPost(registerRequestString);
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
            final JobAppData jobAppData1 = JobAppData.builder()
                    .jobAppDataId(UUID.randomUUID())
                    .creator(user.getEmail())
                    .jobTitle("j")
                    .status("s")
                    .company("c")
                    .description("d")
                    .dateModified(ZonedDateTime.ofInstant(Instant.now(), ZoneId.of("UTC")))
                    .dateApplied(ZonedDateTime.ofInstant(Instant.now(), ZoneId.of("UTC")))
                    .build();
            final JobInterviewData jobInterviewData1 = JobInterviewData.builder()
                    .id(UUID.randomUUID())
                    .location("Online")
                    .type("Technical")
                    .jobAppId(jobAppData1.getJobAppDataId())
                    .startDate(ZonedDateTime.now())
                    .endDate(ZonedDateTime.now())
                    .build();

            saveJobAppData(jobAppData1, jobInterviewData1);
        } catch (Exception e) {
            JobApplicationIntTestHelper.logErrorAndFail(e);
        }
    }

    private void saveJobAppData(final JobAppData jobAppData, final JobInterviewData interviewData) {
        this.jobAppData = getJobAppData(jobAppDataRepository.save(jobAppData));

        final JobInterviewData data = JobInterviewData.builder()
                .id(interviewData.getId())
                .jobAppId(this.jobAppData.getJobAppDataId())
                .startDate(interviewData.getStartDate())
                .endDate(interviewData.getEndDate())
                .location(interviewData.getLocation())
                .type(interviewData.getType())
                .build();
        setJobInterview(jobInterviewDataRepository.save(data));
    }

    private JobAppData getJobAppData(JobAppData jobApp) {
        final ZoneId UTC = ZoneId.of("UTC");
        final ZonedDateTime newDateApplied = ZonedDateTime.ofInstant(jobApp
                .getDateApplied().toInstant(), UTC);
        final ZonedDateTime newDateModified = ZonedDateTime.ofInstant(jobApp
                .getDateModified().toInstant(), UTC);

        return JobAppData.builder()
                .jobAppDataId(jobApp.getJobAppDataId())
                .jobTitle(jobApp.getJobTitle())
                .creator(jobApp.getCreator())
                .dateApplied(newDateApplied)
                .dateModified(newDateModified)
                .description(jobApp.getDescription())
                .company(jobApp.getCompany())
                .status(jobApp.getStatus())
                .build();
    }

    private void setJobInterview(JobInterviewData data) {
        final ZoneId UTC = ZoneId.of("UTC");
        final ZonedDateTime startDate = ZonedDateTime.ofInstant(data
                .getStartDate().toInstant(), UTC);
        final ZonedDateTime endDate = ZonedDateTime.ofInstant(data
                .getEndDate().toInstant(), UTC);

        this.jobInterviewData = JobInterviewData.builder()
                .jobAppId(data.getJobAppId())
                .type(data.getType())
                .location(data.getLocation())
                .id(data.getId())
                .startDate(startDate)
                .endDate(endDate)
                .build();
    }

    private RegisterRequest createRegisterRequest(final User user) {
        return RegisterRequest.builder()
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .password(user.getPassword())
                .build();
    }
    private String getAddJobAppResponseFromPost(final String content) throws Exception {
        return mockMvc.perform(post(JobControllerIntTestHelperVars.addJobAppURL)
                        .accept(jsonMediaType)
                        .contentType(jsonMediaType)
                        .content(content))
                .andReturn().getResponse().getContentAsString();
    }

    private String getTokenFromPost(final String content) throws Exception {
        return mockMvc.perform(post(JobControllerIntTestHelperVars.addUserURL)
                .accept(jsonMediaType)
                .contentType(jsonMediaType)
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

    private GetOneJobAppResponse getOneJobAppResponse(final String url) throws Exception {
        System.out.println("Before get");
        final String resp = mockMvc.perform(get(url).accept(jsonMediaType)).andReturn().getResponse().getContentAsString();
        System.out.println("After get " + resp);
        final JSONObject respObject = new JSONObject(resp);
        return JobControllerIntTestHelperVars.getOneJobAppResponse(respObject);
    }
    @Test
    public void addUser_whenPassedInNoInterviewJobApp_ShouldReturnCreated() {
        try {
            addJobAppRequest.setJobApp(JobControllerIntTestHelperVars.noInterviewJobApp);
            final String addJobAppRequestString = addJobAppRequest.toJSONString();
            final String response = getAddJobAppResponseFromPost(
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

    @Test
    public void getOneJobApp_whenGivenIdThatDoesnotExist_shouldReturnNotFound() {
        final UUID id = UUID.randomUUID();
        final String token = addJobAppRequest.getToken();

        final String getOneJobAppURL = JobControllerIntTestHelperVars
                .createGetJobAppById(JobControllerIntTestHelperVars
                        .baseGetOneJobAppURL, token, id);

        final GetOneJobAppResponse expected = GetOneJobAppResponse.builder()
                .jobApp(null)
                .errorMessage(ErrorMessages.OtherMessages.jobAppDoesnotExistError)
                .statusCode(HttpStatus.NOT_FOUND.value())
                .errorType(ErrorType.OTHER)
                .build();

        try {
            final GetOneJobAppResponse actual = getOneJobAppResponse(getOneJobAppURL);
            JobAppControllerTestHelper.assertGetOneJobAppErrorResponsesAreEqual(expected, actual);
        } catch (Exception e) {
            JobApplicationIntTestHelper.logErrorAndFail(e);
        }
    }

//    @Test
//    public void getOneJobApp_whenGivenValidRequest_shouldReturnSuccess() {
//        final String token = addJobAppRequest.getToken();
//        final ArrayList<JobInterviewData> interviewData = new ArrayList<>(List.of(this.jobInterviewData));
//        final GetOneJobAppResponse expected = GetOneJobAppResponse.builder()
//                .errorMessage("")
//                .statusCode(HttpStatus.OK.value())
//                .errorType(ErrorType.NONE)
//                .jobApp(
//                        JobApplication.builder()
//                                .jobTitle(this.jobAppData.getJobTitle())
//                                .description(this.jobAppData.getDescription())
//                                .company(this.jobAppData.getCompany())
//                                .status(this.jobAppData.getStatus())
//                                .dateApplied(this.jobAppData.getDateApplied())
//                                .dateModified(this.jobAppData.getDateModified())
//                                .id(this.jobAppData.getJobAppDataId())
//                                .interviews(createJobInterviews(interviewData))
//                                .build()
//                 )
//                .build();
//
//        final UUID id = this.jobAppData.getJobAppDataId();
//        final String getOneJobAppURL = JobControllerIntTestHelperVars
//                .createGetJobAppById(JobControllerIntTestHelperVars
//                        .baseGetOneJobAppURL, token, id);
//
//        try {
//            final GetOneJobAppResponse actual = getOneJobAppResponse(getOneJobAppURL);
//            JobAppControllerTestHelper
//                    .assertGetOneJobAppResponsesAreEqual(expected, actual);
//        } catch (Exception e) {
//            JobApplicationIntTestHelper.logErrorAndFail(e);
//        }
//    }

    private ArrayList<JobInterview> createJobInterviews(ArrayList<JobInterviewData> data) {
        ArrayList<JobInterview> jobInterviews = new ArrayList<>();

        for (JobInterviewData i : data) {
            jobInterviews.add(
                    JobInterview.builder()
                            .jobAppId(jobAppData.getJobAppDataId())
                            .type(i.getType())
                            .location(i.getLocation())
                            .id(i.getId())
                            .startDate(i.getStartDate())
                            .endDate(i.getEndDate())
                            .build()
            );
        }

        return jobInterviews;
    }
}