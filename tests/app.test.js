import app from "../src/app.js";
import request from 'supertest';



describe('GET products', () => {
    test('list all products', async () => {
        const response = await request(app)
            .get('/api/products')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toBeInstanceOf(Object);
            
    });

    test('one product', async () => {
        const response =  await request(app)
            .get('/api/products/id/9')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.data.id).toBe(9);
        
    });

    test('detail product', async () => {
        const response = await request(app)
            .get('/api/products/details/id/9')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body.data[0].product_id).toBe(9)
            
            
    });

    test('products for categories', async () => {
        const response = await request(app)
            .get('/api/products/categories')
            .expect('Content-Type', /json/)
            .expect(200);
        let categories = response.body.categories;
        expect(categories).toEqual(['guitar','efect','amplifier']);
        
    });
});