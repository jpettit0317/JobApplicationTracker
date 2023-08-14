package com.jpettit.jobapplicationbackend.helpers.helpervars;

import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterview;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterviewData;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class SpringDataConverterHelperVars {
    private static final UUID jobAppId = UUID.randomUUID();
    private static final JobInterview jobInterview = JobInterview.builder()
            .endDate(new Date(1L))
            .startDate(new Date(1L))
            .location("Online")
            .type("Technical")
            .jobAppId(jobAppId)
            .id(UUID.randomUUID())
            .build();
    public static JobApplication jobApp = JobApplication.builder()
            .jobTitle("Junior Web Developer")
            .status("Pending")
            .dateApplied(new Date(0L))
            .dateModified(new Date(0L))
            .description("")
            .company("Edward Jones")
            .id(jobAppId)
            .interviews(new ArrayList<>(List.of(jobInterview)))
            .build();

    public static JobApplication noInterviewJobApp = JobApplication.builder()
            .jobTitle("Junior Java Developer")
            .status("Pending")
            .dateApplied(new Date(0L))
            .dateModified(new Date(0L))
            .description("")
            .company("Edward Jones")
            .id(jobAppId)
            .interviews(new ArrayList<>())
            .build();

    public static final ArrayList<JobInterview> jobInterviews = new ArrayList<>(List.of(jobInterview));
    public static ArrayList<JobInterviewData> convertJobInterviewToData(ArrayList<JobInterview> list, UUID id) {
       ArrayList<JobInterviewData> data = new ArrayList<>();

       for (JobInterview interview : list) {
           data.add(JobInterviewData.initFromInterview(interview, id));
       }

       return data;
    }
}
