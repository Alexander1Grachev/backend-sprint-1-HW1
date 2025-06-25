
import { AvailableResolutions } from '../types/video';

export interface VideoCreateDto {
    title: string;
    author: string;
    availableResolutions: AvailableResolutions[];
}