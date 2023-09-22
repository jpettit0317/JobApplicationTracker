package com.jpettit.jobapplicationbackend.models.jobinterview;

import com.jpettit.jobapplicationbackend.helpers.DateToUTConverter;
import com.jpettit.jobapplicationbackend.staticVars.DatabaseFields;
import com.jpettit.jobapplicationbackend.staticVars.DateFormats;
import com.jpettit.jobapplicationbackend.staticVars.JobAppTimeZone;
import jakarta.persistence.*;
import lombok.*;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
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
    @Column(name = DatabaseFields.JobInterviewFields.id)
    @Setter(AccessLevel.PRIVATE)
    private UUID id;

    @Column(name = DatabaseFields.JobInterviewFields.jobAppId)
    @Setter(AccessLevel.PRIVATE)
    private UUID jobAppId;

    @Column(name = DatabaseFields.JobInterviewFields.type)
    private String type;

    @Column(name = DatabaseFields.JobInterviewFields.location)
    private String location;

    @Column(name = DatabaseFields.JobInterviewFields.startDate,
            columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private ZonedDateTime startDate;

    @Column(name = DatabaseFields.JobInterviewFields.endDate,
            columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private ZonedDateTime endDate;

    public static JobInterviewData initFromInterview(final JobInterview interview, final UUID jobAppId) {
        return JobInterviewData.builder()
                .id(interview.getId())
                .jobAppId(jobAppId)
                .type(interview.getType())
                .location(interview.getLocation())
                .startDate(interview.getStartDate())
                .endDate(interview.getEndDate())
                .build();
    }
}
