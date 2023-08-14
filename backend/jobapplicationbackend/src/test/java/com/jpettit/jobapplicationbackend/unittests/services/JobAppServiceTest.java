package com.jpettit.jobapplicationbackend.unittests.services;

import com.jpettit.jobapplicationbackend.enums.ErrorType;
import com.jpettit.jobapplicationbackend.helpers.SpringDataConverter;
import com.jpettit.jobapplicationbackend.helpers.helpervars.JobApplicationTestTestVars;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobAppData;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterviewData;
import com.jpettit.jobapplicationbackend.models.requests.AddJobAppRequest;
import com.jpettit.jobapplicationbackend.models.responses.AddJobAppResponse;
import com.jpettit.jobapplicationbackend.models.user.User;
import com.jpettit.jobapplicationbackend.repos.JobAppDataRepository;
import com.jpettit.jobapplicationbackend.repos.JobInterviewDataRepository;
import com.jpettit.jobapplicationbackend.repos.UserRepository;
import com.jpettit.jobapplicationbackend.services.JobAppService;
import com.jpettit.jobapplicationbackend.services.JwtService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

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
                .errorMessage("Token expired.")
                .statusCode(HttpStatus.NOT_FOUND.value())
                .errorType(ErrorType.OTHER)
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
}