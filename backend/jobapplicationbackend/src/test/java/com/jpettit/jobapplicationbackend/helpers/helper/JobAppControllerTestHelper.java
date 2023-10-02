package com.jpettit.jobapplicationbackend.helpers.helper;

import com.jpettit.jobapplicationbackend.helpers.helper.helperpair.HelperPair;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterview;
import com.jpettit.jobapplicationbackend.models.responses.AddJobAppResponse;
import com.jpettit.jobapplicationbackend.models.responses.DeleteJobAppResponse;
import com.jpettit.jobapplicationbackend.models.responses.GetJobAppsResponse;
import com.jpettit.jobapplicationbackend.models.responses.GetOneJobAppResponse;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
public class JobAppControllerTestHelper {
    public static void assertResponsesAreEqual(HelperPair<ResponseEntity<AddJobAppResponse>> pair) {
        assertEquals(pair.getExpected(), pair.getActual());
    }

    public static void assertGetJobAppsResponsesAreEqual(HelperPair<ResponseEntity<GetJobAppsResponse>> pair) {
        assertEquals(pair.getExpected(), pair.getActual());
    }

    public static void assertDeleteResponsesAreEqual(DeleteJobAppResponse expected, DeleteJobAppResponse actual) {
        assertEquals(expected, actual);
    }

    public static void assertGetOneJobAppResponsesAreEqual(GetOneJobAppResponse expected, GetOneJobAppResponse actual) {
        assertEquals(expected.getStatusCode(), actual.getStatusCode());
        assertEquals(expected.getErrorMessage(), actual.getErrorMessage());
        assertEquals(expected.getErrorType(), actual.getErrorType());
        assertJobAppsAreEqual(expected.getJobApp(), actual.getJobApp());
    }

    public static void assertGetOneJobAppErrorResponsesAreEqual(GetOneJobAppResponse expected, GetOneJobAppResponse actual) {
        assertEquals(expected.getStatusCode(), actual.getStatusCode());
        assertEquals(expected.getErrorMessage(), actual.getErrorMessage());
        assertEquals(expected.getErrorType(), actual.getErrorType());
        assertNull(expected.getJobApp());
        assertNull(actual.getJobApp());
    }

    private static void assertJobAppsAreEqual(JobApplication expected, JobApplication actual) {
        final String errorMessage = getJobAppErrorMessage(actual, expected);

        assertEquals(expected.getJobTitle(), actual.getJobTitle(), errorMessage);
        assertEquals(expected.getCompany(), actual.getCompany(), errorMessage);
        assertEquals(expected.getStatus(), actual.getStatus(), errorMessage);
        assertEquals(expected.getDateApplied(), actual.getDateApplied(), errorMessage);
        assertEquals(expected.getDateModified(), actual.getDateModified(), errorMessage);
        assertEquals(expected.getDescription(), actual.getDescription(), errorMessage);
        assertJobInterviewsAreEqual(expected.getInterviews(), actual.getInterviews());
    }

    private static void assertJobInterviewsAreEqual(ArrayList<JobInterview> expected, ArrayList<JobInterview> actual) {
        final int expectedSize = expected.size();
        final int actualSize = actual.size();
        final String sizeErrorMessage = getJobInterviewSizeErrorMessage(expectedSize, actualSize);

        assertEquals(expectedSize, actualSize, sizeErrorMessage);

        for (int i = 0; i < expected.size(); i++) {
            final JobInterview actualInterview = actual.get(i);
            final JobInterview expectedInterview = expected.get(i);
            final String errorMessage = getJobInterviewErrorMessage(actualInterview, expectedInterview);
            assertEquals(expectedInterview, actualInterview, errorMessage);
        }
    }

    public static String getJobAppErrorMessage(final JobApplication actualJobApp, final JobApplication expectedJobApp) {
        return "Expected " + expectedJobApp.toJSONString() + " got " + actualJobApp.toJSONString() + " instead.";
    }

    public static String getJobInterviewErrorMessage(final JobInterview actualJobInterview,
                                                     final JobInterview expectedJobInterview) {
        return "Expected " + expectedJobInterview.toJSONString()
                + " got " + actualJobInterview.toJSONString() + " instead.";
    }

    public static String getJobInterviewSizeErrorMessage(final int expectedSize, final int actualSize) {
        return "Expected " + expectedSize + " got " + actualSize + " instead.";
    }
}
