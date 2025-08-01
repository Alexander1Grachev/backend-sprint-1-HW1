import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/consts/http-statuses';
import { VideoUpdateDto } from '../../dto/index';
import { ValidationErrorType } from '../../../core/types/validationError';
import { videosReposytory } from '../../../videos/reposytories/videos.reposytories';
import {videoUpdateDtoValidation} from '../../validation/index';
import { createErrorMessages } from '../../../core/utils/error.utils';

export function updateVideoHandler(
  req: Request<{ id: string }, void, VideoUpdateDto>,
  res: Response<{ errorMessages: ValidationErrorType[] } | void>,
) {
  //1.подключили валидацию
  const id = parseInt(req.params.id);
  const errors = videoUpdateDtoValidation(req.body);
  if (errors.length > 0) {
    res.status(HttpStatus.BadRequest).send(createErrorMessages(errors)); //
    return;
  }
  try {
    videosReposytory.update(id, req.body);
    res.sendStatus(HttpStatus.NoContent);
  } catch (error: any) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorMessages([{ field: 'id', message: 'Video not found' }]),
      );
  }
}
