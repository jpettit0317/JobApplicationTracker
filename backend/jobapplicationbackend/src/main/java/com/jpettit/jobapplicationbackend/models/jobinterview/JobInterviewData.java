package com.jpettit.jobapplicationbackend.models.jobinterview;

import com.jpettit.jobapplicationbackend.helpers.DateToUTConverter;
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
    @Setter(AccessLevel.PRIVATE)
    private UUID id;

    @Setter(AccessLevel.PRIVATE)
    private UUID jobAppId;

    private String type;

    private String location;

    private ZonedDateTime startDate;

    private ZonedDateTime endDate;

    public static JobInterviewData initFromInterview(final JobInterview interview, final UUID jobAppId) {
        return JobInterviewData.builder()
                .id(null)
                .jobAppId(jobAppId)
                .type(interview.getType())
                .location(interview.getLocation())
                .startDate(interview.getStartDate())
                .endDate(interview.getEndDate())
                .build();
    }
}
