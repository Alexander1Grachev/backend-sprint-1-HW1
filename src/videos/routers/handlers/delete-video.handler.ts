import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/consts/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { ValidationErrorType } from '../../../core/types/validationError';
import { videosReposytory } from '../../../videos/reposytories/videos.reposytories';

export function deleteVideoHandler(
  req: Request<{ id: string }, void>,
  res: Response<{ errorMessages: ValidationErrorType[] } | void>,
) {
  const id = parseInt(req.params.id);
  try {
    videosReposytory.delete(id);
    res.sendStatus(HttpStatus.NoContent);
  } catch (error: any) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: 'id', message: 'Video not found' }]));
  }
}
