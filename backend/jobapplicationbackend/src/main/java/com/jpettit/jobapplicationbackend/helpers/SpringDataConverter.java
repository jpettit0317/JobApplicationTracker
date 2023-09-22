package com.jpettit.jobapplicationbackend.helpers;

import com.jpettit.jobapplicationbackend.models.jobapplication.JobAppData;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterview;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterviewData;
import java.util.ArrayList;
import java.util.UUID;

public class SpringDataConverter {
    public static ArrayList<JobInterviewData> convertJobInterviewToData(ArrayList<JobInterview> interviews
            ,final UUID jobAppId) {
        ArrayList<JobInterviewData> dataInterviews = new ArrayList<>();

        for (JobInterview interview : interviews) {
            final JobInterviewData dataInterview = JobInterviewData.initFromInterview(interview, jobAppId);
            dataInterviews.add(dataInterview);
        }

        return dataInterviews;
    }

    public static ArrayList<JobApplication> convertJobAppDataToJobApps(final ArrayList<JobAppData> dataJobApps) {
        ArrayList<JobApplication> jobApps = new ArrayList<>();

        for (JobAppData i : dataJobApps) {
            jobApps.add(convertJobAppDataToJobApp(i));
        }

        return jobApps;
    }

    private static JobApplication convertJobAppDataToJobApp(final JobAppData dataJobApp) {
        return JobApplication.builder()
                .id(dataJobApp.getJobAppDataId())
                .jobTitle(dataJobApp.getJobTitle())
                .dateApplied(dataJobApp.getDateApplied())
                .company(dataJobApp.getCompany())
                .status(dataJobApp.getStatus())
                .description("")
                .interviews(new ArrayList<>())
                .dateModified(dataJobApp.getDateModified())
                .build();
    }

    public static JobInterview convertJobInterviewDataToJobInterview(JobInterviewData interviewData) {
        return JobInterview.builder()
                .type(interviewData.getType())
                .id(interviewData.getId())
                .jobAppId(interviewData.getJobAppId())
                .startDate(interviewData.getStartDate())
                .endDate(interviewData.getEndDate())
                .location(interviewData.getLocation())
                .build();
    }

    public static JobApplication createJobAppFromJobInterviewDataAndJobAppData(JobAppData dataJobApp, ArrayList<JobInterviewData> jobInterviewData) {
        ArrayList<JobInterview> jobInterviews = new ArrayList<>();

        for (JobInterviewData i : jobInterviewData) {
            jobInterviews.add(convertJobInterviewDataToJobInterview(i));
        }

        return JobApplication.builder()
                .company(dataJobApp.getCompany())
                .dateApplied(dataJobApp.getDateApplied())
                .jobTitle(dataJobApp.getJobTitle())
                .interviews(jobInterviews)
                .dateModified(dataJobApp.getDateModified())
                .description(dataJobApp.getDescription())
                .status(dataJobApp.getStatus())
                .id(dataJobApp.getJobAppDataId())
                .build();
    }
}
