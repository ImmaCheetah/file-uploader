// THIS THROWS TYPE ERROR WHEN LOADED ON INDEX
// AS THERE IS NO UPDATE BUTTON
const updateModal = document.querySelector('.folder-rename-modal');
const updateBtn = document.querySelector('.folder-update-btn');
const updateCloseBtn = document.querySelector('.update-close-modal-btn');

updateBtn.onclick = function() {
  updateModal.style.display = "block";
}

updateCloseBtn.onclick = function() {
  updateModal.style.display = "none";
}
