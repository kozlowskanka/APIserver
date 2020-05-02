const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/departments', () => {

    it('/ should return all concerts', () => {
  
    });
  
    it('/:id should return one concert by :id ', () => {
  
    });
  
    it('/performer/:performer should return one concert by performer', () => {
  
    });

    it('/genre/:genre should return one concert by genre', () => {
  
    });

    it('/day/:day should return concerts filtered by duration', () => {
  
    });

    it('/concerts/price/:price_min/:price_max should return concerts filtered by price', () => {
  
    });
  });