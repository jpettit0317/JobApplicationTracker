package com.jpettit.jobapplicationbackend.models.jobapplication;

import com.jpettit.jobapplicationbackend.helpers.DateConverter;
import com.jpettit.jobapplicationbackend.helpers.DateToUTConverter;
import com.jpettit.jobapplicationbackend.staticVars.DateFormats;
import com.jpettit.jobapplicationbackend.staticVars.JobAppTimeZone;
import jakarta.persistence.*;
import lombok.*;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "_jobapp")
public class JobAppData {
    private String company;

    private String jobTitle;

    private String description;

    private String status;

    private String creator;

    private ZonedDateTime dateApplied;

    private ZonedDateTime dateModified;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID jobAppDataId;

    public static JobAppData initFromJobApp(final JobApplication jobApplication, final String creator) {
        return JobAppData.builder()
                .company(jobApplication.getCompany())
                .jobTitle(jobApplication.getJobTitle())
                .description(jobApplication.getDescription())
                .status(jobApplication.getStatus())
                .creator(creator)
                .dateApplied(jobApplication.getDateApplied())
                .dateModified(jobApplication.getDateModified())
                .build();
    }
}
