import { videoCreateDtoValidation, videoUpdateDtoValidation } from '../../src/videos/validation/index';
import { VideoCreateDto, VideoUpdateDto } from '../../src/videos/dto/index';

import { AvailableResolutions } from '../../src/videos/types/video';
import { HttpStatus } from '../../src/core/consts/http-statuses';

import request from 'supertest';
import { setupApp } from '../../src/setup-app'; // путь к express-приложению
import express from 'express';


describe('Video API Create body validation check', () => {
    const app = express();
    setupApp(app);


    // очищаем базу данных 
    beforeAll(async () => {
        await request(app).delete('/testing/all-data').expect(HttpStatus.NoContent);
    });


    //Тест: пустой title
    it('should return 400 if title is empty - POST /videos', async () => {
        const response = await request(app)
            .post('/videos')
            .send({
                title: '',
                author: 'Valid Author',
                availableResolutions: AvailableResolutions['P144']
            });
        expect(response.status).toBe(HttpStatus.BadRequest);
        expect(response.body.errorsMessages).toEqual(
            expect.arrayContaining([expect.objectContaining({ field: 'title' })])
        )
    });
    //Тест:  title слишком длинный
    it('should return 400 if title is longer than 40 characters - POST /videos', async () => {
        const response = await request(app)
            .post('/videos')
            .send({
                title: 'q'.repeat(41),
                author: 'Valid Author',
                availableResolutions: AvailableResolutions['P144']
            })
        expect(response.status).toBe(HttpStatus.BadRequest);
        expect(response.body.errorsMessages).toEqual(
            expect.arrayContaining([expect.objectContaining({ field: 'title' })])
        )
    })
    //Тест:  author слишком пустой 
    it('should return 400 if autor is empty - POST /videos ', async () => {

        const response = await request(app)
            .post('/videos')
            .send({
                title: 'Valid Title',
                author: '',
                availableResolutions: [AvailableResolutions.P144]
            })
        expect(response.status).toBe(HttpStatus.BadRequest)
        expect(response.body.errorsMessages).toEqual(
            expect.arrayContaining([expect.objectContaining({ field: 'author' })])
        )
    })
    //Тест:  author слишком длинный
    it('should return 400 if author is longer than 20 characters - POST /videos', async () => {
        const response = await request(app)
            .post('/videos')
            .send({
                title: 'Valid Title',
                author: 'q'.repeat(41),
                availableResolutions: [AvailableResolutions.P144]
            })
        expect(response.status).toBe(HttpStatus.BadRequest)
        expect(response.body.errorsMessages).toEqual(
            expect.arrayContaining([expect.objectContaining({ field: 'author' })])
        )
    })


    //Тест:  Available Resolutions слишком не массив
    it('should return 400 if availableResolutions is not  an array - POST /videos', async () => {
        const response = await request(app)
            .post('/videos')
            .send({
                title: 'Valid Title',
                author: 'Valid Author',
                availableResolutions: 'Not an array'
            })

        expect(response.status).toBe(HttpStatus.BadRequest);
        expect(response.body.errorsMessages).toEqual(
            expect.arrayContaining([expect.objectContaining({ field: 'availableResolutions' })])
        )
    })


    //Тест:  Available Resolutions слишком путой массив 
    it('should return 400 if availableResolutions is empty array - POST /videos', async () => {
        const response = await request(app)
            .post('/videos')
            .send({
                title: 'Valid Title',
                author: 'Valid Author',
                availableResolutions: []
            });

        expect(response.status).toBe(HttpStatus.BadRequest);
        expect(response.body.errorsMessages).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ field: 'availableResolutions' })
            ])
        );
    });

    //Тест:  Available Resolutions массив с недопустимым значением
    it('should return 400 if availableResolutions contains invalid value - POST /videos', async () => {
        const response = await request(app)
            .post('/videos')
            .send({
                title: 'Valid Title',
                author: 'Valid Author',
                availableResolutions: ['INVALID']
            })
        expect(response.status).toBe(HttpStatus.BadRequest)
        expect(response.body.errorsMessages).toEqual(
            expect.arrayContaining([expect.objectContaining({ field: 'availableResolutions' })])
        )
    })


// Тест:  Available Resolutions положительная проверка
    it('should create video with valid data', async () => {
        const response = await request(app)
            .post('/videos')
            .send({
                title: 'Valid Title',
                author: 'Valid Author',
                availableResolutions: [AvailableResolutions.P144]
            });

        expect(response.status).toBe(HttpStatus.Created);
        expect(response.body).toMatchObject({
            title: 'Valid Title',
            author: 'Valid Author',
            availableResolutions: [AvailableResolutions.P144]
        });
    });
})





