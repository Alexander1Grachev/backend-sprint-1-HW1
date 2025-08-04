import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/consts/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { VideoCreateDto } from '../../dto/index';
import { Video } from '../../types/video';
import { videosReposytory } from '../../../videos/reposytories/videos.reposytories';



export function createVideoHandler(
  req: Request<{}, {}, VideoCreateDto>,
  res: Response,
) {


  const createdAt = new Date().toISOString();
  const publicationDate = new Date(Date.now() + 86400000).toISOString(); // +1 день
  //2. создаем newVideo
  const input: VideoCreateDto = req.body;
  const newVideo: Video = {
    id: +new Date(), // nanoid() используем на самом деле
    title: input.title,
    author: input.author,
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: createdAt,
    publicationDate: publicationDate,
    availableResolutions: input.availableResolutions || [], // защита от undefined
  };

  //3. добавляем newVideo в БД
  videosReposytory.create(newVideo);
  res.status(HttpStatus.Created).send(newVideo);
}
