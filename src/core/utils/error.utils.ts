import { ValidationError } from '../types/validationError';

export const createErrorMessages = (
    errors: ValidationError[],
): { errorsMessages: ValidationError[] } => {
    return { errorsMessages: errors };
};

export const validateId = (id: string | number): ValidationError[] => {
    const errors: ValidationError[] = [];

    //Приводим к строке и тримим
    const idString = String(id).trim();

    //Проверка на пустую строку
    if (idString === '') {
        errors.push({
            message: "ID is required and cannot be empty",
            field: "id",
        });
        return errors; // дальше нет смысла проверять
    }

    //Преобразование  в число
    const numId = Number(idString);

    if (isNaN(numId)) {
        errors.push({
            message: "Invalid ID, must be a number",
            field: "id",
        });
    } else if (!Number.isInteger(numId)) {
        errors.push({
            message: "ID must be an integer",
            field: "id",
        });
    } else if (numId < 1) {
        errors.push({
            message: "ID must be a positive number",
            field: "id",
        });
    }

    return errors;
};