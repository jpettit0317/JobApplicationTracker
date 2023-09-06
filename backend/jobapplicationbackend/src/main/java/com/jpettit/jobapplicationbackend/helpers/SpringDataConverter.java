package com.jpettit.jobapplicationbackend.helpers;

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
}
