package com.jpettit.jobapplicationbackend.helpers.helpervars;

import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterview;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterviewData;
import com.jpettit.jobapplicationbackend.staticVars.JobAppTimeZone;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class SpringDataConverterHelperVars {
    private static final UUID jobAppId = UUID.randomUUID();
    private static final ZoneId utcZone = ZoneId.of(JobAppTimeZone.UTC);
    private static final ZonedDateTime maxDate = ZonedDateTime.of(2000, 1, 1,
            1, 0, 0, 0, utcZone);
    private static final ZonedDateTime minDate = ZonedDateTime.of(1970, 1, 1,
            1, 0, 0, 0, utcZone);
    private static final JobInterview jobInterview = JobInterview.builder()
            .endDate(maxDate)
            .startDate(maxDate)
            .location("Online")
            .type("Technical")
            .jobAppId(jobAppId)
            .id(UUID.randomUUID())
            .build();
    public static JobApplication jobApp = JobApplication.builder()
            .jobTitle("Junior Web Developer")
            .status("Pending")
            .dateApplied(minDate)
            .dateModified(minDate)
            .description("")
            .company("Edward Jones")
            .id(jobAppId)
            .interviews(new ArrayList<>(List.of(jobInterview)))
            .build();

    public static JobApplication noInterviewJobApp = JobApplication.builder()
            .jobTitle("Junior Java Developer")
            .status("Pending")
            .dateApplied(minDate)
            .dateModified(minDate)
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
