package com.jpettit.jobapplicationbackend.repos;

import com.jpettit.jobapplicationbackend.models.jobapplication.JobAppData;
import com.jpettit.jobapplicationbackend.staticVars.DatabaseFields;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface JobAppDataRepository extends JpaRepository<JobAppData, UUID> {
    Optional<JobAppData> findByJobAppDataIdAndCreator(UUID jobAppDataId, String creator);
    List<JobAppData> findByCreator(String creator);

    List<JobAppData> findByDateModifiedAfter(ZonedDateTime dateLastChecked);

    void removeByJobAppDataIdAndCreator(
            @Param(DatabaseFields.JobAppFields.id) UUID id,
            @Param(DatabaseFields.JobAppFields.creator) String creator);
}
