import { validateId } from '../../src/core/utils/error.utils';
import { videoCreateDtoValidation, videoUpdateDtoValidation } from '../../src/videos/validation/index';
import { VideoCreateDto, VideoUpdateDto } from '../../src/videos/dto/index';

import { AvailableResolutions } from '../../src/videos/types/video';
import { HttpStatus } from '../../src/core/consts/http-statuses';

import request from 'supertest';
import { setupApp } from '../../src/setup-app'; // путь к express-приложению
import express from 'express';

describe('Video API Update body validation check', () => {
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


//Тест: пустой title
it('should return 400 if title is empty - PUT /videos/:id', async () => {
    const response = await request(app)
        .put(`/videos/${createdVideoId}`)
        .send({
            title: '',
            author: 'Valid Author',
            availableResolutions: AvailableResolutions['P144'],
            canBeDownloaded: true,
            minAgeRestriction: 10,
            publicationDate: '2024-06-01T00:00:00.000Z',
        });
    expect(response.status).toBe(HttpStatus.BadRequest);
    expect(response.body.errorsMessages).toEqual(
        expect.arrayContaining([expect.objectContaining({ field: 'title' })])
    )
});


//Тест:  title слишком длинный
it('should return 400 if title is longer than 40 characters - PUT /videos/:id', async () => {
    const response = await request(app)
        .put(`/videos/${createdVideoId}`)
        .send({
            title: 'q'.repeat(41),
            author: 'Valid Author',
            availableResolutions: AvailableResolutions['P144'],
            canBeDownloaded: true,
            minAgeRestriction: 10,
            publicationDate: '2024-06-01T00:00:00.000Z',
        })
    expect(response.status).toBe(HttpStatus.BadRequest);
    expect(response.body.errorsMessages).toEqual(
        expect.arrayContaining([expect.objectContaining({ field: 'title' })])
    )
});


//Тест:  author слишком пустой 
it('should return 400 if autor is empty - PUT /videos/:id', async () => {

    const response = await request(app)
        .put(`/videos/${createdVideoId}`)
        .send({
            title: 'Valid Title',
            author: '',
            availableResolutions: AvailableResolutions['P144'],
            canBeDownloaded: true,
            minAgeRestriction: 10,
            publicationDate: '2024-06-01T00:00:00.000Z',
        })
    expect(response.status).toBe(HttpStatus.BadRequest)
    expect(response.body.errorsMessages).toEqual(
        expect.arrayContaining([expect.objectContaining({ field: 'author' })])
    )
});


//Тест:  author слишком длинный
it('should return 400 if author is longer than 20 characters - PUT /videos/:id', async () => {
    const response = await request(app)
        .put(`/videos/${createdVideoId}`)
        .send({
            title: 'Valid Title',
            author: 'q'.repeat(41),
            availableResolutions: AvailableResolutions['P144'],
            canBeDownloaded: true,
            minAgeRestriction: 10,
            publicationDate: '2024-06-01T00:00:00.000Z',
        })
    expect(response.status).toBe(HttpStatus.BadRequest)
    expect(response.body.errorsMessages).toEqual(
        expect.arrayContaining([expect.objectContaining({ field: 'author' })])
    )
});


//Тест:  Available Resolutions слишком не массив
it('should return 400 if availableResolutions is not  an array - PUT /videos/:id', async () => {
    const response = await request(app)
        .put(`/videos/${createdVideoId}`)
        .send({
            title: 'Valid Title',
            author: 'Valid Author',
            availableResolutions: 'Not an array',
            canBeDownloaded: true,
            minAgeRestriction: 10,
            publicationDate: '2024-06-01T00:00:00.000Z',
        })

    expect(response.status).toBe(HttpStatus.BadRequest);
    expect(response.body.errorsMessages).toEqual(
        expect.arrayContaining([expect.objectContaining({ field: 'availableResolutions' })])
    )
});


//Тест:  Available Resolutions слишком путой массив 
it('should return 400 if availableResolutions is empty array - PUT /videos/:id', async () => {
    const response = await request(app)
        .put(`/videos/${createdVideoId}`)
        .send({
            title: 'Valid Title',
            author: 'Valid Author',
            availableResolutions: [],
            canBeDownloaded: true,
            minAgeRestriction: 10,
            publicationDate: '2024-06-01T00:00:00.000Z',
        });

    expect(response.status).toBe(HttpStatus.BadRequest);
    expect(response.body.errorsMessages).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ field: 'availableResolutions' })
        ])
    )
});

