import {
  FieldValidationError,
  ValidationError,
  validationResult,
} from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../../../core/consts/http-statuses';
import { ValidationErrorType } from '../../types/validationError';
import { ValidationErrorDto } from '../../../core/types/validationError.dto';

export const createErrorMessages = (
  errors: ValidationErrorType[],
): ValidationErrorDto => {
  return { errorMessages: errors };
};

const formatErrors = (error: ValidationError): ValidationErrorType => {
  const expressError = error as unknown as FieldValidationError;

  return {
    field: expressError.path,
    message: expressError.msg,
  };
};

export const inputValidationResultMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req)//собирает все ошибки валидации, накопленные до этого.
    .formatWith(formatErrors)// применяет мою функцию formatErrors к каждой ошибке.
    .array({ onlyFirstError: true });//берёт только первую ошибку на поле (не дублирует).

  if (errors.length > 0) {
    res.status(HttpStatus.BadRequest).json({ errorMessages: errors });
    return;
  }

  next();
};
