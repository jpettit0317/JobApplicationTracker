package com.jpettit.jobapplicationbackend.repos;

import com.jpettit.jobapplicationbackend.models.jobapplication.JobAppData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface JobAppDataRepository extends JpaRepository<JobAppData, UUID> {
    Optional<JobAppData> findByJobAppDataId(UUID jobAppDataId);
    List<JobAppData> findByCreator(String creator);

    List<JobAppData> findByDateModifiedAfter(ZonedDateTime dateLastChecked);
}
