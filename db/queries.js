const prisma = require('./prisma');

async function getAllFolders(userId) {
  const folders = await prisma.folder.findMany({
    where: {
      ownerId: userId
    }
  });

  return folders;
}

async function getAllFiles(userId) {
  const files = await prisma.file.findMany({
    where: {
      fileOwner: {
        id: userId
      }
    },
    include: {
      fileOwner: {
        select: {
          username: true
        }
      }
    }
  });
  
  return files;
}

async function getAllFilesInFolder(userId, folderId) {
  const files = await prisma.file.findMany({
    where: {
      folder: {
        id: folderId
      },
      fileOwnerId: userId
    },
    include: {
      fileOwner: {
        select: {
          username: true
        }
      }
    }
  });

  return files;
}

async function getFolder(userId, folderId) {
  const folder = await prisma.folder.findFirst({
    where: {
      id: folderId,
      ownerId: userId
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

async function findUserByEmail(email) {
  const user = await prisma.user.findFirst({
    where: {
      email: email
    }
  })
  
  return user;
}

async function updateFolder(folderId, newName) {
  await prisma.folder.update({
    where: {
      id: folderId
    },
    data: {
      name: newName,
    }
  })
}

async function deleteFolder(folderId) {
  const deleteFolder = await prisma.folder.delete({
    where: {
      id: folderId,
    }
  })
}

async function deleteFile(fileId) {
  await prisma.file.delete({
    where: {
      fileUuid: fileId
    }
  })
}

async function uploadFile(name, fileUuid, size, folderId, ownerId) {
  const file = await prisma.file.create({
    data: {
      name: name,
      fileUuid: fileUuid,
      fileSize: size,
      folder: {
        connect: {
          id: folderId
        }
      },
      fileOwner: {
        connect: {
          id: ownerId
        }
      },
    },
    include: {
      fileOwner: true
    }
  })
  return file;
}

module.exports = {
  getAllFolders,
  getAllFiles,
  getAllFilesInFolder,
  getFolder,
  addUser,
  findUserByEmail,
  addFolder,
  updateFolder,
  deleteFolder,
  uploadFile,
  deleteFile
}