function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.changeReadStatus = function() {
    this.read = !this.read;
    showCards();
}

function addBookToLibrary(title, author, pages, read) {
    const myBook = new Book(title, author, pages, read);
    myBook.idx = myLibrary.length;
    myLibrary.push(myBook);
    showCards();
}

function decreaseIndexes(arr, start) {
    for(const [k,v] of arr.entries()) {if(start < k) v.idx -= 1;}
}

function removeBookFromLibrary(idx) {
    decreaseIndexes(myLibrary, idx);
    myLibrary.splice(idx, 1);
    showCards();
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

function showCards() {
    const container = document.querySelector(".card-container");
    if(!myLibrary.length) {container.classList.add("empty")}
    else container.classList.remove("empty");
    container.innerHTML = "";

    for (const book of myLibrary) {const card = createCard(book); container.appendChild(card);}
    console.log('showed your cards');
}

function main() {
    const dialog = document.querySelector("dialog");
    const form = document.querySelector("form");
    const inputs = document.querySelectorAll("input[type='text'], input[type='number']");
    const radioYes = document.querySelector("#yes");
    showCards();

    document.body.addEventListener("click", (e) => {
        const target = e.target;
        if(target.matches("button")) {
            if(target.matches(".book-btn")) {
                const card = target.closest(".card");
                const idx = card.dataset.idx;
                if(target.classList.contains("flip")) {
                    const book = myLibrary[idx];
                    book.changeReadStatus();
                }
                else removeBookFromLibrary(idx);
            }
            else dialog.showModal();
        }
    });

    form.addEventListener("submit", () => {
        addBookToLibrary(inputs[0].value, inputs[1].value, inputs[2].value, radioYes.checked);
        [inputs[0].value, inputs[1].value, inputs[2].value] = ["", "", 1];
    });
}


var myLibrary = [];
main();