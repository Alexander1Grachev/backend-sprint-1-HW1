import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/consts/http-statuses';
import { VideoUpdateDto } from '../../dto/index';
import { ValidationErrorType } from '../../../core/types/validationError';
import { videosReposytory } from '../../../videos/reposytories/videos.reposytories';
import { createErrorMessages } from '../../../core/utils/error.utils';

export function updateVideoHandler(
  req: Request<{ id: string }, void, VideoUpdateDto>,
  res: Response<{ errorMessages: ValidationErrorType[] } | void>,
) {
  const id = parseInt(req.params.id);
  const video = videosReposytory.findById(id);
  if (!video) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: 'id', message: 'Video not found' }]));
  }

  videosReposytory.update(id, req.body);
  res.sendStatus(HttpStatus.NoContent);
}
