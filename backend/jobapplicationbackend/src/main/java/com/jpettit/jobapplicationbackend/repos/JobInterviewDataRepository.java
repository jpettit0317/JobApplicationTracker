package com.jpettit.jobapplicationbackend.repos;

import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterviewData;
import com.jpettit.jobapplicationbackend.staticVars.DatabaseFields;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface JobInterviewDataRepository extends JpaRepository<JobInterviewData, UUID> {
    List<JobInterviewData> findJobInterviewDataByJobAppId(UUID id);

    long countByJobAppId(
            @Param(DatabaseFields.JobInterviewFields.jobAppId) UUID jobAppId);

    void removeByJobAppId(
            @Param(DatabaseFields.JobInterviewFields.jobAppId) UUID jobAppId);
}
