import { Button, Card, Stack } from "react-bootstrap";
import { JobInterview } from "../../../model/interfaces/jobapp/JobInterview";
import { JobInterviewCardProps } from "./JobInterviewCardProps";
import { JobInterviewCardTestIds } from "../../../enums/jobinterviewtestids/JobInterviewCardTestIds_enum";

export const JobInterviewCard = (props: JobInterviewCardProps) => {
    const onDeletePressed = () => {
        props.onDeleteButtonPressed(props.index);
    };

    const onEditButtonPressed = () => {
        props.onEditButtonPressed(props.jobInterview.id);
    };

    const getDateString = (inputDate: Date): string => {
        const dateString = inputDate.toString();

        return new Date(dateString).toLocaleString("en-US");
    }

    const generateId = (id: string): string => {
        return id + "_" + props.index;
    }

    return (
        <Card style={{ minWidth: '300px' }}>
                <Card.Body style={ { textAlign: "start" } }>
                    <Card.Title data-testid={generateId(JobInterviewCardTestIds.cardTitle)}>
                        {props.jobInterview.type}
                    </Card.Title>
                    <Card.Text style={ { left: "0px" } } data-testid={generateId(JobInterviewCardTestIds.locationField)}>
                        Location: {props.jobInterview.location}
                    </Card.Text>
                    <Card.Text data-testid={generateId(JobInterviewCardTestIds.startDateField)}>
                        Start Date: {getDateString(props.jobInterview.startDate)}
                    </Card.Text>
                    <Card.Text data-testid={generateId(JobInterviewCardTestIds.endDateField)}>
                        End Date: {getDateString(props.jobInterview.endDate)}
                    </Card.Text>
                    <Stack direction="vertical" gap={2}>
                        <Button variant="primary" onClick={onEditButtonPressed} 
                        data-testid={generateId(JobInterviewCardTestIds.editButtion)}
                        >
                            Edit
                        </Button>
                        <Button variant="secondary" 
                            style={ { backgroundColor: "red", color: "white" } } 
                            onClick={onDeletePressed}
                            data-testid={generateId(JobInterviewCardTestIds.deleteButton)}
                        >
                            Delete
                        </Button>
                    </Stack>
                </Card.Body>
        </Card>  
    );
};