const newBook = document.getElementById("new-book");
const addBook = document.getElementById("add-book");
const dialogBox = document.getElementById("dialog-box");
const bookForm = document.getElementById("book");
const imageInput = document.getElementById("cover-image");

const myLibrary = [
    new Book("ffde993e-a031-4e04-990d-50c00f5ba98c", "The Great Gatsby", "F. Scott Fitzgerald", 180, "./assets/the-great-gatsby.png", true),
    new Book("94bc1adf-a1b6-4d76-a48c-0eb18cc70872", "To Kill a Mockingbird", "Harper Lee", 171, "./assets/to-kill-a-mocking-bird.png", false)
];

newBook.addEventListener("click", () => {
    bookForm.reset();
    dialogBox.showModal();
});

addBook.addEventListener("click", (e) => {
    e.preventDefault();
    if (!bookForm.checkValidity()) {
        bookForm.reportValidity();
        return;
    }

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const coverImage = document.getElementById("cover-image").files[0];
    let imageSrc;
    if (coverImage) {
        imageSrc = URL.createObjectURL(coverImage);;
    } else {
        imageSrc = "./assets/sample-book.png";
    }
    const read = document.getElementById("have-read").checked;

    addBookToLibrary(title, author, pages, imageSrc, read);
    displayBooks(myLibrary);
    dialogBox.close();
});


function Book(id, title, author, pages, cover, read) {
    if (!new.target) {
        throw Error("Use new!");
    }

    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.cover = cover;
    this.read = read;
}

Book.prototype.Read = function () {
    return this.read = !this.read;
};

function addBookToLibrary(title, author, pages, cover, read) {
    const newBook = new Book(crypto.randomUUID(), title, author, pages, cover, read);
    myLibrary.push(newBook);
}

function deleteBook(btn) {
    const bookId = btn.parentElement.dataset.id;
    myLibrary.splice(myLibrary.indexOf(myLibrary.find((book) => bookId === book.id)), 1);
    displayBooks(myLibrary);
}

function displayBooks(array) {
    const container = document.getElementById("book-container");
    container.innerHTML = '';
    array.forEach(book => {
        const card = document.createElement("div");
        card.className = "card";
        card.setAttribute("data-id", book.id);

        const image = document.createElement("img");
        image.src = book.cover;
        image.alt = image.className = "cover-image";

        const title = document.createElement('h2');
        title.textContent = book.title;

        const author = document.createElement('p');
        author.textContent = book.author;

        const pages = document.createElement('p');
        pages.textContent = `${book.pages} pages`;

        const read = document.createElement('div');
        read.className = "read";
        const readLabel = document.createElement('label');
        readLabel.textContent = "Already Read";
        const readInput = document.createElement('input');
        readInput.type = "checkbox";
        readInput.addEventListener("change", () => { book.Read(); });
        if (book.read) {
            readInput.checked = true;
        } else {
            readInput.checked = false;
        }
        read.appendChild(readInput);
        read.appendChild(readLabel);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-book";
        deleteButton.setAttribute("onclick", "deleteBook(this)");

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        card.appendChild(deleteButton);
        container.appendChild(card);
    });
}

displayBooks(myLibrary);