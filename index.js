const modal = document.getElementById("modal");
const modalBg = document.getElementById("modal-bg")
const addBookButton = document.getElementById("add-book");
const closeModalButton = document.getElementById("modal-close");

addBookButton.addEventListener("click", () => {
    modal.style.display = "block";
    modalBg.style.display = "block";

});
closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
    modalBg.style.display = "none";
});
