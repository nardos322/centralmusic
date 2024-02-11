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

    test('categories list', async () => {
        const response = await request(app)
            .get('/api/products/categories')
            .expect('Content-Type', /json/)
            .expect(200);
        let categories = response.body.categories;
        expect(categories).toEqual(['guitar','efect','amplifier']);
        
    });

    
});

describe('GET products for category', () => {

    test('products for category', async () => {
        const categories = ['amplifier', 'guitar', 'efect'];
        let productsList = [];

        for (let category of categories) {
            
            const response = await request(app)
                .get(`/api/products/categories/${category}`)
                .expect('Content-Type', /json/)
                .expect(200);
             productsList.push(response.body.data);
    
        }

      

        for (let i = 0; i < categories.length; i++){
            for (const product of productsList[i]){
                
                if(i == 0){
                    expect(product.category).toEqual('amplifier');
                } else if (i == 1){
                    expect(product.category).toEqual('guitar');
                } else if (i == 2){
                    expect(product.category).toEqual('efect');
                }   
            }
           
        }
    
        
    });

   
})