const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { users } = require('../../database/models');
const app = require('../../api/app');
const loginMock = require('../mocks/loginMock');
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);
const { expect } = chai;

describe('users', () => {
  describe('POST /login', async() => {
    before(async () => {
      sinon.stub(users, 'findOne').resolves(loginMock.user);
      sinon.stub(jwt, 'sign').resolves('validToken');
    });

    after(() => {
      sinon.restore();
    });

    it('Verifica se os dados retornados estão corretos', async () => {
      const response = await chai.request(app).post('/login').send(loginMock.sucessfulLogin);

      expect(response.body).to.be.deep.equal(loginMock.validResponse);
      expect(response.status).to.be.equals(200);
    });
  });
});
