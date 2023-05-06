package com.jpettit.jobapplicationbackend.config.namingstrats;

import org.hibernate.boot.model.naming.Identifier;
import org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl;
import org.hibernate.engine.jdbc.env.spi.JdbcEnvironment;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class EnvironmentNamingStrategy extends PhysicalNamingStrategyStandardImpl {
    @Value("${tabledata.env}")
    private String env;

    @Override
    public Identifier toPhysicalTableName(Identifier name, JdbcEnvironment context) {
        String tableName = name.getText();
        final String newTableName = this.env + tableName;
        return Identifier.toIdentifier(newTableName, false);
    }
}
