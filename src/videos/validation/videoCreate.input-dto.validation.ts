import { VideoCreateDto, VideoUpdateDto } from '../dto/index';
import { AvailableResolutions } from '../types/video';
import { ValidationError } from '../../core/types/validationError'



//1) проверяем приходящие данные на валидность


export const videoCreateDtoValidation = (
    data: VideoCreateDto,
): ValidationError[] => {

    const errors: ValidationError[] = [];

    // Проверка title
    if (typeof data.title !== 'string' ||
        data.title.trim().length === 0 ||
        !data.title) {
        errors.push({
            message: "Title is required",
            field: "title"
        });
    } else if (data.title.trim().length > 40) {
        errors.push({
            message: "Invalid title, 40 characters maximum",
            field: "title"
        })
    }



    // Проверка author
    if (typeof data.author !== 'string' ||
        data.author.trim().length === 0 ||
        !data.author) {
        errors.push({
            message: "Author is required",
            field: "author"
        });
    } else if (data.author.trim().length > 20) {
        errors.push({
            message: "Invalid author, 20 characters maximum",
            field: "author"
        })
    }


    // Available Resolutions
    if (!Array.isArray(data.availableResolutions)) {
        errors.push({
            message: 'AvailableResolutions must be an array', field: 'availableResolutions'
        });
    } else if (data.availableResolutions.length === 0) {

        errors.push({
            message: 'availableResolutions cannot be empty',
            field: 'availableResolutions'
        });
    }

    const existingResolutions = Object.values(AvailableResolutions); // Получаем все допустимые значения из enum
    for (const resolution of data.availableResolutions) { // Перебираем каждое значение
        if (!existingResolutions.includes(resolution)) { // Если значение не входит в список разрешённых
            errors.push({
                message: 'Invalid availableResolutions',
                field: 'availableResolutions'
            });
            break; // останавливаем на первом неверном 
        }
    }

    
    return errors;// если не вернули никакую ошибку
};


