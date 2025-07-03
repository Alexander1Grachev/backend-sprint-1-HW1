import { validateId } from '../../src/core/utils/error.utils';

import { VideoCreateDto, VideoUpdateDto } from '../../src/videos/dto/index';

import { AvailableResolutions } from '../../src/videos/types/video';
import { HttpStatus } from '../../src/core/consts/http-statuses';

import request from 'supertest';
import { setupApp } from '../../src/setup-app'; // путь к express-приложению
import express from 'express';


describe('Video API Id validation check', () => {
    const app = express();
    setupApp(app);
    let createdVideoId: string;

    // очищаем базу данных 
    beforeAll(async () => {
        await request(app).delete('/testing/all-data').expect(HttpStatus.NoContent);

        const response = await request(app)
            .post('/videos')
            .send({
                title: 'Valid title',
                author: 'Valid Author',
                availableResolutions: ['P144']
            });

        createdVideoId = response.body.id;
    });

/*Не нужна тк /videos/   --> интерпретируется как "/videos"
    it('should return 400 if id is empty', async () => {
        const response = await request(app)
            .get('/videos/  ') // Пустой id (из пробелов)
            .send();

        expect(response.status).toBe(HttpStatus.BadRequest);
        expect(response.body.errorsMessages).toEqual(
            expect.arrayContaining([expect.objectContaining({ field: 'id' })])
        );
    });*/

    it('should return 400 if id is not a number', async () => {
        const response = await request(app)
            .get('/videos/abc') // Строчный id 
            .send();
        expect(response.status).toBe(HttpStatus.BadRequest)
        expect(response.body.errorsMessages).toEqual(
            expect.arrayContaining([expect.objectContaining({ field: 'id' })])
        )
    });


    it('should return 400 if id is negative', async () => {
        const response = await request(app)
            .get('/videos/-10')
            .send();

        expect(response.status).toBe(HttpStatus.BadRequest);
        expect(response.body.errorsMessages).toEqual(
            expect.arrayContaining([expect.objectContaining({ field: 'id' })])
        );
    })

    it('should return 400 if id is a float', async () => {
        const response = await request(app)
            .get('/videos/1.5')
            .send()
        expect(response.status).toBe(HttpStatus.BadRequest);
        expect(response.body.errorsMessages).toEqual(
            expect.arrayContaining([expect.objectContaining({ field: 'id' })])
        );
    });

    it('should return 400 if id is less than 1', async () => {
        const response = await request(app)
            .get('/videos/0')
            .send()
        expect(response.status).toBe(HttpStatus.BadRequest);
        expect(response.body.errorsMessages).toEqual(
            expect.arrayContaining([expect.objectContaining({ field: 'id' })])
        );
    });

    it('should return 404  array if id is not found', async () => {
        const response = await request(app)
            .get('/videos/9999999')
            .send()
        expect(response.status).toBe(HttpStatus.NotFound);
    });

    it('should return 200 and video if id is valid and exists', async () => {
        const response = await request(app)
            .get(`/videos/${createdVideoId}`)
            .send();

        expect(response.status).toBe(HttpStatus.Ok);
        expect(response.body.id).toBe(createdVideoId);
    });

    // конец
});
