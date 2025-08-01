import { Request, Response } from 'express';
import { db } from '../../db/in-memory.db';
import { Video } from '../types/video';
import { VideoCreateDto, VideoUpdateDto } from '../dto/index';

export const videosReposytory = {
  findAll(): Video[] {
    return db.videos;
  },
  findById(id: number): Video | null {
    return db.videos.find((v) => v.id === id) ?? null;
  },
  create(newVideo: Video): Video {
    db.videos.push(newVideo);
    return newVideo;
  },
  update(id: number, dto: VideoUpdateDto): void {
    const video = db.videos.find((v) => v.id === id);
    if (!video) {
      throw new Error('Driver not exist');
    }
    video.title = dto.title;
    video.author = dto.author;
    video.availableResolutions = dto.availableResolutions;

    video.canBeDownloaded = dto.canBeDownloaded; //
    video.minAgeRestriction = dto.minAgeRestriction ?? null; //
    video.publicationDate = dto.publicationDate;
      return;
  },
  delete(id: number): void {
    const index = db.videos.findIndex((v) => v.id === id);
    if (index === -1) {
      throw new Error('Video not exist');
    }
    db.videos.splice(index, 1);
    return;
  },
};
