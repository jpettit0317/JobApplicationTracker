package com.jpettit.jobapplicationbackend.models.responses;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.jpettit.jobapplicationbackend.helpers.ObjectMapperHelper;
import com.jpettit.jobapplicationbackend.models.interfaces.JSONStringable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddJobAppResponse implements JSONStringable {
    private String errorMessage;
    private String errorType;

    private int statusCode;


    @Override
    public String toJSONString() {
        try {
            return ObjectMapperHelper.createObjectMapper()
                    .writeValueAsString(this);
        } catch (JsonProcessingException e) {
            return "";
        }
    }
}
