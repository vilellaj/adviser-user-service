const User = require('../models/user');
const chai = require('chai');
const should = chai.should();

process.env.NODE_ENV = 'test';

describe('Users', () => {
    beforeEach((done) => { //Before each test we empty the database
        done();
    });

  describe('Create a User', () => {
      it('it should Create a User', (done) => {
          const user = new User();
          user.should.be.a('object');
          done();
      });
  });
});