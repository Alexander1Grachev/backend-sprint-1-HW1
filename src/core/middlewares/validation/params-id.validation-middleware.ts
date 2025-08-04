//Создаём простой middleware, который валидирует параметр :id в URL.
import { param } from 'express-validator';
export const idValidation = param('id')
  .exists()
  .withMessage('ID is required')
  .custom((value) => {
    // Проверка на число
    if (isNaN(Number(value))) {
      throw new Error('ID must be a number');
    }

    const num = Number(value);

    // Проверка на целое число
    if (!Number.isInteger(num)) {
      throw new Error('ID must be an integer');
    }

    // Проверка на положительное число
    if (num < 1) {
      throw new Error('ID must be >= 1');
    }

    return true;
  })
  .toInt();
