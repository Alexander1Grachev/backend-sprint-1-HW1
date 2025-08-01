//Создаём простой middleware, который валидирует параметр :id в URL.

import { param } from 'express-validator';

export const idValidation = param('id')//валидируем параментры из 
  .exists().withMessage('ID is required')// проверяет существование 
  .isString().withMessage('ID must be a string')
  .isLength({ min: 1 }).withMessage('ID must not be empty')
  .isNumeric().withMessage('ID must be a numeric string');