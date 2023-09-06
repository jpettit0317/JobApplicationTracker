package com.jpettit.jobapplicationbackend.helpertests;

import com.jpettit.jobapplicationbackend.helpers.SpringDataConverter;
import com.jpettit.jobapplicationbackend.helpers.helper.SpringDataConverterHelperHelper;
import com.jpettit.jobapplicationbackend.helpers.helpervars.SpringDataConverterHelperVars;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterviewData;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class SpringDataConverterTest {

    @Test
    public void convertJobInterviewToData_whenPassingInJobAppWithNoJobInterview_ShouldReturnEmpty() {
        final JobApplication jobApp = SpringDataConverterHelperVars.noInterviewJobApp;

        final ArrayList<JobInterviewData> expected = new ArrayList<>();
        final ArrayList<JobInterviewData> actual = SpringDataConverter.convertJobInterviewToData(
                jobApp.getInterviews(),
                jobApp.getId()
        );

        SpringDataConverterHelperHelper.assertArrayListsAreEqual(actual, expected);
    }
    @Test
    public void convertJobInterviewToData_whenPassingInJobAppWithJobInterview_ShouldReturnJobAppData() {
        final JobApplication jobApp = SpringDataConverterHelperVars.jobApp;

        final ArrayList<JobInterviewData> expected = SpringDataConverterHelperVars.convertJobInterviewToData(
                SpringDataConverterHelperVars.jobInterviews,
                jobApp.getId()
        );
        final ArrayList<JobInterviewData> actual = SpringDataConverter.convertJobInterviewToData(
                jobApp.getInterviews(),
                jobApp.getId()
        );

        SpringDataConverterHelperHelper.assertArrayListsAreEqual(actual, expected);
    }
}