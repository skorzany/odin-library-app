class Book {
  #idx;
  #title;
  #author;
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  changeReadStatus() {
    this.read = !this.read;
  }
  get idx() {
    return this.#idx;
  }
  set idx(n) {
    if (typeof n !== "number" || n < 0 || n % 1) {
      throw "Index must be a positive integer or 0";
    }
    this.#idx = n;
  }
  get title() {
    return this.#title;
  }
  set title(s) {
    s = s.toLowerCase().trim();
    this.#title = s.charAt(0).toUpperCase() + s.slice(1);
  }
  get author() {
    return this.#author;
  }
  set author(s) {
    const parts = s.toLowerCase().trim().split(" ");
    parts.forEach(
      (ele, idx) => (parts[idx] = ele.charAt(0).toUpperCase() + ele.slice(1))
    );
    this.#author = parts.join(" ");
  }
}

function addBookToLibrary(title, author, pages, read) {
  const myBook = new Book(title, author, pages, read);
  myBook.idx = myLibrary.length;
  myLibrary.push(myBook);
}

function decreaseIndexes(arr, start) {
  for (const [k, v] of arr.entries()) {
    if (start < k) v.idx -= 1;
  }
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

  title.textContent = `"${obj.title}"`;
  author.textContent = obj.author;
  pages.textContent = obj.pages;
  read.textContent = obj.read ? "Already read" : "Not read yet";

  card.querySelector(".card").setAttribute("data-idx", obj.idx);
  return card;
}

function showCards() {
  const container = document.querySelector(".card-container");
  if (!myLibrary.length) {
    container.classList.add("empty");
  } else container.classList.remove("empty");
  container.innerHTML = "";

  for (let i = myLibrary.length - 1; -1 < i; i--) {
    const card = createCard(myLibrary[i]);
    container.appendChild(card);
  }
}

function main() {
  const dialog = document.querySelector("dialog");
  const form = document.querySelector("form");
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const pagesError = document.querySelector(".pages-error");
  const inputs = document.querySelectorAll(
    "input[type='text'], input[type='number']"
  );
  const radioYes = document.querySelector("#yes");

  document.body.addEventListener("click", (e) => {
    const target = e.target;
    if (target.matches("button")) {
      if (target.matches(".book-btn")) {
        const card = target.closest(".card");
        const idx = card.dataset.idx;
        if (target.classList.contains("flip")) {
          const book = myLibrary[idx];
          book.changeReadStatus();
        } else removeBookFromLibrary(idx);
      } else dialog.showModal();
      showCards();
    }
  });

  title.addEventListener("input", () => {
    title.setCustomValidity("");
    if (title.value.trim().length === 0)
      title.setCustomValidity(
        "Title requires at least one non-whitespace character"
      );
  });

  author.addEventListener("input", () => {
    author.setCustomValidity("");
    if (author.value.trim().length === 0)
      author.setCustomValidity(
        "Author requires at least one non-whitespace character"
      );
  });

  pages.addEventListener("input", () => {
    pages.setCustomValidity("");
    pagesError.textContent = "";
    if (pages.value.includes("e")) {
      pagesError.textContent = "Exponential form is not allowed";
      pages.setCustomValidity("Enter a positive integer in decimal form");
    } else if (pages.value === "") {
      pagesError.textContent = "This is not a number";
    } else if (pages.validity.rangeUnderflow)
      pagesError.textContent = "Must be integer greater than 0";
  });

  form.addEventListener("submit", (e) => {
    addBookToLibrary(
      inputs[0].value,
      inputs[1].value,
      Number(inputs[2].value),
      radioYes.checked
    );
    [inputs[0].value, inputs[1].value, inputs[2].value] = ["", "", 1];
    showCards();
  });
}

const myLibrary = [];
main();
