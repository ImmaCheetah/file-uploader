const prisma = require('./prisma');

async function addUser() {
  const user = await prisma.user.create({
    data: {
      username: 'Big man',
      email: 'yey@email.com',
    }
  })

  console.log(user);
}

module.exports = {
  addUser
}