import data from "./data.js"

const modal = document.getElementById("modal");
const modalBg = document.getElementById("modal-bg")
const root = document.getElementById("root");
const addBookButton = document.getElementById("add-book");
const closeModalButton = document.getElementById("modal-close");

function renderBooks(arr) {
    return arr.forEach(item => {
        return root.innerHTML += `
            <div id="book" class="book">
                <h3>${item.title}</h3>
            </div>
        `
    })
}

addBookButton.addEventListener("click", () => {
    modal.style.display = "block";
    modalBg.style.display = "block";

});
closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
    modalBg.style.display = "none";
});


renderBooks(data)