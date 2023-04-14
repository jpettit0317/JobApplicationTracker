
export const isInputInRange = (input: string, min: number, max: number): boolean => {
    if (min > max) {
        const newMin = max;
        const newMax = min;
        
        return input.length >= newMin && input.length <= newMax;
    }
    return input.length >= min && input.length <= max;
}