package com.jpettit.jobapplicationbackend.repos;

import com.jpettit.jobapplicationbackend.models.jobapplication.JobAppData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface JobAppDataRepository extends JpaRepository<JobAppData, UUID> {
    Optional<JobAppData> findById(UUID id);
}
