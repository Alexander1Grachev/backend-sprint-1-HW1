import express, { Express } from 'express';

import { videosRouter } from './videos/routers/videos.router';
import { testingRouter } from './testing/testing.router';
import { VIDEOS_PATH, TESTING_PATH } from './core/paths/paths';

export const setupApp = (app: Express) => {
  app.use(express.json()); // middleware для парсинга JSON в теле запроса

  // основной роут
    app.get('/', (req, res) => {
    res.status(200).send('Hello world!');
    });

    app.use(VIDEOS_PATH, videosRouter);
  // Подключаем роуты для видео
    app.use(TESTING_PATH, testingRouter);

    return app;
};
