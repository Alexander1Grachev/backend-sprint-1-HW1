//Data Transfer Objects(dto) - объекты для передачи данных

//video.input-dto.ts - 
// типы для входных данных (создание/обновление видео)

import { AvailableResolutions } from '../types/video';

export type VideoInputDto = {
    title: string;
    author: string;
    availableResolutions: AvailableResolutions[];

    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    publicationDate: string;
};

