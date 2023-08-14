package com.jpettit.jobapplicationbackend.helpers.helper;

import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterview;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class JobApplicationTestVars {
    public static final Date jan1_1970 = new Date(0L);
    public static final JobInterview jobInterview = JobInterview.builder()
            .id(UUID.randomUUID())
            .jobAppId(UUID.randomUUID())
            .type("Technical")
            .location("Online")
            .startDate(new Date())
            .endDate(new Date())
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
            .dateApplied(new Date())
            .dateModified(new Date())
            .interviews(new ArrayList<>())
            .build();

    public static JobApplication oneInterviewJobApp = JobApplication.builder()
            .company("Google")
            .jobTitle("Junior Web Developer")
            .description("")
            .status("Pending")
            .id(UUID.randomUUID())
            .dateApplied(new Date(0L))
            .dateModified(new Date(0L))
            .interviews(new ArrayList<JobInterview>(List.of(jobInterview)))
            .build();

    public static JobApplication invalidJobApp = JobApplication.builder()
            .company("Google")
            .jobTitle("Junior Web Developer")
            .description("")
            .status("Pending")
            .id(UUID.randomUUID())
            .dateApplied(new Date())
            .dateModified(new Date())
            .interviews(new ArrayList<JobInterview>(List.of(jobInterview1970)))
            .build();



    public static String getIsJobAppValidErrorMessage(JobApplication jobApp, boolean expected, boolean actual) {
        return jobApp.toString() +
                " should return " +
                expected +
                "but got " + actual + " instead.";
    }


}
