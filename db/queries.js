const prisma = require('./prisma');

async function addUser(username, email, password) {
  const user = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: password,
    }
  })

  console.log(user);
}

module.exports = {
  addUser
}