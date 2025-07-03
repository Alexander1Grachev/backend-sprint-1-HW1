import { Router } from "express";
import { createVideo, deleteVideosById, getVideos, getVideosById, updateVideosById } from "./videos.controller";


export const videosRouter = Router();

videosRouter.get("/:id", getVideosById);
videosRouter.put("/:id", updateVideosById);
videosRouter.delete("/:id", deleteVideosById);

videosRouter.get("/", getVideos);
videosRouter.post("/", createVideo);

