const myLibrary = [
    {
        id: "ffde993e-a031-4e04-990d-50c00f5ba98c",
        title: "The Great Gatsby", 
        author: "F. Scott Fitzgerald", 
        pages: 180, 
        read: true, 
    },
    { title: "To Kill a Mockingbird", author: "Harper Lee", pages: 171, read: false, id: "94bc1adf-a1b6-4d76-a48c-0eb18cc70872"},
];

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

function addBookToLibrary(title, author, pages, read) {
    const bookId = crypto.randomUUID();
    const newBook = new Book(title, author, pages, read, bookId);
    myLibrary.push(newBook);
}

function displayBooks(array) {
    const container = document.getElementById("bookContainer");
    container.innerHTML = '';
    array.forEach(book => {
        const card = document.createElement("div");
        card.className = "card";
        const title = document.createElement('h2');
        title.textContent = book.title;

        const author = document.createElement('p');
        author.textContent = book.author;

        const pages = document.createElement('p');
        pages.textContent = book.pages;

        const read = document.createElement('p');
        read.textContent = book.read;

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        container.appendChild(card);
    });
}

displayBooks(myLibrary);