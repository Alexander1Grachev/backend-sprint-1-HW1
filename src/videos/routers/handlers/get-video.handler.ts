import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/consts/http-statuses';
import { db } from '../../../db/in-memory.db';
import { Video } from '../../types/video';
import { videosReposytory } from '../../../videos/reposytories/videos.reposytories';
import { ValidationErrorType } from '../../../core/types/validationError';

export function getVideoHandler(
  req: Request<{ id: string }>,
  res: Response<Video | { errorsMessages: ValidationErrorType[] }>,
) {
  const id = parseInt(req.params.id);
  const video = videosReposytory.findById(id);
    if (!video) {
        res.sendStatus(HttpStatus.NotFound)
        return;
    }
    res.status(HttpStatus.Ok).send(video);
}
