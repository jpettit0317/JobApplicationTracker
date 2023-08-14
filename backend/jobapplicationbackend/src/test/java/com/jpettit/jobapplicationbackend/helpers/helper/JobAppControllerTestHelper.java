package com.jpettit.jobapplicationbackend.helpers.helper;

import com.jpettit.jobapplicationbackend.helpers.helper.helperpair.HelperPair;
import com.jpettit.jobapplicationbackend.models.responses.AddJobAppResponse;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
public class JobAppControllerTestHelper {
    public static void assertResponsesAreEqual(HelperPair<ResponseEntity<AddJobAppResponse>> pair) {
        assertEquals(pair.getExpected(), pair.getActual());
    }
}