//Тест:  Available Resolutions массив с недопустимым значением
it('should return 400 if availableResolutions contains invalid value - PUT /videos/:id', async () => {
    const response = await request(app)
        .put(`/videos/${createdVideoId}`)
        .send({
            title: 'Valid Title',
            author: 'Valid Author',
            availableResolutions: ['Invalid'],
            canBeDownloaded: true,
            minAgeRestriction: 10,
            publicationDate: '2024-06-01T00:00:00.000Z',

        })
    expect(response.status).toBe(HttpStatus.BadRequest)//<--- ПРОВЕРИТЬ ТЕСТОМ
    expect(response.body.errorsMessages).toEqual(
        expect.arrayContaining([expect.objectContaining({ field: 'availableResolutions' })])
    )
});


// Тест:  Available Resolutions положительная проверка
it('should return 204 if data is valid - PUT /videos/:id', async () => {
    const response = await request(app)
        .put(`/videos/${createdVideoId}`)
        .send({
            title: 'Updated Title',
            author: 'Updated  Author',
            availableResolutions: [AvailableResolutions.P720],
            canBeDownloaded: true,
            minAgeRestriction: 10,
            publicationDate: '2024-06-01T00:00:00.000Z',
        })
    expect(response.status).toBe(HttpStatus.NoContent);
});


//Тест: canBeDownloaded
it('should return 400 if canBeDownloaded is a boolen - PUT /videos/:id', async () => {
    const response = await request(app)
        .put(`/videos/${createdVideoId}`)
        .send({
            title: 'Valid Title',
            author: 'Valid Author',
            availableResolutions: [AvailableResolutions.P144],
            canBeDownloaded: '',
            minAgeRestriction: 10,
            publicationDate: '2024-06-01T00:00:00.000Z',
        })
    expect(response.status).toBe(HttpStatus.BadRequest);
    expect(response.body.errorsMessages).toEqual(
        expect.arrayContaining([expect.objectContaining({ field: 'canBeDownloaded' })])
    )
});

    //Тест:  minAgeRestriction 
    it('should return 400 if minAgeRestriction is out of range - PUT /videos/:id', async () => {
        const response = await request(app)
            .put(`/videos/${createdVideoId}`)
            .send({
                title: 'Valid Title',
                author: 'Valid Author',
                availableResolutions: [AvailableResolutions.P144],
                canBeDownloaded: true,
                minAgeRestriction: 0,
                publicationDate: '2024-06-01T00:00:00.000Z',
            })
        expect(response.status).toBe(HttpStatus.BadRequest);
        expect(response.body.errorsMessages).toEqual(
            expect.arrayContaining([expect.objectContaining({ field: 'minAgeRestriction' })])
        )
    });


    //Тест:  publicationDate 
    it('should return 400 if publicationDate is not string - PUT /videos/:id', async () => {
        const respons = await request(app)
            .put(`/videos/${createdVideoId}`)
            .send({
                title: 'Valid Title',
                author: 'Valid Author',
                availableResolutions: [AvailableResolutions.P144],
                canBeDownloaded: true,
                minAgeRestriction: 10,
                publicationDate: 20240601,
            })
        expect(respons.status).toBe(HttpStatus.BadRequest)
        expect(respons.body.errorsMessages).toEqual(expect.arrayContaining([expect.objectContaining({ field: 'publicationDate' })]))
    });

});
