package com.jpettit.jobapplicationbackend.helpers.helpervars;

import com.jpettit.jobapplicationbackend.enums.ErrorType;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterview;
import com.jpettit.jobapplicationbackend.models.requests.AddJobAppRequest;
import com.jpettit.jobapplicationbackend.models.responses.AddJobAppResponse;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class JobApplicationTestTestVars {
    private static final UUID validId = UUID.randomUUID();
    private static final JobInterview jobInterview = JobInterview.builder()
            .type("Technical")
            .jobAppId(validId)
            .id(UUID.randomUUID())
            .startDate(new Date())
            .endDate(new Date())
            .location("Online")
            .build();
    public static final JobApplication jobApp = JobApplication.builder()
            .jobTitle("iOS Developer")
            .company("Edward Jones")
            .status("Pending")
            .description("")
            .dateModified(new Date())
            .dateApplied(new Date())
            .interviews(new ArrayList<>(List.of(jobInterview)))
            .id(validId)
            .build();
    public static final AddJobAppRequest validRequest = AddJobAppRequest.builder()
            .jobApp(jobApp)
            .token(UUID.randomUUID().toString())
            .build();

    public static final AddJobAppResponse expiredTokenResponse = AddJobAppResponse.builder()
            .errorMessage("Token expired.")
            .statusCode(HttpStatus.NOT_FOUND.value())
            .errorType(ErrorType.OTHER)
            .build();

    public static final AddJobAppResponse userDoesnotExistResponse = AddJobAppResponse.builder()
            .errorMessage("Something went wrong!!")
            .statusCode(HttpStatus.NOT_FOUND.value())
            .errorType(ErrorType.OTHER)
            .build();

    public static final AddJobAppResponse successAddResponse = AddJobAppResponse.builder()
            .errorMessage("")
            .errorType(ErrorType.NONE)
            .statusCode(HttpStatus.CREATED.value())
            .build();
}
