
import express, { Express } from "express";

import { videosRouter } from "./videos/videos.router";
import { testingRouter } from "./testing/testing.router";

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    // основной роут
    app.get("/", (req, res) => {
        res.status(200).send("Hello world!");
    });

    app.use('/videos', videosRouter)
    // Подключаем роуты для видео
    app.use("/testing", testingRouter);

    return app;
};

