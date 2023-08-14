package com.jpettit.jobapplicationbackend.unittests.controllers;

import com.jpettit.jobapplicationbackend.controllers.JobAppController;
import com.jpettit.jobapplicationbackend.helpers.helper.JobAppControllerTestHelper;
import com.jpettit.jobapplicationbackend.helpers.helper.helperpair.HelperPair;
import com.jpettit.jobapplicationbackend.helpers.helpervars.JobApplicationTestTestVars;
import com.jpettit.jobapplicationbackend.models.requests.AddJobAppRequest;
import com.jpettit.jobapplicationbackend.models.responses.AddJobAppResponse;
import com.jpettit.jobapplicationbackend.services.JobAppService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
}