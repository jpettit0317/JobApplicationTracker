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
        assertEquals(expected.getJobTitle(), actual.getJobTitle());
        assertEquals(expected.getCompany(), actual.getCompany());
        assertEquals(expected.getStatus(), actual.getStatus());
        assertEquals(expected.getDateApplied(), actual.getDateApplied());
        assertEquals(expected.getDateModified(), actual.getDateModified());
        assertEquals(expected.getDescription(), actual.getDescription());
        assertJobInterviewsAreEqual(expected.getInterviews(), actual.getInterviews());
    }

    private static void assertJobInterviewsAreEqual(ArrayList<JobInterview> expected, ArrayList<JobInterview> actual) {
        assertEquals(expected.size(), actual.size());
        for (int i = 0; i < expected.size(); i++) {
            assertEquals(expected.get(i), actual.get(i));
        }
    }
    public static String getOneJobAppResponsesErrorMessages(GetOneJobAppResponse expected, GetOneJobAppResponse actual) {
        return "Expected " + expected.toJSONString() + " got " + actual.toJSONString() + " instead.";
    }
}
