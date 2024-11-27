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

async function addFolder(name, ownerId) {
  const folder = await prisma.folder.create({
    data: {
      name: name,
      owner: {
        connect: {
          id: ownerId
        }
      } 
    }
  })

  console.log('This is the folder', folder);
  console.log(ownerId);
}

module.exports = {
  addUser,
  addFolder
}