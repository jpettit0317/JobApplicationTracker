package com.jpettit.jobapplicationbackend.helpers.helpervars;

import com.jayway.jsonpath.JsonPath;
import com.jpettit.jobapplicationbackend.enums.Role;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobAppData;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterview;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterviewData;
import com.jpettit.jobapplicationbackend.models.requests.RegisterRequest;
import com.jpettit.jobapplicationbackend.models.responses.AddJobAppResponse;
import com.jpettit.jobapplicationbackend.models.responses.GetJobAppsResponse;
import com.jpettit.jobapplicationbackend.models.user.User;
import com.jpettit.jobapplicationbackend.staticVars.JobAppTimeZone;
import com.jpettit.jobapplicationbackend.staticVars.Routes;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class JobControllerIntTestHelperVars {
    private static final UUID id = UUID.randomUUID();
    private static final ZoneId utcZone = ZoneId.of(JobAppTimeZone.UTC);

    public static final ZonedDateTime maxDate = ZonedDateTime.of(2000, 1, 1, 0,
            1, 1, 1, utcZone);

    public static final ZonedDateTime jan1_3000 = ZonedDateTime.of(3000, 1, 1, 0,
            1, 1, 1, utcZone);
    public static final ZonedDateTime minDate = ZonedDateTime.of(1970, 1, 1, 0,
            1, 1, 1, utcZone);

    public static final ZonedDateTime today = ZonedDateTime.now();
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

    public static final String baseGetAllJobAppsURL = Routes.BaseRoutes.mainRoute + Routes.GetRoutes.getAllJobApps;
    public static final String baseGetNewJobAppsURL = Routes.BaseRoutes.mainRoute + Routes.GetRoutes.getNewJobApps;

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
            .dateApplied(minDate)
            .dateModified(minDate)
            .interviews(new ArrayList<>())
            .build();

    private static final UUID oneInterviewJobAppId = UUID.randomUUID();
    public static JobApplication oneInterviewJobApp = JobApplication.builder()
            .company("Google")
            .jobTitle("Junior Web Developer")
            .description("")
            .status("Pending")
            .id(oneInterviewJobAppId)
            .dateApplied(minDate)
            .dateModified(minDate)
            .interviews(new ArrayList<JobInterview>(List.of(JobInterview.builder()
                            .id(UUID.randomUUID())
                            .jobAppId(oneInterviewJobAppId)
                            .type("Technical")
                            .location("Online")
                            .startDate(maxDate)
                            .endDate(maxDate)
                    .build())))
            .build();

    public static final JobInterview uuidJobInterview = JobInterview.builder()
            .id(UUID.randomUUID())
            .jobAppId(id)
            .type(UUID.randomUUID().toString())
            .location(UUID.randomUUID().toString())
            .startDate(maxDate)
            .endDate(maxDate)
            .build();

    public static final JobApplication uuidJobApp = JobApplication.builder()
            .jobTitle(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString())
            .company(UUID.randomUUID().toString())
            .status(UUID.randomUUID().toString())
            .id(id)
            .dateModified(maxDate)
            .interviews(new ArrayList<>(List.of(uuidJobInterview)))
            .build();

    public static JobAppData getJobAppDataFromJobApp(JobApplication jobApplication, final String creator) {
        return JobAppData.initFromJobApp(jobApplication, creator);
    }

    public static JobInterviewData getJobInterviewDataFromJobInterview(JobInterview jobInterview) {
        return JobInterviewData.initFromInterview(jobInterview, jobInterview.getJobAppId());
    }

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

    public static GetJobAppsResponse getJobAppsResponse(String input) {
        final String errorMessage = JsonPath.read(input, "$.errorMessage");
        final String errorType = JsonPath.read(input, "$.errorType");
        final int statusCode = JsonPath.read(input, "$.statusCode");
        final ArrayList<JobApplication> jobApps = JsonPath.read(input, "$.jobApps");

        return GetJobAppsResponse.builder()
                .jobApps(jobApps)
                .errorType(errorType)
                .statusCode(statusCode)
                .errorMessage(errorMessage)
                .build();
    }

    public static String createGetJobAppsURL(final String url, final String token) {
        return url +
                "?token=" +
                token;
    }

    public static String createGetNewJobAppsURL(final String url, final String token,
                                                final ZonedDateTime dateLastChecked,
                                                final DateTimeFormatter formatter) {
        final String dateLastCheckedString = dateLastChecked.format(formatter);
        return url +
                "?token=" +
                token + "&" +
                "lastDateChecked=" + dateLastCheckedString;
    }
}
