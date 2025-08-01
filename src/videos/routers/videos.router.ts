import { Router } from 'express';
import { idValidation } from '../../core/middlewares/validation/params-id.validation-middleware';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validtion-result.middleware';
import {
  videoCreateInputDtoValidation,
  videoUpdateInputDtoValidation,
} from '../../videos/validation/index';

import { updateVideoHandler } from './handlers/update-video.handler';
import { getVideoHandler } from './handlers/get-video.handler';
import { getVideoListHandler } from './handlers/get-video-list.handler';
import { deleteVideoHandler } from './handlers/delete-video.handler';
import { createVideoHandler } from './handlers/create-video.handler';

export const videosRouter = Router();

videosRouter.get(
  '/:id',
  idValidation,
  inputValidationResultMiddleware,
  getVideoHandler,
);
videosRouter.put(
  '/:id',
  idValidation,
  videoUpdateInputDtoValidation,
  inputValidationResultMiddleware,
  updateVideoHandler,
);
videosRouter.delete('/:id', deleteVideoHandler);

videosRouter.get('/', getVideoListHandler);
videosRouter.post('/', createVideoHandler);
