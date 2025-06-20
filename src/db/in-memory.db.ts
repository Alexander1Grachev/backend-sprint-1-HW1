// имитация базы данных (хранит данные в памяти приложения)
//Содержит объект db с коллекцией videos 
// (аналогично было для drivers в примере)

import { Video, AvailableResolutions } from '../videos/types/video';

export const db = {
    videos: <Video[]>[],
}