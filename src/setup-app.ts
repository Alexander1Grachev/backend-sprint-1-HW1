
import express, { Express } from "express";
import {
    getVideos,
    createVideo,
    getVideosById,
    updateVideosById,
    deleteVideosById,
    deleteAllVideos
} from "./videos/types/videos.controller";

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    // основной роут
    app.get("/", (req, res) => {
        res.status(200).send("Hello world!");
    });


    // Подключаем роуты для видео
    app.get("/videos/:id", getVideosById);
    app.put("/videos/:id", updateVideosById);
    app.delete("/videos/:id", deleteVideosById);

    app.get("/videos", getVideos);
    app.post("/videos", createVideo);

    app.delete("/testing/all-data", deleteAllVideos);

    return app;
};

