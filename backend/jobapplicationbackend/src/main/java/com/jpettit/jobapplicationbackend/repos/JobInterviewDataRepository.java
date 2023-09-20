package com.jpettit.jobapplicationbackend.repos;

import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterview;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterviewData;
import com.jpettit.jobapplicationbackend.staticVars.DatabaseFields;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface JobInterviewDataRepository extends JpaRepository<JobInterviewData, UUID> {
    Optional<JobInterviewData> findJobInterviewDataById(UUID id);

    long countByJobAppId(
            @Param(DatabaseFields.JobInterviewFields.jobAppId) UUID jobAppId);

    void removeByJobAppId(
            @Param(DatabaseFields.JobInterviewFields.jobAppId) UUID jobAppId);
}
