
export interface NavSearchBarProps {
    title: string;
    onSearchButtonPressed: (searchTerm: string) => void;
    logoutUser: () => void;
    navigateToAddJobApp: () => void;
}