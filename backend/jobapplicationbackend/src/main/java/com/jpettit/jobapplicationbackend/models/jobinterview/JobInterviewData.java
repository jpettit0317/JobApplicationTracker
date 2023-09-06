package com.jpettit.jobapplicationbackend.models.jobinterview;

import com.jpettit.jobapplicationbackend.helpers.DateToUTConverter;
import com.jpettit.jobapplicationbackend.staticVars.DateFormats;
import com.jpettit.jobapplicationbackend.staticVars.JobAppTimeZone;
import jakarta.persistence.*;
import lombok.*;

import java.text.ParseException;
import java.util.Date;
import java.util.UUID;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "_jobinterview")
public class JobInterviewData {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Setter(AccessLevel.PRIVATE)
    private UUID id;

    @Setter(AccessLevel.PRIVATE)
    private UUID jobAppId;

    private String type;

    private String location;

    private Date startDate;

    private Date endDate;

    public static JobInterviewData initFromInterview(final JobInterview interview, final UUID jobAppId) {
        final Date utcStartDate = convertDateToUTC(interview.getStartDate());
        final Date utcEndDate = convertDateToUTC(interview.getEndDate());

        return JobInterviewData.builder()
                .id(null)
                .jobAppId(jobAppId)
                .type(interview.getType())
                .location(interview.getLocation())
                .startDate(utcStartDate)
                .endDate(utcEndDate)
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
