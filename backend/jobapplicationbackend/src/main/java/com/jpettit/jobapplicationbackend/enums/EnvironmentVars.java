package com.jpettit.jobapplicationbackend.enums;

public enum EnvironmentVars {
    JOBAPP_DBUSER("JOBAPP_DBUSER"),
    JOBAPP_DBPASSWORD("JOBAPP_DBPASSWORD"),
    JOBAPP_SECRETKEY("JOBAPP_ENCRYPTKEY"),
    JOBAPP_SECRETKEY2("JOBAPP_ENCRYPTKEY2");

    private final String value;

    EnvironmentVars(String envVar) {
        this.value = envVar;
    }

    public String getValue() {
        return this.value;
    }
}
