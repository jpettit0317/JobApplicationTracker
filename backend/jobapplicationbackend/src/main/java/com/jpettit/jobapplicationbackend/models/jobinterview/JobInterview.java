package com.jpettit.jobapplicationbackend.models.jobinterview;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jpettit.jobapplicationbackend.models.interfaces.JSONStringable;
import com.jpettit.jobapplicationbackend.models.jobapplication.JobApplication;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.UUID;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class JobInterview implements JSONStringable {
    private UUID id;

    private UUID jobAppId;

    private String type;

    private String location;

    private ZonedDateTime startDate;

    private ZonedDateTime endDate;

    @Override
    public String toJSONString() {
        try {
            return new ObjectMapper().writeValueAsString(this);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "";
        }
    }
}
