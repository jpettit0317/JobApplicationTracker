import { Button, Card, Stack } from "react-bootstrap";
import { JobAppCardProps } from "./JobAppCardProps";
import { JobAppCardTestIds } from "../../../enums/jobappcardtestids/JobAppCardTestIds_enum";
import { convertDateToLocalString } from "../../../functions/helperfunctions/datefunctions/convertDateToLocalString";

export const JobAppCard = (props: JobAppCardProps) => {
    const onDeletePressed = () => {
        props.onDelete(props.jobApp.id);
    };

    const onEditPressed = () => {
        props.onEdit(props.jobApp.id);
    };

    const onViewPressed = () => {
        props.onView(props.jobApp.id);
    };
    
    const getDateString = (date: Date, locale: string = "en-US") => {
        return convertDateToLocalString(date, locale); 
    };

    const generateId = (id: string): string => {
        return `${id}_${props.index}`;
    };

    return (
        <Card style={{ minWidth: '300px' }}>
                <Card.Body style={ { textAlign: "start" } } >
                    <Card.Title data-testid={generateId(JobAppCardTestIds.jobTitle)}>
                        {props.jobApp.jobTitle}
                    </Card.Title>
                    <Card.Text style={ { left: "0px" } } data-testid={generateId(JobAppCardTestIds.company)}>
                        Company: {props.jobApp.company}
                    </Card.Text>
                    <Card.Text data-testid={generateId(JobAppCardTestIds.status)}>
                        Status: {props.jobApp.status}
                    </Card.Text>
                    <Card.Text data-testid={generateId(JobAppCardTestIds.dateApplied)}>
                        Date Applied: {getDateString(props.jobApp.dateApplied)}
                    </Card.Text>
                    <Stack direction="vertical" gap={2}>
                        <Button variant="primary" onClick={onEditPressed} 
                        data-testid={generateId(JobAppCardTestIds.editButton)}
                        >
                            Edit
                        </Button>
                        <Button variant="primary" onClick={onViewPressed} 
                        data-testid={generateId(JobAppCardTestIds.viewButton)}
                        >
                            View
                        </Button>
                        <Button variant="secondary" 
                            style={ { backgroundColor: "red", color: "white" } } 
                            onClick={onDeletePressed}
                            data-testid={generateId(JobAppCardTestIds.deleteButton)}
                        >
                            Delete
                        </Button>
                    </Stack>
                </Card.Body>
        </Card>  
    );
};