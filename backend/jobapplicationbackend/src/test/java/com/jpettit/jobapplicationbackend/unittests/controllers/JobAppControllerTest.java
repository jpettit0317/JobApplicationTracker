package com.jpettit.jobapplicationbackend.unittests.controllers;

import com.jpettit.jobapplicationbackend.controllers.JobAppController;
import com.jpettit.jobapplicationbackend.enums.ErrorType;
import com.jpettit.jobapplicationbackend.helpers.helper.JobAppControllerTestHelper;
import com.jpettit.jobapplicationbackend.helpers.helper.helperpair.HelperPair;
import com.jpettit.jobapplicationbackend.helpers.helpervars.JobApplicationTestTestVars;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import com.jpettit.jobapplicationbackend.models.requests.AddJobAppRequest;
import com.jpettit.jobapplicationbackend.models.requests.EditJobAppRequest;
import com.jpettit.jobapplicationbackend.models.requests.GetOneJobAppRequest;
import com.jpettit.jobapplicationbackend.models.responses.*;
import com.jpettit.jobapplicationbackend.services.JobAppService;
import com.jpettit.jobapplicationbackend.staticVars.ErrorMessages;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.*;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@RunWith(MockitoJUnitRunner.class)
class JobAppControllerTest {

    @Mock
    private JobAppService jobAppService;

    @InjectMocks
    private JobAppController sut;

    private AddJobAppRequest addJobAppRequest;

    @BeforeEach
    public void setUp() {
        addJobAppRequest = AddJobAppRequest.builder().build();
    }

    @AfterEach
    public void tearDown() {
        addJobAppRequest = null;
    }

    @Test
    public void addJobApp_whenPassedInExpiredToken_shouldReturnError()  {
        addJobAppRequest = JobApplicationTestTestVars.validRequest;
        final ResponseEntity<AddJobAppResponse> expectedResponse =
                new ResponseEntity<>(JobApplicationTestTestVars.expiredTokenResponse, HttpStatus.OK);

        when(jobAppService.addJobApp(addJobAppRequest)).thenReturn(expectedResponse.getBody());

        final ResponseEntity<AddJobAppResponse> actualResponse = sut.addJobApp(addJobAppRequest);
        final HelperPair<ResponseEntity<AddJobAppResponse>> pair = HelperPair
                .<ResponseEntity<AddJobAppResponse>>builder()
                .expected(expectedResponse)
                .actual(actualResponse)
                .build();

        JobAppControllerTestHelper.assertResponsesAreEqual(pair);
    }

    @Test
    public void addJobApp_whenPassedInUserThatDoesntExist_shouldReturnError()  {
        addJobAppRequest = JobApplicationTestTestVars.validRequest;
        final ResponseEntity<AddJobAppResponse> expectedResponse =
                new ResponseEntity<>(JobApplicationTestTestVars.userDoesnotExistResponse, HttpStatus.OK);

        when(jobAppService.addJobApp(addJobAppRequest)).thenReturn(expectedResponse.getBody());

        final ResponseEntity<AddJobAppResponse> actualResponse = sut.addJobApp(addJobAppRequest);
        final HelperPair<ResponseEntity<AddJobAppResponse>> pair = HelperPair
                .<ResponseEntity<AddJobAppResponse>>builder()
                .expected(expectedResponse)
                .actual(actualResponse)
                .build();

        JobAppControllerTestHelper.assertResponsesAreEqual(pair);
    }

    @Test
    public void addJobApp_whenPassedValidRequest_shouldReturnSuccess()  {
        addJobAppRequest = JobApplicationTestTestVars.validRequest;
        final ResponseEntity<AddJobAppResponse> expectedResponse =
                new ResponseEntity<>(JobApplicationTestTestVars.successAddResponse, HttpStatus.OK);
        when(jobAppService.addJobApp(addJobAppRequest)).thenReturn(expectedResponse.getBody());

        final ResponseEntity<AddJobAppResponse> actualResponse = sut.addJobApp(addJobAppRequest);
        final HelperPair<ResponseEntity<AddJobAppResponse>> pair = HelperPair
                .<ResponseEntity<AddJobAppResponse>>builder()
                .expected(expectedResponse)
                .actual(actualResponse)
                .build();
        JobAppControllerTestHelper.assertResponsesAreEqual(pair);
    }

