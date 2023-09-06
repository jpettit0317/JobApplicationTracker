import { JobInterview } from "../../model/interfaces/jobapp/JobInterview";

export interface EditInterviewModalProps {
    jobInterview: JobInterview;
    size: string;
    shouldShow: boolean;
    onEdit: (interview: JobInterview) => void;
    onHide: () => void;
}