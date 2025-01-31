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
    const template = document.getElementById("card-template");
    const card = template.content.cloneNode(true);

    const title = card.querySelector("h3");
    const author = card.querySelector(".book-author>span");
    const pages = card.querySelector(".book-pages>span");
    const read = card.querySelector(".book-read>span");

    title.textContent = '"' + obj.title + '"';
    author.textContent = obj.author;
    pages.textContent = obj.pages;
    read.textContent = obj.read ? "Already read" : "Not read yet";

    return card;
}

function showCards(arr) {
    const container = document.querySelector(".card-container");
    arr.forEach((obj) => {const item = createCard(obj); container.appendChild(item);});
}

const dummy1 = {title: "Title1", author: "Author1", pages: 12345, read: false};
const dummy2 = {title: "Title2", author: "Author2", pages: 67890, read: true};
const dummy3 = {title: "Title3", author: "Author3", pages: -1, read: false};
const dummy4 = {title: "Title4", author: "Author4", pages: 3.14, read: true};

myLibrary.push(dummy1);
myLibrary.push(dummy2);
myLibrary.push(dummy3);
myLibrary.push(dummy4);

showCards(myLibrary);