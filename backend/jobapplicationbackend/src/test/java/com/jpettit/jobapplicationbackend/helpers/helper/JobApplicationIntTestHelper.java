package com.jpettit.jobapplicationbackend.helpers.helper;

import com.jpettit.jobapplicationbackend.models.responses.AddJobAppResponse;

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

    public static String getErrorMessage(AddJobAppResponse actual, AddJobAppResponse expected) {
        return "Expected " + expected.toString() + " but got " + expected.toString() + " instead.";
    }
}
