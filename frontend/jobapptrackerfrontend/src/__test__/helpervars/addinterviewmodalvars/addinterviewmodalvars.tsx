import {v4 as uuidv4} from "uuid";
import { AddInterviewModalProps } from "../../../components/interviewmodal/AddInterviewModalProps";
import { JobInterview } from "../../../model/interfaces/jobapp/JobInterview";


export const createAddInterviewModalProps = (size: string = "lg",
 shouldShow: boolean, id: string = uuidv4(),
 onSubmit: (interview: JobInterview) => void, onHide: () => void): AddInterviewModalProps => {
    return {
        size: size,
        shouldShow: shouldShow,
        onSubmit: onSubmit,
        onHide: onHide,
        id: id
    };
}

export const dates: Date[] = [
    new Date('December 17, 1995 03:24:00'),
    new Date('December 18, 1995 03:24:00'),
    new Date('December 18, 1995 04:00:00')
];

export const errorJobInterview: JobInterview = {
    jobappid: uuidv4(),
    id: uuidv4(),
    type: "",
    startDate: dates[1],
    endDate: dates[2],
    location: "Online" 
};

export const jobInterview: JobInterview = {
    jobappid: uuidv4(),
    id: uuidv4(),
    type: "Technical",
    startDate: dates[1],
    endDate: dates[2],
    location: "Online" 
};