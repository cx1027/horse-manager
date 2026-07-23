const bcrypt = require('bcryptjs');

async function seed() {
  const knex = require('knex')({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      database: 'horseapp',
      user: 'horseapp',
      password: 'horseapp123',
    },
  });

  try {
    // Create roles if they don't exist
    const roles = ['user', 'investor', 'staff'];
    
    for (const roleType of roles) {
      const exists = await knex('up_roles').where('type', roleType).first();
      if (!exists) {
        await knex('up_roles').insert({
          name: roleType.charAt(0).toUpperCase() + roleType.slice(1),
          type: roleType,
          description: `Auto-generated ${roleType} role`,
          created_at: new Date(),
          updated_at: new Date(),
        });
        console.log(`Created role: ${roleType}`);
      } else {
        console.log(`Role ${roleType} already exists`);
      }
    }

    // Get role IDs
    const userRole = await knex('up_roles').where('type', 'user').first();
    const investorRole = await knex('up_roles').where('type', 'investor').first();
    const staffRole = await knex('up_roles').where('type', 'staff').first();

    // Create test users
    const testUsers = [
      { email: 'user@test.com', username: 'testuser', password: 'Test123456', roleId: userRole.id },
      { email: 'investor@test.com', username: 'testinvestor', password: 'Test123456', roleId: investorRole.id },
      { email: 'staff@test.com', username: 'teststaff', password: 'Test123456', roleId: staffRole.id },
    ];

    for (const user of testUsers) {
      let dbUser = await knex('up_users').where('email', user.email).first();
      
      if (!dbUser) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const result = await knex('up_users').insert({
          email: user.email,
          username: user.username,
          password: hashedPassword,
          provider: 'local',
          confirmed: true,
          blocked: false,
          created_at: new Date(),
          updated_at: new Date(),
        }).returning('id');
        
        dbUser = { id: result[0].id };
        console.log(`Created user: ${user.email}`);
      } else {
        console.log(`User ${user.email} already exists`);
      }
      
      // Check if role link exists, if not create it
      const linkExists = await knex('up_users_role_lnk')
        .where('user_id', dbUser.id)
        .where('role_id', user.roleId)
        .first();
      
      if (!linkExists) {
        await knex('up_users_role_lnk').insert({
          user_id: dbUser.id,
          role_id: user.roleId,
        });
        console.log(`Linked ${user.email} to role ID: ${user.roleId}`);
      }
    }

    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await knex.destroy();
  }
}

seed();
