const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.changeReadStatus = function() {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    const myBook = new Book(title, author, pages, read);
    myBook.idx = myLibrary.length;
    myLibrary.push(myBook);
}

function decreaseIndexes(arr, start) {
    for(const [k,v] of arr.entries()) {if(start < k) v.idx -= 1;}
}

function removeBookFromLibrary(idx) {
    decreaseIndexes(myLibrary, idx);
    myLibrary.splice(idx, 1);
}

function createCard(obj) {
    const template = document.querySelector("#card-template");
    const card = template.content.cloneNode(true);

    const title = card.querySelector("h3");
    const author = card.querySelector(".book-author>span");
    const pages = card.querySelector(".book-pages>span");
    const read = card.querySelector(".book-read>span");

    title.textContent = '"' + obj.title + '"';
    author.textContent = obj.author;
    pages.textContent = obj.pages;
    read.textContent = obj.read ? "Already read" : "Not read yet";

    card.querySelector(".card").setAttribute("data-idx", obj.idx);
    return card;
}

function showCards(arr) {
    const container = document.querySelector(".card-container");
    container.innerHTML = "";

    for (const book of arr) {const card = createCard(book); container.appendChild(card);}
}


document.querySelector(".card-container").addEventListener("click",
    (e) => {
        const target = e.target;
        const card = target.closest(".card");
        const idx = card.dataset.idx;
        console.log(idx);
        if(target.classList.contains("remove")){
            removeBookFromLibrary(idx);
            console.log("clicked remove");
        } else if(target.classList.contains("flip")){
            const book = myLibrary[idx];
            book.changeReadStatus();
            console.log("clicked change status");
        }
        showCards(myLibrary);
    }
);

const dummy1 = {title: "Title1", author: "Author1", pages: 12345, read: false};
const dummy2 = {title: "Title2", author: "Author2", pages: 67890, read: true};
const dummy3 = {title: "Title3", author: "Author3", pages: -1, read: false};
const dummy4 = {title: "Title4", author: "Author4", pages: 3.14, read: true};
const dummies = [dummy1, dummy2, dummy3, dummy4];

for(const dummy of dummies) {addBookToLibrary(...Object.values(dummy))};

showCards(myLibrary);