const modal = document.querySelector('.modal');
const newFolderBtn = document.querySelector('.new-folder-btn');
const closeBtn = document.querySelector('.close-modal-btn');

newFolderBtn.onclick = function() {
  modal.style.display = "block";
}

closeBtn.onclick = function() {
  modal.style.display = "none";
}
