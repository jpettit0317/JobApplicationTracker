package com.jpettit.jobapplicationbackend.helpers.helper;

import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterviewData;
import org.junit.jupiter.api.Assertions;

import java.util.ArrayList;

public class SpringDataConverterHelperHelper {

    public static void assertArrayListsAreEqual(ArrayList<JobInterviewData> actual, ArrayList<JobInterviewData> expected) {
        Assertions.assertEquals(expected.size(), actual.size(), "Arrays aren't equal");
        Assertions.assertEquals(expected, actual, "Arrays are not equal");
    }

}
