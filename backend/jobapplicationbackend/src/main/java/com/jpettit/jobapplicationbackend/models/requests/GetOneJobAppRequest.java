package com.jpettit.jobapplicationbackend.models.requests;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jpettit.jobapplicationbackend.helpers.ObjectMapperHelper;
import com.jpettit.jobapplicationbackend.models.interfaces.JSONStringable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetOneJobAppRequest implements JSONStringable {
    private String token;
    private UUID id;

    @Override
    public String toJSONString()  {
        try {
            return ObjectMapperHelper.createObjectMapper()
                    .writeValueAsString(this);
        } catch (JsonProcessingException ex) {
            return "";
        }
    }
}
