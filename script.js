const myLibrary = [
    {
        title: "Harry Potter and the Philosopher's Stone",
        author: 'J.K. Rowling',
        pages: 223,
        read: true,
        id: 'a4e8b1c3-e1b7-41d4-aafe-012158805ee9'
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        pages: "281",
        read: false,
        id: '33626a83-a406-4717-aa06-b0461400cc4f'
    }
];

function Book(title, author, pages, read, id) {
    if (!new.target) {
        throw Error("Use new!");
    }

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

// addBookToLibrary("The Lion, the Witch and the Wardrobe", "C. S. Lewis", 172, false);
// console.log(myLibrary);