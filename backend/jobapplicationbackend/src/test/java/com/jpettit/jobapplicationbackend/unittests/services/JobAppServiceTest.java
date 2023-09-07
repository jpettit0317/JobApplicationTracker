package com.jpettit.jobapplicationbackend.unittests.services;

import com.jpettit.jobapplicationbackend.enums.ErrorType;
import com.jpettit.jobapplicationbackend.enums.Role;
import com.jpettit.jobapplicationbackend.exceptions.TokenExpiredException;
import com.jpettit.jobapplicationbackend.helpers.SpringDataConverter;
import com.jpettit.jobapplicationbackend.helpers.helper.helperpair.HelperPair;
import com.jpettit.jobapplicationbackend.helpers.helper.helperpair.JobAppServiceTestHelper;
import com.jpettit.jobapplicationbackend.helpers.helpervars.JobApplicationTestTestVars;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobAppData;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterviewData;
import com.jpettit.jobapplicationbackend.models.requests.AddJobAppRequest;
import com.jpettit.jobapplicationbackend.models.requests.GetNewJobAppRequest;
import com.jpettit.jobapplicationbackend.models.responses.AddJobAppResponse;
import com.jpettit.jobapplicationbackend.models.responses.GetJobAppsResponse;
import com.jpettit.jobapplicationbackend.models.user.User;
import com.jpettit.jobapplicationbackend.repos.JobAppDataRepository;
import com.jpettit.jobapplicationbackend.repos.JobInterviewDataRepository;
import com.jpettit.jobapplicationbackend.repos.UserRepository;
import com.jpettit.jobapplicationbackend.services.JobAppService;
import com.jpettit.jobapplicationbackend.services.JwtService;
import com.jpettit.jobapplicationbackend.staticVars.ErrorMessages;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class JobAppServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private JobInterviewDataRepository jobInterviewDataRepository;

    @Mock
    private JobAppDataRepository jobAppDataRepository;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private JobAppService sut;

    /*
    Error tests
     */
    @Test
    public void addJobApp_whenDateIsExpired_ShouldReturnError() {
        final AddJobAppRequest req = JobApplicationTestTestVars.validRequest;

        when(jwtService.isTokenExpired(req.getToken())).thenReturn(true);

        final AddJobAppResponse actualResponse = sut.addJobApp(req);
        final AddJobAppResponse expectedResponse = AddJobAppResponse.builder()
                .errorMessage(ErrorMessages.OtherMessages.tokenExpiredError)
                .statusCode(HttpStatus.FORBIDDEN.value())
                .errorType(ErrorType.TOKEN_EXPIRED)
                .build();

        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    public void addJobApp_whenUsernameIsNotFound_ShouldReturnError() {
        final AddJobAppRequest req = JobApplicationTestTestVars.validRequest;

        when(userRepository.findByEmail(ArgumentMatchers.any())).thenReturn(Optional.empty());

        final AddJobAppResponse actualResponse = sut.addJobApp(req);
        final AddJobAppResponse expectedResponse = AddJobAppResponse.builder()
                .errorMessage("Something went wrong!!")
                .statusCode(HttpStatus.NOT_FOUND.value())
                .errorType(ErrorType.OTHER)
                .build();

        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    public void addJobApp_whenJobAppIsValid_thenShouldReturnSuccess() {
        final AddJobAppRequest req = JobApplicationTestTestVars.validRequest;
        final JobAppData dataJobApp = JobAppData.initFromJobApp(req.getJobApp(), "noname@email.com");
        final List<JobInterviewData> dataInterviews = List.of(JobInterviewData.initFromInterview(req.getJobApp().getInterviews().get(0), req.getJobApp().getId()));

        when(jwtService.isTokenExpired(req.getToken())).thenReturn(false);
        when(userRepository.findByEmail(ArgumentMatchers.any())).thenReturn(Optional.of(User.builder().build()));
        when(jwtService.extractUsername(ArgumentMatchers.any())).thenReturn("noname@email.com");
        when(jobAppDataRepository.save(ArgumentMatchers.any())).thenReturn(dataJobApp);
        when(jobInterviewDataRepository.saveAll(ArgumentMatchers.any())).thenReturn(dataInterviews);

        final AddJobAppResponse actualResponse = sut.addJobApp(req);
        final AddJobAppResponse expectedResponse = AddJobAppResponse.builder()
                .errorMessage("")
                .errorType(ErrorType.NONE)
                .statusCode(HttpStatus.CREATED.value())
                .build();

        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    public void getAllJobApps_whenPassedExpiredToken_ShouldReturnFailure() {
        final String token = UUID.randomUUID().toString();

        when(jwtService.isTokenExpired(ArgumentMatchers.anyString())).thenReturn(true);

        final GetJobAppsResponse expected = GetJobAppsResponse.builder()
                .jobApps(new ArrayList<>())
                .errorType(ErrorType.TOKEN_EXPIRED)
                .statusCode(HttpStatus.FORBIDDEN.value())
                .errorMessage(ErrorMessages.OtherMessages.tokenExpiredError)
                .build();
        final GetJobAppsResponse actual = sut.getAllJobApps(token);

        assertEquals(expected, actual);
    }

    @Test
    public void getAllJobApps_whenPassedInNonExistingUser_shouldReturnFailure() {
        final String token = JobApplicationTestTestVars.getUUID();

        when(jwtService.isTokenExpired(ArgumentMatchers.anyString())).thenReturn(false);
        when(jwtService.extractUsername(token)).thenReturn("email@email.com");
        when(userRepository.findByEmail(ArgumentMatchers.anyString())).thenReturn(Optional.empty());

        final GetJobAppsResponse actual = sut.getAllJobApps(token);
        final GetJobAppsResponse expected = GetJobAppsResponse.builder()
                .errorMessage(ErrorMessages.OtherMessages.unexpectedError)
                .jobApps(new ArrayList<>())
                .statusCode(HttpStatus.NOT_FOUND.value())
                .errorType(ErrorType.OTHER)
                .build();
        final HelperPair<GetJobAppsResponse> pair = HelperPair.<GetJobAppsResponse>builder()
                .expected(expected)
                .actual(actual)
                .build();

        JobAppServiceTestHelper.assertGetJobAppsAreEqual(pair);
    }

    @Test
    public void getAllJobApps_whenPassedValidUser_shouldReturnSuccess() {
        final String token = JobApplicationTestTestVars.getUUID();
        final Optional<User> user = Optional.of(JobApplicationTestTestVars.user);
        final GetJobAppsResponse expected = JobApplicationTestTestVars.succesfullGetAllJobAppsResp;
        final ArrayList<JobAppData> dataJobApps = JobApplicationTestTestVars.convertJobAppToData(expected.getJobApps(), user.get().getEmail());

        when(jwtService.isTokenExpired(ArgumentMatchers.anyString())).thenReturn(false);
        when(jwtService.extractUsername(ArgumentMatchers.anyString())).thenReturn(user.get().getEmail());
        when(userRepository.findByEmail(ArgumentMatchers.anyString())).thenReturn(user);
        when(jobAppDataRepository.findByCreator(ArgumentMatchers.anyString())).thenReturn(dataJobApps);

        final GetJobAppsResponse actual = sut.getAllJobApps(token);

        HelperPair<GetJobAppsResponse> pair = HelperPair.<GetJobAppsResponse>builder()
                .actual(actual)
                .expected(expected)
                .build();

        JobAppServiceTestHelper.assertGetJobAppsAreEqual(pair);
    }

    @Test
    public void getNewJobApps_whenGivenValidData_shouldReturnSuccess() {
        final String token = JobApplicationTestTestVars.getUUID();
        final Optional<User> user = Optional.of(JobApplicationTestTestVars.user);
        final GetJobAppsResponse expected = JobApplicationTestTestVars.succesfullGetAllJobAppsResp;
        final ArrayList<JobAppData> dataJobApps = JobApplicationTestTestVars.convertJobAppToData(expected.getJobApps(), user.get().getEmail());

        when(jwtService.isTokenExpired(ArgumentMatchers.anyString())).thenReturn(false);
        when(jwtService.extractUsername(ArgumentMatchers.anyString())).thenReturn(user.get().getEmail());
        when(userRepository.findByEmail(ArgumentMatchers.anyString())).thenReturn(user);
        when(jobAppDataRepository.findByDateModifiedAfter(ArgumentMatchers.any())).thenReturn(dataJobApps);
        final GetNewJobAppRequest req = GetNewJobAppRequest.builder()
                .lastChecked(JobApplicationTestTestVars.minDate)
                .token(token)
                .build();
        final GetJobAppsResponse actual = sut.getNewJobApps(req);

        HelperPair<GetJobAppsResponse> pair = HelperPair.<GetJobAppsResponse>builder()
                .actual(actual)
                .expected(expected)
                .build();

        JobAppServiceTestHelper.assertGetJobAppsAreEqual(pair);
    }


}