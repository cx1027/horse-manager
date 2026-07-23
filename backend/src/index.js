'use strict';

const bcrypt = require('bcryptjs');

module.exports = async ({ strapi }) => {
  const testUsers = [
    {
      email: 'user@test.com',
      username: 'testuser',
      password: 'Test123456',
      role: 'user',
    },
    {
      email: 'investor@test.com',
      username: 'testinvestor',
      password: 'Test123456',
      role: 'investor',
    },
    {
      email: 'staff@test.com',
      username: 'teststaff',
      password: 'Test123456',
      role: 'staff',
    },
  ];

  for (const userData of testUsers) {
    const existingUser = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: { email: userData.email },
    });

    if (existingUser) {
      strapi.log.info(`User ${userData.email} already exists, skipping...`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const role = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: userData.role },
    });

    if (!role) {
      strapi.log.error(`Role '${userData.role}' not found!`);
      continue;
    }

    await strapi.db.query('plugin::users-permissions.user').create({
      data: {
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        role: role.id,
        provider: 'local',
        confirmed: true,
        blocked: false,
      },
    });

    strapi.log.info(`Created user: ${userData.email} with role: ${userData.role}`);
  }

  strapi.log.info('Test users seed completed!');
};
