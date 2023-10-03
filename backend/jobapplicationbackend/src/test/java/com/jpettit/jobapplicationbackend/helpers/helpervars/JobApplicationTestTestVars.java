package com.jpettit.jobapplicationbackend.helpers.helpervars;

import com.jpettit.jobapplicationbackend.enums.ErrorType;
import com.jpettit.jobapplicationbackend.enums.Role;
import com.jpettit.jobapplicationbackend.helpers.DateConverter;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobAppData;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterview;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterviewData;
import com.jpettit.jobapplicationbackend.models.requests.AddJobAppRequest;
import com.jpettit.jobapplicationbackend.models.responses.AddJobAppResponse;
import com.jpettit.jobapplicationbackend.models.responses.GetJobAppsResponse;
import com.jpettit.jobapplicationbackend.models.user.User;
import com.jpettit.jobapplicationbackend.staticVars.JobAppTimeZone;
import org.springframework.http.HttpStatus;

import java.time.*;
import java.util.*;

public class JobApplicationTestTestVars {
    private static final ZoneId utcZone = ZoneId.of(JobAppTimeZone.UTC);

    public static final ZonedDateTime maxDate = ZonedDateTime.of(2000, 1, 1, 0,
            1, 1, 1, utcZone);

    public static final ZonedDateTime minDate = ZonedDateTime.of(1970, 1, 1, 0,
            1, 1, 1, utcZone);

    public static final ZonedDateTime today = ZonedDateTime.now();
    private static final UUID validId = UUID.randomUUID();
    private static final JobInterview jobInterview = JobInterview.builder()
            .type("Technical")
            .jobAppId(validId)
            .id(UUID.randomUUID())
            .startDate(today)
            .endDate(today)
            .location("Online")
            .build();
    public static final JobApplication jobApp = JobApplication.builder()
            .jobTitle("iOS Developer")
            .company("Edward Jones")
            .status("Pending")
            .description("")
            .dateModified(today)
            .dateApplied(today)
            .interviews(new ArrayList<>(List.of(jobInterview)))
            .id(validId)
            .build();

    public static final JobApplication jobApp2 = JobApplication.builder()
            .jobTitle("iOS Developer")
            .company("Google")
            .status("Accepted")
            .description("")
            .dateApplied(today)
            .dateModified(today)
            .build();

    public static final JobApplication jobApp3 = JobApplication.builder()
            .jobTitle("Junior Web Developer")
            .company("Facebook")
            .status("Accepted")
            .description("")
            .dateApplied(today)
            .dateModified(today)
            .build();

    public static User user = User.builder()
                    .id(1L)
                    .firstname("Emilia")
                    .lastname("Kent")
                    .password("password94_")
                    .role(Role.USER)
                    .email("namename@email.com")
                    .build();

    public static final ArrayList<JobApplication> jobApps = new ArrayList<>(List.of(jobApp2, jobApp3));
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

    public static final GetJobAppsResponse succesfullGetAllJobAppsResp = GetJobAppsResponse.builder()
            .errorMessage("")
            .jobApps(jobApps)
            .statusCode(HttpStatus.OK.value())
            .errorType(ErrorType.NONE)
            .build();

    public static GetJobAppsResponse createGetJobAppsResponse(String error, String errorType,
                                                                    int statusCode, ArrayList<JobApplication> jobApps) {
        return GetJobAppsResponse.builder()
                .errorMessage(error)
                .jobApps(jobApps)
                .statusCode(statusCode)
                .errorType(errorType.toString())
                .build();
    }

    public static ArrayList<JobAppData> convertJobAppToData(
            ArrayList<JobApplication> jobApps, String creator) {
        ArrayList<JobAppData> data = new ArrayList<>();

        for (JobApplication i : jobApps) {
            final JobAppData d = JobAppData.initFromJobApp(i, creator);
            data.add(d);
        }
        return data;
    }

    public static  String getUUID() {
        return UUID.randomUUID().toString();
    }

    public static Optional<User> createUser(final String email,
                                            final String firstname,
                                            final String lastname,
                                            final Role role,
                                            final String password,
                                            final Long id) {
        return Optional.of(User.builder()
                        .email(email)
                        .lastname(lastname)
                        .firstname(firstname)
                        .role(role)
                        .password(password)
                        .id(id).build());
    }

    public static JobAppData getJobAppData(JobApplication jobApp, final String creator) {
        return createJobAppData(jobApp, creator);
    }

    public static JobAppData createJobAppData(JobApplication jobApp, final String creator) {
        return JobAppData.builder()
                .company(jobApp.getCompany())
                .jobTitle(jobApp.getJobTitle())
                .description(jobApp.getDescription())
                .status(jobApp.getStatus())
                .creator(creator)
                .dateApplied(jobApp.getDateApplied())
                .dateModified(jobApp.getDateModified())
                .jobAppDataId(jobApp.getId())
                .build();

    }
    public static ArrayList<JobInterviewData> getJobInterviewData(UUID id, ArrayList<JobInterview> jobInterviews) {
        ArrayList<JobInterviewData> jobInterviewData = new ArrayList<>();

        for (JobInterview i : jobInterviews) {
            jobInterviewData.add(JobInterviewData.initFromInterview(i, id));
        }

        return jobInterviewData;
    }
    public static LocalDateTime convertToLocalTimezone(LocalDateTime date, TimeZone timeZone) {
        return DateConverter.convertDateToLocalTimezone(date, timeZone);
    }
}
