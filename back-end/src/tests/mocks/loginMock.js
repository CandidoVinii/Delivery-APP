const loginMock = {
  user: {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    password: '1c37466c159755ce1fa181bd247cb925',
    role: 'customer',
  },

  sucessfulLogin: {
    email: 'zebirita@email.com',
    password: '1c37466c159755ce1fa181bd247cb925',
  },

  validResponse: {
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    role: 'customer',
    token: 'validToken',
  }
}

module.exports = loginMock;