    /*
    Get Tests
     */

    @Test
    public void getAllJobApps_whenPassedValidRequest_shouldReturnSuccess() {
        final ResponseEntity<GetJobAppsResponse> expectedResponse = ResponseEntity.ok(
               createGetJobAppsResponse("", ErrorType.NONE, HttpStatus.OK.value(), new ArrayList<>())
        );

        when(jobAppService.getAllJobApps(ArgumentMatchers.anyString())).thenReturn(expectedResponse.getBody());
        final ResponseEntity<GetJobAppsResponse> actualResp = sut.getAllJobApps(UUID.randomUUID().toString());
        final HelperPair<ResponseEntity<GetJobAppsResponse>> pair =
                HelperPair.<ResponseEntity<GetJobAppsResponse>>builder()
                .actual(expectedResponse)
                .expected(actualResp)
                .build();

        JobAppControllerTestHelper.assertGetJobAppsResponsesAreEqual(pair);
    }

    @Test
    public void getAllJobApps_whenPassedValidRequest_shouldReturnFailure() {
        final RuntimeException e = new RuntimeException(ErrorMessages.OtherMessages.unexpectedError);
        final ResponseEntity<GetJobAppsResponse> expectedResponse =
                createJobAppsResponse(createGetJobAppsResponse(ErrorMessages.OtherMessages.unexpectedError, ErrorType.OTHER,
                                HttpStatus.NOT_FOUND.value(), new ArrayList<>()));

        when(jobAppService.getAllJobApps(ArgumentMatchers.anyString())).thenThrow(e);
        final ResponseEntity<GetJobAppsResponse> actualResp = sut.getAllJobApps(UUID.randomUUID().toString());

        HelperPair<ResponseEntity<GetJobAppsResponse>> pair = HelperPair
                .<ResponseEntity<GetJobAppsResponse>>builder()
                .actual(actualResp)
                .expected(expectedResponse)
                .build();

        JobAppControllerTestHelper.assertGetJobAppsResponsesAreEqual(pair);
    }

    @Test
    public void getNewJobApps_whenGivenValidRequest_shouldReturnSuccess() {
        final ResponseEntity<GetJobAppsResponse> expectedResponse = ResponseEntity.ok(
                createGetJobAppsResponse("", ErrorType.NONE, HttpStatus.OK.value(), new ArrayList<>())
        );

        when(jobAppService.getNewJobApps(ArgumentMatchers.any())).thenReturn(expectedResponse.getBody());

        final ResponseEntity<GetJobAppsResponse> actualResp = sut.getNewJobApps(UUID.randomUUID().toString(), "2023-09-15T23:04:45.418Z");
        final HelperPair<ResponseEntity<GetJobAppsResponse>> pair = HelperPair
                .<ResponseEntity<GetJobAppsResponse>>builder()
                .expected(expectedResponse)
                .actual(actualResp)
                .build();

        JobAppControllerTestHelper.assertGetJobAppsResponsesAreEqual(pair);
    }

    @Test
    public void deleteJobApp_whenGivenValidRequest_shouldReturnSuccess() {
        final DeleteJobAppResponse expected = DeleteJobAppResponse.builder()
                .statusCode(HttpStatus.OK.value())
                .errorMessage("")
                .errorType(ErrorType.NONE)
                .build();

        when(jobAppService.deleteJobApp(ArgumentMatchers.any(), ArgumentMatchers.anyString())).thenReturn(expected);

        final DeleteJobAppResponse actual = callDeleteJobApp(UUID.randomUUID(), UUID.randomUUID().toString());

        JobAppControllerTestHelper.assertDeleteResponsesAreEqual(expected, actual);
    }

