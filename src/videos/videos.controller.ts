//Обработчики маршрутов 
//(функции, которые обрабатывают HTTP запросы)
//Содержит логику для каждого эндпоинта (CRUD операции)

import { Request, Response } from 'express';
import { HttpStatus } from '../core/consts/http-statuses';
import { db } from '../db/in-memory.db';
import { Video } from './types/video';
import { VideoCreateDto, VideoUpdateDto } from './dto/index';
import { videoCreateDtoValidation, videoUpdateDtoValidation } from './validation/index';
import { createErrorMessages, validateId } from '../core/utils/error.utils';
import { ValidationError } from '../core/types/validationError';

import { nanoid } from 'nanoid';
import { addDays, formatISO } from 'date-fns';

//готово
export const getVideos = (
    req: Request<{}, unknown, {}, {}>,
    res: Response<Video[]>) => {
    res.status(HttpStatus.Ok).send(db.videos);
};

//готово
export const createVideo = (
    req: Request, res: Response
) => {

    //1. подключили валидацию
    const errors = videoCreateDtoValidation(req.body);
    if (errors.length > 0) {
        res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
        return;
    }

    // для лаконичной даты 
    const createdAt = formatISO(new Date());
    const publicationDate = formatISO(addDays(new Date(), 1));
    //2. создаем newVideo
    const input: VideoCreateDto = req.body;
    const newVideo: Video = {
        id: +(new Date()), // nanoid() используем на самом деле 
        title: input.title,
        author: input.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAt,
        publicationDate: publicationDate,
        availableResolutions: input.availableResolutions || [] // защита от undefined 
    };

    //3. добавляем newVideo в БД
    db.videos.push(newVideo)
    res.status(HttpStatus.Created).send(newVideo);
};

//готово
export const getVideosById = (
    req: Request<{ id: string }>,
    res: Response<Video | { errorsMessages: ValidationError[] }>
) => {

    //1.подключили валидацию
    const errors = validateId(req.params.id);
    if (errors.length > 0) {
        res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
        return;
    }


    //2. ищем видео по id
    const video = db.videos.find((v) => v.id === +req.params.id);
    if (!video) {
        res.sendStatus(HttpStatus.NotFound)
        return;
    }


    res.status(HttpStatus.Ok).send(video);
};

//готово
export const updateVideosById = (
    req: Request<{ id: string }, void, VideoUpdateDto>,
    res: Response<{ errorsMessages: ValidationError[] } | void>) => {


    //1.подключили валидацию
    const errorsId = validateId(req.params.id);
    const errorsBody = videoUpdateDtoValidation(req.body);
    const errorsAll = [...errorsId, ...errorsBody] // пихаем два в один и разворачиваем их через '...'
    if (errorsAll.length > 0) {
        res.status(HttpStatus.BadRequest).send(createErrorMessages(errorsAll));// TS не ругается на errorsAll, тк развернули
        return;
    }
    //2.ищем видео по id
    const foundVideo = db.videos.find((v) => v.id === +req.params.id);
    if (!foundVideo) {
        res.sendStatus(HttpStatus.NotFound)
        return;
    }


    //3.Обновляем поля из  VideoUpdateDto
    foundVideo.title = req.body.title;
    foundVideo.author = req.body.author;
    foundVideo.availableResolutions = req.body.availableResolutions;

    foundVideo.canBeDownloaded = req.body.canBeDownloaded;// 
    foundVideo.minAgeRestriction = req.body.minAgeRestriction ?? null; // 
    foundVideo.publicationDate = req.body.publicationDate;//


    res.sendStatus(HttpStatus.NoContent);

};

//готово
export const deleteVideosById = (
    req: Request<{ id: string }, void>,
    res: Response<{ errorsMessages: ValidationError[] } | void>
) => {
    //1.подключили валидацию
    const errors = validateId(req.params.id);
    if (errors.length > 0) {
        res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
        return;
    }


    //2.  id из строки в число
    const videosId = +req.params.id

    //3.  Перебираем массив видео в базе и делитаем по индексу 
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
// export const deleteAllVideos = (
//     req: Request, res: Response
// ) => {
//     db.videos = [];
//     res.sendStatus(HttpStatus.NoContent);
// };