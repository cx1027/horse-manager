'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const bcrypt = require('bcryptjs');

module.exports = createCoreController('plugin::users-permissions.user', ({ strapi }) => ({
  async registerWithRole(ctx) {
    const { username, email, password, role } = ctx.request.body;

    if (!username || !email || !password) {
      return ctx.throw(400, 'username, email, and password are required');
    }

    // 检查用户是否已存在
    const existingUser = await strapi.query('plugin::users-permissions.user').findOne({
      where: { email },
    });

    if (existingUser) {
      return ctx.throw(400, 'Email already exists');
    }

    // 查找要分配的角色
    let assignedRole = null;
    if (role) {
      assignedRole = await strapi.query('plugin::users-permissions.role').findOne({
        where: { type: role },
      });

      if (!assignedRole) {
        return ctx.throw(400, `Role '${role}' does not exist. Available roles: user, investor, staff`);
      }
    } else {
      assignedRole = await strapi.query('plugin::users-permissions.role').findOne({
        where: { type: 'user' },
      });
    }

    if (!assignedRole) {
      return ctx.throw(400, 'Default role not found');
    }

    try {
      // 哈希密码
      const hashedPassword = await bcrypt.hash(password, 10);

      // 使用 entityManager 创建用户
      const user = await strapi.db.query('plugin::users-permissions.user').create({
        data: {
          username,
          email,
          password: hashedPassword,
          role: assignedRole.id,
          provider: 'local',
        },
      });

      // 生成 JWT
      const jwt = await strapi.plugin('users-permissions').services.jwt.issue({ id: user.id });

      ctx.body = {
        jwt,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: role || 'user',
        },
      };
    } catch (err) {
      console.error('Registration error:', err);
      return ctx.throw(500, 'Registration failed: ' + err.message);
    }
  },
}));
