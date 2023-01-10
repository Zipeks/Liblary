const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function Book(title, Author, pages, finished) {
    this.title = title;
    this.author = Author;
    this.pages = pages;
    this.finished = (finished == "true") ? true : false;
}
Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.finished}`
}
Book.prototype.read = function () {
    if (this.finished === true) {
        this.finished = false;
    } else {
        this.finished = true;
    }

    storeBooks();
}

let myLiblary = [];

function addToLiblary(book) {
    myLiblary.push(book)
}

function getBooks() {
    for (let i = 0; i < localStorage.length / 4; i++) {
        const book = new Book(
            localStorage.getItem(`book_nr_${i}_title`),
            localStorage.getItem(`book_nr_${i}_author`),
            localStorage.getItem(`book_nr_${i}_pages`),
            localStorage.getItem(`book_nr_${i}_finished`));
        addToLiblary(book);
    }
}
getBooks();



function storeBooks() {
    for (let i = 0; i < myLiblary.length; i++) {
        const book = myLiblary[i];
        localStorage.setItem(`book_nr_${i}_title`, book.title);
        localStorage.setItem(`book_nr_${i}_author`, book.author);
        localStorage.setItem(`book_nr_${i}_pages`, book.pages);
        localStorage.setItem(`book_nr_${i}_finished`, book.finished);
    }
}

const liblary = $('main');

function showBooks() {
    liblary.innerHTML = '';
    for (let i = 0; i < myLiblary.length; i++) {
        const book = myLiblary[i];
        const article = document.createElement("article");

        const title = document.createElement("h3");
        title.innerText = book.title;
        const author = document.createElement("p");
        author.innerText = `Written by: ${book.author}`;
        const pages = document.createElement("p");
        pages.innerText = `Pages: ${book.pages}`;

        article.appendChild(title);
        article.appendChild(author);
        article.appendChild(pages);

        const switcher = document.createElement('label');
        switcher.classList.add('switch');

        const cirle = document.createElement('input');
        cirle.setAttribute('type', 'checkbox');
        console.log(book.finished);
        console.log(cirle);

        if (book.finished) {
            cirle.checked = true;
        }
        cirle.addEventListener('change', () => {
            book.read();
        })
        const slider = document.createElement('span');
        slider.classList.add('slider', 'round');

        switcher.appendChild(cirle);
        switcher.appendChild(slider);

        article.appendChild(switcher);

        liblary.appendChild(article);

    }
}
showBooks();