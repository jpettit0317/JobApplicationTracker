package com.jpettit.jobapplicationbackend.helpers.helper;

import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterview;
import com.jpettit.jobapplicationbackend.staticVars.JobAppTimeZone;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class JobApplicationTestVars {
    public static final ZoneId utcZone = ZoneId.of(JobAppTimeZone.UTC);
    public static final ZonedDateTime jan1_1970 = ZonedDateTime.of(1970, 1, 1,
            0, 0, 0, 0, utcZone);

    public static final ZonedDateTime today = ZonedDateTime.of(LocalDateTime.now(), utcZone);
    public static final JobInterview jobInterview = JobInterview.builder()
            .id(UUID.randomUUID())
            .jobAppId(UUID.randomUUID())
            .type("Technical")
            .location("Online")
            .startDate(today)
            .endDate(today)
            .build();

    public static final JobInterview jobInterview1970 = JobInterview.builder()
            .id(UUID.randomUUID())
            .jobAppId(UUID.randomUUID())
            .type("Technical")
            .location("Online")
            .startDate(jan1_1970)
            .endDate(jan1_1970)
            .build();



    public static JobApplication noInterviewJobApp = JobApplication.builder()
            .company("Google")
            .jobTitle("Junior Web Developer")
            .description("")
            .status("Pending")
            .id(UUID.randomUUID())
            .dateApplied(today)
            .dateModified(today)
            .interviews(new ArrayList<>())
            .build();

    public static JobApplication oneInterviewJobApp = JobApplication.builder()
            .company("Google")
            .jobTitle("Junior Web Developer")
            .description("")
            .status("Pending")
            .id(UUID.randomUUID())
            .dateApplied(jan1_1970)
            .dateModified(jan1_1970)
            .interviews(new ArrayList<JobInterview>(List.of(jobInterview)))
            .build();

    public static JobApplication invalidJobApp = JobApplication.builder()
            .company("Google")
            .jobTitle("Junior Web Developer")
            .description("")
            .status("Pending")
            .id(UUID.randomUUID())
            .dateApplied(today)
            .dateModified(today)
            .interviews(new ArrayList<JobInterview>(List.of(jobInterview1970)))
            .build();



    public static String getIsJobAppValidErrorMessage(JobApplication jobApp, boolean expected, boolean actual) {
        return jobApp.toString() +
                " should return " +
                expected +
                "but got " + actual + " instead.";
    }
}
