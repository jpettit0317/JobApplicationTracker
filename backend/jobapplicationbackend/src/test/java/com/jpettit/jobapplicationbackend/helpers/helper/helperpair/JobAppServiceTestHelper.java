package com.jpettit.jobapplicationbackend.helpers.helper.helperpair;

import com.jpettit.jobapplicationbackend.helpers.DateConverter;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterview;
import com.jpettit.jobapplicationbackend.models.responses.GetJobAppsResponse;
import com.jpettit.jobapplicationbackend.staticVars.JobAppTimeZone;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.TimeZone;

import static org.junit.jupiter.api.Assertions.*;
public class JobAppServiceTestHelper {
    public static void assertGetJobAppsAreEqual(HelperPair<GetJobAppsResponse> pair) {
        compareInterviews(pair);
        assertEquals(pair.getExpected().getStatusCode(), pair.getActual().getStatusCode());
        assertEquals(pair.getExpected().getErrorMessage(), pair.getActual().getErrorMessage());
        assertEquals(pair.getExpected().getErrorType(), pair.getActual().getErrorType());
    }

    private static void compareInterviews(HelperPair<GetJobAppsResponse> pair) {
        final int actualSize = pair.getExpected().getJobApps().size();
        final int expectedSize = pair.getActual().getJobApps().size();

        if (!areSizesEqual(actualSize, expectedSize)) {
            fail("JobApp sizes are not equal");
        }

        for (int i = 0; i < actualSize; i++) {
            final JobApplication a = pair.getActual().getJobApps().get(i);
            final JobApplication e = pair.getExpected().getJobApps().get(i);

            assertEquals(e.getStatus(), a.getStatus());
            assertEquals(e.getJobTitle(), a.getJobTitle());
            assertEquals(e.getCompany(), a.getCompany());
            assertEquals(e.getDateApplied(), a.getDateApplied());
        }
    }

    private static LocalDateTime convertToUTC(LocalDateTime date, TimeZone timeZone) {
        return DateConverter.convertDateToLocalTimezone(date, timeZone);
    }

    private static boolean areSizesEqual(int actual, int expected) {
        return actual == expected;
    }
}
