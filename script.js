const newBook = document.getElementById("new-book");
const addBook = document.getElementById("add-book");
const dialogBox = document.getElementById("dialog-box");
const bookForm = document.getElementById("book");
const imageInput = document.getElementById("cover-image");
const deleteBook = document.getElementById("delete-book");

const myLibrary = [
    {
        id: "ffde993e-a031-4e04-990d-50c00f5ba98c",
        cover: "/assets/the-great-gatsby.png",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        pages: 180,
        read: true,
    },
    {
        id: "94bc1adf-a1b6-4d76-a48c-0eb18cc70872",
        cover: "/assets/to-kill-a-mocking-bird.png",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        pages: 171,
        read: false,
    },
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

function addBookToLibrary(title, author, pages, cover, read) {
    const newBook = new Book(crypto.randomUUID(), title, author, pages, cover, read);
    myLibrary.push(newBook);
}

function displayBooks(array) {
    const container = document.getElementById("book-container");
    container.innerHTML = '';
    array.forEach(book => {
        const card = document.createElement("div");
        card.className = "card";

        const image = document.createElement("img");
        image.src = book.cover;
        image.alt = image.className = "cover-image";

        const title = document.createElement('h2');
        title.textContent = book.title;

        const author = document.createElement('p');
        author.textContent = book.author;

        const pages = document.createElement('p');
        pages.textContent = `${book.pages} pages`;

        const read = document.createElement('p');
        read.textContent = book.read;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.className = deleteButton.id = "delete-book";

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