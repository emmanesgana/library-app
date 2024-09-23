let data = [
    {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear",
        pages: 320,
        hasRead: true
    },
    {
        id: 2,
        title: "Before the coffee gets cold",
        author: "Toshikazu Kawaguchi",
        pages: 272,
        hasRead: false
    },
    {
        id: 3,
        title: "More days at the Morisaki Bookshop",
        author: "Satoshi Yagisawa",
        pages: 176,
        hasRead: true
    }

]

let title = "";
let author = "";
let pages = 0;
let read = false;

const modal = document.getElementById("modal");
const modalBg = document.getElementById("modal-bg")
const form = document.getElementById("add-form")
const root = document.getElementById("root");
const addBookButton = document.getElementById("add-book");
const saveBookButton = document.getElementById("save-button")
const closeModalButton = document.getElementById("modal-close");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const bookPages = document.getElementById("pages");
const bookRead = document.getElementById("read");

document.body.addEventListener("click", e => {
    deleteBook(e);
    toggleRead(e);
});

form.addEventListener("submit", e => {
    e.preventDefault();
    const title = bookTitle.value;
    const author = bookAuthor.value;
    const pages = bookPages.value;
    const hasRead = bookRead.checked;
    saveBook({ title, author, pages, hasRead });
    modal.style.display = "none";
    modalBg.style.display = "none";
})

addBookButton.addEventListener("click", () => {
    modal.style.display = "block";
    modalBg.style.display = "block";

});

closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
    modalBg.style.display = "none";
});

function saveBook({ title, author, pages, hasRead }) {
    const newBook = {
        title,
        author,
        pages,
        hasRead,
        id: data.length > 0 ? data[data.length - 1].id + 1 : 1
    }
    data = [...data, newBook];
    renderBooks();
}

function deleteBook(e) {
    e.stopPropagation();
    if (!e.target.matches(".remove-button")) return;
    const id = e.target.dataset.id;
    data = data.filter(book => book.id !== Number(id));
    renderBooks();
}

function toggleRead(e) {
    e.stopPropagation();
    if (!e.target.matches(".read-button")) return;
    const id = e.target.dataset.id;
    data = data.map(book =>
        book.id === Number(id) ? {
            ...book,
            hasRead: !book.hasRead
        } : book
    );
    console.log(data)
    renderBooks();
}

function renderBooks() {
    if (data.length === 0) return root.innerHTML = `<h3 class="empty">Looking a bit empty here...</h3>`;

    root.innerHTML = data.map(({ title, author, pages, hasRead, id }) => {
        return `
            <div id="book" class="book" data-id="${id}">
                <h3 class="book-title">${title}</h3>
                <p><strong>Author:</strong> ${author.length > 0 ? author : 'N/A'}</p>
                <p><strong>Pages:</strong> ${pages}</p>
                <p><strong>Has read?</strong> ${hasRead ? "Yes" : "No"}</p>
                <div class="book-button">
                    <button id="read-button" class="read-button" data-id="${id}">Read</button>
                    <button id="remove-button" class="remove-button" data-id="${id}">Remove</button>
                </div>
            </div>
        `
    }).join("");
}

renderBooks()