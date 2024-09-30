class Library {

    constructor() {

        this.data = [
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

        this.$root = document.querySelector("#root");
        this.$modal = document.querySelector("#modal");
        this.$modalBackground = document.querySelector("#modal-bg");
        this.$form = document.querySelector("#add-form");
        this.$addButton = document.querySelector("#add-book");
        this.$saveButton = document.querySelector("#save-button");
        this.$closeModalButton = document.querySelector("#modal-close");
        this.$bookTitle = document.querySelector("#title");
        this.$bookAuthor = document.querySelector("#author");
        this.$bookPages = document.querySelector("#pages");
        this.$bookStatus = document.querySelector("#read");

        this.render();
        this.addEventListeners();
    }

    addEventListeners() {
        document.body.addEventListener("click", e => {
            this.deleteBook(e);
            this.toggleStatus(e);
        });

        this.$form.addEventListener("submit", e => {
            e.preventDefault();
            const title = this.$bookTitle.value;
            const author = this.$bookAuthor.value;
            const pages = this.$bookPages.value;
            const hasRead = this.$bookStatus.value;
            this.addBook({ title, author, pages, hasRead });
            this.$modal.style.display = "none";
            this.$modalBackground.style.display = "none";
        });

        this.$addButton.addEventListener("click", () => {
            this.$modal.style.display = "block";
            this.$modalBackground.style.display = "block";
        });

        this.$closeModalButton.addEventListener("click", () => {
            this.$modal.style.display = "none";
            this.$modalBackground.style.display = "none";
        });
    }

    addBook({ title, author, pages, hasRead }) {
        const newBook = {
            title,
            author,
            pages,
            hasRead,
            id: this.data.length > 0 ? this.data[this.data.length - 1].id + 1 : 1
        }

        this.data = [...this.data, newBook];
        this.render();
    }

    deleteBook(e) {
        e.stopPropagation();
        if (!e.target.matches(".remove-button")) return;
        const id = e.target.dataset.id;
        this.data = this.data.filter(book => book.id !== Number(id));
        this.render();
    }

    toggleStatus(e) {
        e.stopPropagation();
        if (!e.target.matches(".read-button")) return;
        const id = e.target.dataset.id;
        this.data = this.data.map(book =>
            book.id === Number(id) ? {
                ...book,
                hasRead: !book.hasRead
            } : book
        );
        this.render();
    }

    displayBooks() {
        if (this.data.length === 0) return this.$root.innerHTML = `<h3 class="empty">Looking a bit empty here...</h3>`;

        this.$root.innerHTML = this.data.map(({ title, author, pages, hasRead, id }) => {
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

    render() {
        this.displayBooks();
    }
}

new Library();