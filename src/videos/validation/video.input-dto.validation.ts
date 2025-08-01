import { body } from 'express-validator';
import { AvailableResolutions, Video } from '../types/video';

const titleValidation = body('title')
  .exists()
  .withMessage('Title is required')
  .bail()
  .notEmpty()
  .withMessage('Title must not be empty')
  .bail()
  .isString()
  .withMessage('Title should be string')
  .bail()
  .trim()
  .isLength({ min: 1, max: 40 })
  .withMessage('Title must be between 1 and 40 characters');

const authorValidation = body('author')
  .exists()
  .withMessage('Author is required')
  .bail()
  .notEmpty()
  .withMessage('Author must not be empty')
  .bail()
  .isString()
  .withMessage('Author should be string')
  .bail()
  .trim()
  .isLength({ min: 1, max: 20 })
  .withMessage('Author must be between 1 and 20 characters');

const canBeDownloadedValidation = body('canBeDownloaded')
  .exists()
  .withMessage('CanBeDownloaded is required')
  .bail()
  .isBoolean()
  .withMessage('CanBeDownloaded should be boolean')
  .bail();

const minAgeRestrictionValidation = body('minAgeRestriction')
  .optional({ nullable: true })//Если поле отсутствует или равно null, то  всё норм
  .custom((value) => {//кастомная проверка
    if (value === null) return true; //если значение null, то сразу считаем валидным и прекращаем дальше проверять
    const number = Number(value);// на случай, если пришло строкой, но валидной
    if (!Number.isInteger(number) || number < 1 || number > 18) {  // проверяем условия 
      throw new Error('minAgeRestriction must be an integer between 1 and 18 or null');
    }
    return true;
  });
