package com.jpettit.jobapplicationbackend.unittests.models;

import com.jpettit.jobapplicationbackend.helpers.helper.JobApplicationTestVars;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JobApplicationTest {
    private JobApplication sut;
    @BeforeEach
    void setUp() {
        sut = JobApplication.builder().build();
    }

    @AfterEach
    void tearDown() {
        sut = null;
    }

    @Test
    void isJobAppValid_whenJobAppIsValid_ShouldReturnTrue() {
        sut = JobApplicationTestVars.noInterviewJobApp;
        final boolean actual = sut.isJobAppValid();
        final String errorMessage =
                JobApplicationTestVars.getIsJobAppValidErrorMessage(sut, true, actual);
        assertTrue(actual, errorMessage);
    }

    @Test
    void isJobAppValid_whenPassedJobAppWithInterviewBeforeAppliedDate_shouldReturnFalse() {
        sut = JobApplicationTestVars.invalidJobApp;
        final boolean actual = sut.isJobAppValid();
        final String errorMessage =
                JobApplicationTestVars.getIsJobAppValidErrorMessage(sut, false, actual);
        assertFalse(actual, errorMessage);
    }

    @Test
    void isJobAppValid_whenPassedJobAppWithOneInterview_shouldReturnTrue() {
        sut = JobApplicationTestVars.oneInterviewJobApp;
        final boolean actual = sut.isJobAppValid();
        final String errorMessage =
                JobApplicationTestVars.getIsJobAppValidErrorMessage(sut, true, actual);
        assertTrue(actual, errorMessage);
    }
}