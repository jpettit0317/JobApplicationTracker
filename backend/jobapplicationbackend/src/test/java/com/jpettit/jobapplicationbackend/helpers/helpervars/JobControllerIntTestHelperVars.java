package com.jpettit.jobapplicationbackend.helpers.helpervars;

import com.jayway.jsonpath.JsonPath;
import com.jpettit.jobapplicationbackend.enums.Role;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterview;
import com.jpettit.jobapplicationbackend.models.requests.RegisterRequest;
import com.jpettit.jobapplicationbackend.models.responses.AddJobAppResponse;
import com.jpettit.jobapplicationbackend.models.user.User;
import com.jpettit.jobapplicationbackend.staticVars.Routes;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class JobControllerIntTestHelperVars {
    public static final User userJane = User.builder()
            .firstname("Jane")
            .lastname("Doe")
            .email("noname@email.com")
            .password("password94_")
            .role(Role.USER)
            .id(1L)
            .build();

    public static final User userJon = User.builder()
            .firstname("Jon")
            .lastname("Doe")
            .email("jondoe@email.com")
            .password("password94_")
            .role(Role.USER)
            .id(2L)
            .build();

    public static final String addJobAppURL = Routes.BaseRoutes.mainRoute + Routes.PostRoutes.addJobApp;
    public static final String addUserURL = Routes.BaseRoutes.authBaseRoute + Routes.PostRoutes.register;

    public static final RegisterRequest validRegisterRequest =
            RegisterRequest.builder()
                    .email(userJane.getEmail())
                    .firstname(userJane.getFirstname())
                    .lastname(userJane.getLastname())
                    .password(userJane.getPassword())
                    .build();


    public static final JobApplication noInterviewJobApp = JobApplication.builder()
            .company("Google")
            .jobTitle("Junior Web Developer")
            .description("")
            .status("Pending")
            .id(UUID.randomUUID())
            .dateApplied(new Date())
            .dateModified(new Date())
            .interviews(new ArrayList<>())
            .build();

    private static final UUID oneInterviewJobAppId = UUID.randomUUID();
    public static JobApplication oneInterviewJobApp = JobApplication.builder()
            .company("Google")
            .jobTitle("Junior Web Developer")
            .description("")
            .status("Pending")
            .id(oneInterviewJobAppId)
            .dateApplied(new Date(0L))
            .dateModified(new Date(0L))
            .interviews(new ArrayList<JobInterview>(List.of(JobInterview.builder()
                            .id(UUID.randomUUID())
                            .jobAppId(oneInterviewJobAppId)
                            .type("Technical")
                            .location("Online")
                            .startDate(new Date(0L))
                            .endDate(new Date(1L))
                    .build())))
            .build();

    public static String getTokenFromResponse(String input) {
        return JsonPath.read(input, "$.token");
    }

    public static AddJobAppResponse getResponseFromString(final String input) {
        final String errorMessage = JsonPath.read(input, "$.errorMessage");
        final String errorType = JsonPath.read(input, "$.errorType");
        final int statusCode = JsonPath.read(input, "$.statusCode");

        return AddJobAppResponse.builder()
                .errorMessage(errorMessage)
                .errorType(errorType)
                .statusCode(statusCode)
                .build();
    }
}
