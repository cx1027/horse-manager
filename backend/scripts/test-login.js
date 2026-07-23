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

async function test() {
  // Test user
  const email = 'investor@test.com';
  
  const user = await knex('up_users').where('email', email).first();
  console.log('User:', user ? { id: user.id, email: user.email, username: user.username } : 'Not found');
  
  if (user) {
    // Get role link
    const roleLink = await knex('up_users_role_lnk').where('user_id', user.id).first();
    console.log('Role link:', roleLink);
    
    if (roleLink) {
      const role = await knex('up_roles').where('id', roleLink.role_id).first();
      console.log('Role:', role);
    }
  }
  
  await knex.destroy();
}

test();
