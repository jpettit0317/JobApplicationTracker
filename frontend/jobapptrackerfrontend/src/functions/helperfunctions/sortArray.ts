
export const sortArray = <T>(arr: T[], compare: (x: T, y: T) => number): T[] => {
    return arr.sort(compare);
}