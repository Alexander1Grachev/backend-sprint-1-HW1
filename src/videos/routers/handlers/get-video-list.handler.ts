import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/consts/http-statuses';
import { db } from '../../../db/in-memory.db';
import { Video } from '../../types/video';
import { videosReposytory } from '../../../videos/reposytories/videos.reposytories';

export function getVideoListHandler(
  req: Request<{}, unknown, {}, {}>,
  res: Response<Video[]>,
) {
  const videos = videosReposytory.findAll();
  res.status(HttpStatus.Ok).send(videos);
}
