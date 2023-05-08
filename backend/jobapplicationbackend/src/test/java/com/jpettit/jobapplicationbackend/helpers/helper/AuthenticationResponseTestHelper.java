package com.jpettit.jobapplicationbackend.helpers.helper;

import com.jpettit.jobapplicationbackend.helpers.helper.helperpair.HelperPair;
import static org.junit.jupiter.api.Assertions.*;

public class AuthenticationResponseTestHelper {
    public static void assertStringsAreEqual(HelperPair<String> pair, final String errorMessageStart) {
        final String errorMessage = getErrorMessage(errorMessageStart, pair);
        assertEquals(pair.getExpected(), pair.getActual(), errorMessage);
    }

    private static String getErrorMessage(String errorMessageHeader, HelperPair<String>
                                  pair) {
        final String expected = "expected " + pair.getExpected() + " but got ";
        final String actual = pair.getActual() + " instead.";
        return errorMessageHeader + expected + actual;
    }
}
