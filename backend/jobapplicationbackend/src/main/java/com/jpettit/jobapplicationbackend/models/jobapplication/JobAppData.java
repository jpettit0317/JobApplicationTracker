package com.jpettit.jobapplicationbackend.models.jobapplication;

import com.jpettit.jobapplicationbackend.helpers.DateToUTConverter;
import com.jpettit.jobapplicationbackend.staticVars.DateFormats;
import com.jpettit.jobapplicationbackend.staticVars.JobAppTimeZone;
import jakarta.persistence.*;
import lombok.*;

import java.text.ParseException;
import java.util.Date;
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

    private Date dateApplied;

    private Date dateModified;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    public static JobAppData initFromJobApp(final JobApplication jobApplication, final String creator) {
        final Date utcDateApplied = convertDateToUTC(jobApplication.getDateApplied());
        final Date utcDateModified = convertDateToUTC(jobApplication.getDateModified());

        return JobAppData.builder()
                .company(jobApplication.getCompany())
                .jobTitle(jobApplication.getJobTitle())
                .description(jobApplication.getDescription())
                .status(jobApplication.getStatus())
                .creator(creator)
                .dateApplied(utcDateApplied)
                .dateModified(utcDateModified)
                .build();
    }

    private static Date convertDateToUTC(final Date date) {
        try {
            return DateToUTConverter.convertDateToUTCDate(date,
                    JobAppTimeZone.UTC, DateFormats.standardFormat);
        } catch (ParseException parseException) {
            return date;
        }
    }
}
