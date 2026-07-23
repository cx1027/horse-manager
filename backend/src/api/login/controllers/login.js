'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async login(ctx) {
    const { email, password } = ctx.request.body;

    if (!email || !password) {
      return ctx.throw(400, 'Email and password are required');
    }

    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: { email },
      populate: ['role'],
    });

    if (!user) {
      return ctx.throw(400, 'Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return ctx.throw(400, 'Invalid credentials');
    }

    const jwt = strapi.service('plugin::users-permissions.jwt').issue({ id: user.id });

    ctx.body = {
      jwt,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role?.type || user.role || 'user',
      },
    };
  },
};
