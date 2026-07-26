import { evaluate } from "mathjs";

export const isCalculation = (value: string) =>
    /[+\-*/()%]/.test(value);
export const calculateAmount = (value: string): string => {
    if (!value) return "";

    try {
        const result = evaluate(value);

        return Number(result).toString();
    } catch {
        return "Invalid calculation";
    }
};
