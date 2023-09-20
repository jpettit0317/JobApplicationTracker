export interface DeleteJobAppProps {
    shouldShow: boolean;
    onDeletePressed: () => void;
    onClosePressed: () => void;
    variant: string;
    idToDelete: string;
}