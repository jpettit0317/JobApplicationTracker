import { JobInterview } from "../../model/interfaces/jobapp/JobInterview";

export interface AddInterviewModalProps {
    size: string;
    shouldShow: boolean;
    onSubmit: (interview: JobInterview) => void;
    onHide: () => void;
    id: string;
};