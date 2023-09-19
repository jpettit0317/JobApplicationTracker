package com.jpettit.jobapplicationbackend.models.pairs;

import com.jpettit.jobapplicationbackend.models.jobapplication.JobAppData;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterview;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterviewData;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.UUID;

@Builder
@AllArgsConstructor
@Data
public class JobAppPair {
    private JobAppData jobAppData;
    private ArrayList<JobInterviewData> jobInterviews;

    public static JobAppPair initFromJobApp(final JobApplication jobApp, final String username) {
        final JobAppData data = convertJobAppToData(jobApp, username);
        final ArrayList<JobInterviewData> interviews = convertJobInterviewsToData(
                jobApp.getInterviews(), jobApp.getId());

        return JobAppPair.builder()
                .jobAppData(data)
                .jobInterviews(interviews)
                .build();
    }

    private static JobAppData convertJobAppToData(final JobApplication jobApp, final String user) {
        return JobAppData.builder()
                .company(jobApp.getCompany())
                .jobTitle(jobApp.getJobTitle())
                .description(jobApp.getDescription())
                .status(jobApp.getStatus())
                .creator(user)
                .dateApplied(jobApp.getDateApplied())
                .dateModified(jobApp.getDateModified())
                .jobAppDataId(jobApp.getId())
                .build();
    }

    private static ArrayList<JobInterviewData> convertJobInterviewsToData(
            ArrayList<JobInterview> interviews, final UUID jobAppId) {
        ArrayList<JobInterviewData> dataInterviews = new ArrayList<>();

        for (JobInterview i : interviews) {
            final JobInterviewData data = JobInterviewData.builder()
                    .id(i.getId())
                    .jobAppId(jobAppId)
                    .type(i.getType())
                    .location(i.getLocation())
                    .startDate(i.getStartDate())
                    .endDate(i.getEndDate())
                    .build();
            dataInterviews.add(data);
        }

        return dataInterviews;
    }
}
