const prisma = require('./prisma');

async function getAllFolders() {
  const folders = await prisma.folder.findMany();

  return folders;
}

async function getAllFiles() {
  const files = await prisma.file.findMany();

  return files;
}

async function getAllFilesInFolder(folderId) {
  const files = await prisma.file.findMany({
    where: {
      folder: {
        id: folderId
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

async function uploadFile(name, filePath, size, folderId, ownerId) {
  const file = await prisma.file.create({
    data: {
      name: name,
      filePath: filePath,
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
  addFolder,
  updateFolder,
  deleteFolder,
  uploadFile
}