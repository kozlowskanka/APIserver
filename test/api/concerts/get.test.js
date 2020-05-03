const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert  = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

    before(async () => {

        const testConcertOne = new Concert({ 
            _id: '5d9f1140f10a81216cfd4408', 
            performer: 'Michael Jackson',
            genre: 'Pop',
            price: 45,
            day: 1,
            image: '/img/uploads/1fsd324fsdg.jpg'
        });
        await testConcertOne.save();
      
        const testConcertTwo = new Concert({ 
            _id: '5eaec49b47e59c2b340a8260', 
            performer: 'Sting',
            genre: 'Rock',
            price: 55,
            day: 2,
            image: '/img/uploads/2f342s4fsdg.jpg'
        });
        await testConcertTwo.save();

    });

    it('/ should return all concerts', async () => {
        const res = await request(server).get('/api/concerts');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });
  
    it('/:id should return one concert by :id ', async () => {
        const res = await request(server).get('/api/concerts/5d9f1140f10a81216cfd4408');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
    });
  
    it('/performer/:performer should return concert by performer', async () => {
        const res = await request(server).get('/api/concerts/performer/Michael Jackson');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(1);
    });

    it('/genre/:genre should return concert by genre', async () => {
        const res = await request(server).get('/api/concerts/genre/Pop');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(1); 
    });

    it('/day/:day should return concerts filtered by duration', async () => {
        const res = await request(server).get('/api/concerts/day/1');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(1);   
    });

    it('/concerts/price/:price_min/:price_max should return concerts filtered by price', async () => {
        const res = await request(server).get('/api/concerts/price/0/50');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(1);     
    });

    after(async () => {
        await Concert.deleteMany();
    });

  });