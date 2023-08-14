import { v4 as uuidv4 } from 'uuid';

export interface JobInterview {
    jobappid: string;
    id: string;
    type: string;
    startDate: Date;
    endDate: Date;
    location: string;
}

export const isJobInterviewEmpty = (interview: JobInterview): boolean => {
    return interview.type === "" || interview.location === "";    
}

