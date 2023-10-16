export interface NavBarProps {
    title: string;
    logoutUser: () => void;
    navigateToAddJobApp: () => void;
    shouldShowDropDown: boolean;
}