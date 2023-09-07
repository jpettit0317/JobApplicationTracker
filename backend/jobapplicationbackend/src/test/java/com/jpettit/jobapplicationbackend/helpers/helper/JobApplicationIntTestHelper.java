package com.jpettit.jobapplicationbackend.helpers.helper;

import com.jpettit.jobapplicationbackend.models.responses.AddJobAppResponse;
import com.jpettit.jobapplicationbackend.models.responses.GetJobAppsResponse;

import static org.junit.jupiter.api.Assertions.*;

public class JobApplicationIntTestHelper {
    public static void logErrorAndFail(Exception e) {
        System.out.println(e.getMessage());
        e.printStackTrace();
        fail(e.getMessage());
    }

    public static void assertResponsesAreEqual(AddJobAppResponse actual, AddJobAppResponse expected) {
        final String errorMessage = getErrorMessage(actual, expected);
        assertEquals(expected, actual, errorMessage);
    }

    public static void assertGetAllJobAppsResponseAreEqual(GetJobAppsResponse actual, GetJobAppsResponse expected) {
        final String errorMessage = getErrorMessageFromGetAllJobApps(actual, expected);
    }

    public static String getErrorMessage(AddJobAppResponse actual, AddJobAppResponse expected) {
        return "Expected " + expected.toString() + " but got " + expected.toString() + " instead.";
    }

    public static String getErrorMessageFromGetAllJobApps(GetJobAppsResponse actual, GetJobAppsResponse expected) {
        return "Expected " + expected.toJSONString() + " but got " + expected.toJSONString() + " instead.";
    }
}
