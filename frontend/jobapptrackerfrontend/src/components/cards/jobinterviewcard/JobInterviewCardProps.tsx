import { JobInterview } from "../../../model/interfaces/jobapp/JobInterview";

export interface JobInterviewCardProps {
    jobAppDate: Date;
    jobInterview: JobInterview;
    onDeleteButtonPressed: (index: number) => void;
    onEditButtonPressed: (id: string) => void;
    index: number;
    id: string;
    shouldShowButtons: boolean;
};
