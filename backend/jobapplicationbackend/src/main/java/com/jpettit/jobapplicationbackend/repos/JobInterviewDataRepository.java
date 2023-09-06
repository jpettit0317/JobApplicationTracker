package com.jpettit.jobapplicationbackend.repos;

import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterview;
import com.jpettit.jobapplicationbackend.models.jobinterview.JobInterviewData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface JobInterviewDataRepository extends JpaRepository<JobInterviewData, UUID> {
    Optional<JobInterviewData> findById(UUID id);
}