    @Test
    public void getOneJobAppById_whenGivenValidRequest_shouldReturnSuccess() {
        final JobApplication jobApp = JobApplication.builder()
                .jobTitle("Entry Level Software Engineer")
                .company("US Bank")
                .status("Accepted")
                .interviews(new ArrayList<>())
                .description("")
                .dateModified(ZonedDateTime.ofInstant(Instant.now(), ZoneId.of("UTC")))
                .dateApplied(ZonedDateTime.ofInstant(Instant.now(), ZoneId.of("UTC")))
                .build();
        final GetOneJobAppResponse expectedResponse = GetOneJobAppResponse.builder()
                .jobApp(jobApp)
                .errorType(ErrorType.NONE)
                .statusCode(HttpStatus.OK.value())
                .errorMessage("")
                .build();

        final GetOneJobAppRequest req = GetOneJobAppRequest.builder()
                .token(UUID.randomUUID().toString())
                .id(UUID.randomUUID())
                .build();

        when(jobAppService.getJobAppById(ArgumentMatchers.any())).thenReturn(expectedResponse);

        final GetOneJobAppResponse actual = sut.getJobAppById(req.getId().toString(), req.getToken());

        JobAppControllerTestHelper.assertGetOneJobAppResponsesAreEqual(expectedResponse, actual);
    }

    @Test
    public void getOneJobAppById_whenThrows_shouldReturnForbidden() {
        final GetOneJobAppResponse expected = GetOneJobAppResponse.builder()
                .jobApp(null)
                .errorType(ErrorType.OTHER)
                .statusCode(HttpStatus.FORBIDDEN.value())
                .errorMessage(ErrorMessages.OtherMessages.unexpectedError)
                .build();

        final GetOneJobAppRequest req = GetOneJobAppRequest.builder()
                .token(UUID.randomUUID().toString())
                .id(UUID.randomUUID())
                .build();

        when(jobAppService.getJobAppById(ArgumentMatchers.any())).thenReturn(expected);

        final GetOneJobAppResponse actual = sut.getJobAppById(req.getId().toString(), req.getToken());

        JobAppControllerTestHelper.assertGetOneJobAppErrorResponsesAreEqual(expected, actual);
    }

    @Test
    public void editJobApp_whenValidRequestIsPassedIn_ShouldReturnSuccess() {
        final EditJobAppResponse expectedResponse = EditJobAppResponse.builder()
                .statusCode(HttpStatus.OK.value())
                .errorType(ErrorType.NONE)
                .errorMessage("")
                .build();

        final EditJobAppRequest req = EditJobAppRequest.builder()
                .token(UUID.randomUUID().toString())
                .updatedJobApp(JobApplication.builder().build())
                .build();

        when(jobAppService.editJobApp(ArgumentMatchers.any())).thenReturn(expectedResponse);

        final EditJobAppResponse actualResponse = sut.editJobApp(req);

        JobAppControllerTestHelper.assertEditJobAppResponsesAreEqual(expectedResponse, actualResponse);
    }

    private DeleteJobAppResponse callDeleteJobApp(UUID id, String token) {
        return sut.deleteJobApp(id.toString(), token);
    }

    private static GetJobAppsResponse createGetJobAppsResponse(String error, String errorType,
                                                                      int statusCode, ArrayList<JobApplication> jobApps) {
        return GetJobAppsResponse.builder()
                .errorMessage(error)
                .jobApps(jobApps)
                .statusCode(statusCode)
                .errorType(errorType)
                .build();
    }

    private static ResponseEntity<GetJobAppsResponse> createJobAppsResponse(final GetJobAppsResponse resp) {
        return new ResponseEntity<>(resp, HttpStatus.NOT_FOUND);
    }
}