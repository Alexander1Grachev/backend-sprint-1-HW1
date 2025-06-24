//Обработчики маршрутов 
//(функции, которые обрабатывают HTTP запросы)
//Содержит логику для каждого эндпоинта (CRUD операции)

import { Request, Response } from 'express';
import { HttpStatus } from '../../core/types/http-statuses';
import { db } from '../../db/in-memory.db';
import { Video } from './video';
import { VideoInputDto } from '../../videos/dto/video.input-dto';
import { nanoid } from 'nanoid';
import { addDays, formatISO } from 'date-fns';

//готово
export const getVideos = (
    req: Request<{}, Video[], {}, {}>,
    res: Response<Video[] | null>) => {
    res.status(HttpStatus.Ok).send(db.videos);
};

//готово
export const createVideo = (req: Request, res: Response) => {
    

    // для лаконичной даты 
    const createdAt = formatISO(new Date());
    const publicationDate = formatISO(addDays(new Date(), 1));
    //2) создаем newVideo
    const newVideo: Video = {
        id: +(new Date()), // nanoid() используем на самом деле 
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAt,
        publicationDate: publicationDate,
        availableResolutions: req.body.availableResolutions || [] // защита от undefined 
    };

    //3) добавляем newVideo в БД
    db.videos.push(newVideo)
    res.status(HttpStatus.Created).send(newVideo);
};

//готово
export const getVideosById = (
    req: Request<{ id: string }>,
    res: Response<Video>
) => {
    const video = db.videos.find((v) => v.id === +req.params.id);
    if (!video) {
        res.sendStatus(HttpStatus.NotFound)
        return;
    }
    res.status(HttpStatus.Ok).send(video);
};

//готово
export const updateVideosById =
    (req: Request<{ id: string }, void, VideoInputDto>,
        res: Response<void>) => {
        const foundVideo = db.videos.find((v) => v.id === +req.params.id);
        if (!foundVideo) {
            res.sendStatus(HttpStatus.NotFound)
            return;
        }
        // Обновляем поля из VideoInputDto
        foundVideo.title = req.body.title;
        foundVideo.author = req.body.author;
        foundVideo.availableResolutions = req.body.availableResolutions;


        res.status(HttpStatus.NoContent).send();

    };

//готово
export const deleteVideosById = (
    req: Request<{ id: string }, void>,
    res: Response<void>
) => {
    const videosId = +req.params.id

    for (let i = 0; i < db.videos.length; i++) {
        if (db.videos[i].id === videosId) {
            db.videos.splice(i, 1)
            res.sendStatus(HttpStatus.NoContent)
            return;
        }
    }
    res.sendStatus(HttpStatus.NotFound)

};

//готово
export const deleteAllVideos = (
    req: Request, res: Response
) => {
    db.videos = [];
    res.sendStatus(HttpStatus.NoContent);
};