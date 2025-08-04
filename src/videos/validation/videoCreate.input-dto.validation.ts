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

const availableResolutionsValidation = body('availableResolutions')
  .exists()
  .withMessage('AvailableResolutions is required')
  .bail()
  .isArray({ min: 1 })
  .withMessage('At least one resolution is required')
  .bail()
  .custom((values: string[]) => {
    const validResolutions = Object.values(AvailableResolutions);
    const invalid = values.filter(
      (v) => !validResolutions.includes(v as AvailableResolutions),
    );
    if (invalid.length)
      throw new Error(`Invalid resolutions: ${invalid.join(', ')}`);
    return true;
  });

export const videoCreateInputDtoValidation = [
  titleValidation,
  authorValidation,
  availableResolutionsValidation,
];
