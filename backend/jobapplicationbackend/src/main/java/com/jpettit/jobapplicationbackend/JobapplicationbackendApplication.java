package com.jpettit.jobapplicationbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.jpettit.jobapplicationbackend")
public class JobapplicationbackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(JobapplicationbackendApplication.class, args);
	}
}
