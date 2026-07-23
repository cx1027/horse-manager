'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async login(ctx) {
    const { email, password } = ctx.request.body;

    console.log('Login attempt:', { email, passwordLength: password ? password.length : 0 });

    if (!email || !password) {
      return ctx.throw(400, { message: 'Email and password are required' });
    }

    // Find user by email
    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: { email },
    });

    if (!user) {
      console.log('User not found:', email);
      return ctx.throw(400, { message: 'Invalid credentials' });
    }

    console.log('User found:', user.email, 'Password hash:', user.password.substring(0, 20) + '...');

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isValid);

    if (!isValid) {
      return ctx.throw(400, { message: 'Invalid credentials' });
    }

    // Check if user is blocked
    if (user.blocked) {
      return ctx.throw(403, { message: 'Your account has been blocked' });
    }

    // Get user role using native query
    let roleType = 'user';
    try {
      const dbConnection = strapi.db.connection;
      
      const result = await dbConnection('up_users as u')
        .leftJoin('up_users_role_lnk as ul', 'u.id', 'ul.user_id')
        .leftJoin('up_roles as r', 'ul.role_id', 'r.id')
        .select('r.type')
        .where('u.id', user.id)
        .first();
      
      if (result && result.type) {
        roleType = result.type;
      }
    } catch (e) {
      console.error('Error getting role:', e.message);
    }

    // Generate JWT token
    const jwt = strapi.plugin('users-permissions').services.jwt.issue({
      id: user.id,
      email: user.email,
      role: roleType,
    });

    ctx.body = {
      jwt,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: roleType,
      },
    };
  },
};
