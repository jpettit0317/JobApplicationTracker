package com.jpettit.jobapplicationbackend.helpers.helper.helperpair;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class HelperPair<T>{
    private T actual;
    private T expected;
}
