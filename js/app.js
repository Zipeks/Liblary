const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function Book(title, Author, pages, finished) {
    this.title = title;
    this.author = Author;
    this.pages = pages;
    this.finished = finished;
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

let myLibrary = [];

function addToLibrary(book) {
    myLibrary.push(book);
}

function removeFromLibrary(bookId) {
    myLibrary.splice(bookId, 1);
    storeBooks();
}

function getBooks() {
    for (let i = 0; i < localStorage.length / 4; i++) {
        const book = new Book(
            localStorage.getItem(`book_nr_${i}_title`),
            localStorage.getItem(`book_nr_${i}_author`),
            localStorage.getItem(`book_nr_${i}_pages`),
            localStorage.getItem(`book_nr_${i}_finished`));
        addToLibrary(book);
    }
}
getBooks();



function storeBooks() {
    localStorage.clear();
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        localStorage.setItem(`book_nr_${i}_title`, book.title);
        localStorage.setItem(`book_nr_${i}_author`, book.author);
        localStorage.setItem(`book_nr_${i}_pages`, book.pages);
        localStorage.setItem(`book_nr_${i}_finished`, book.finished);
    }
}

const Library = $('main');

function showBooks() {
    Library.innerHTML = '';
    for (let i = myLibrary.length - 1; i >= 0; i--) {
        const book = myLibrary[i];
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

        const finished = document.createElement('span');
        finished.innerText = 'Read:';

        const div = document.createElement('div');
        div.classList.add('bookStatus')
        div.appendChild(finished);
        div.appendChild(switcher);
        article.appendChild(div);

        const remove = document.createElement('button');
        remove.innerText = 'Remove book';
        remove.classList.add('removeBtn')
        remove.addEventListener('click', async function () {
            article.style.transition = '0.3s';
            article.style.opacity = '0';
            await sleep(300);
            await removeFromLibrary(i);

            article.remove();
        })

        article.appendChild(remove);

        Library.appendChild(article);

    }
}
showBooks();