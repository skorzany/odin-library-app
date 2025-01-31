const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const myBook = new Book(title, author, pages, read);
    myLibrary.push(myBook);
}

function createCard(obj) {
    const template = document.getElementById("#card-template");
    const card = template.content.cloneNode(true);

    const title = card.querySelector("h3");
    const author = card.querySelector(".book-author>span");
    const pages = card.querySelector(".book-pages>span");
    const read = card.querySelector(".book-read>span");

    title.textContent = obj.title;
    author.textContent = obj.author;
    pages.textContent = obj.pages;
    read.textContent = obj.read ? "Already read" : "Not read yet";

    return card;
}

function showCards(arr) {
    const container = document.querySelector(".card-container");
    arr.forEach((item) => {container.appendChild(item);});
}