const prisma = require('./prisma');

async function getAllFolders() {
  const folders = await prisma.folder.findMany();

  return folders;
}

async function getFolder(id) {
  const folder = await prisma.folder.findFirst({
    where: {
      id: id,
    }
  });

  return folder;
}

async function addUser(username, email, password) {
  const user = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: password,
    }
  })

  return user;
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

  return folder;
}

async function deleteFolder(folderId) {
  const folder = await prisma.folder.delete({
    where: {
      id: folderId,
    }
  })
}

module.exports = {
  getAllFolders,
  getFolder,
  addUser,
  addFolder,
  deleteFolder
}