package com.jpettit.jobapplicationbackend.models.jobapplication;

import com.jpettit.jobapplicationbackend.helpers.DateConverter;
import com.jpettit.jobapplicationbackend.helpers.DateToUTConverter;
import com.jpettit.jobapplicationbackend.staticVars.DatabaseFields;
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
    @Column(name = DatabaseFields.JobAppFields.company)
    private String company;

    @Column(name = DatabaseFields.JobAppFields.jobTitle)
    private String jobTitle;

    @Column(name = DatabaseFields.JobAppFields.description)
    private String description;

    @Column(name = DatabaseFields.JobAppFields.status)
    private String status;

    @Column(name = DatabaseFields.JobAppFields.creator)
    private String creator;

    @Column(name = DatabaseFields.JobAppFields.dateApplied)
    private ZonedDateTime dateApplied;

    @Column(name = DatabaseFields.JobAppFields.dateModified)
    private ZonedDateTime dateModified;

    @Id
    @Column(name = DatabaseFields.JobAppFields.id)
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
