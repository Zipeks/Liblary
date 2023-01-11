const newBookBtn = $('#newBookBtn');
const newBookDiv = $('.newBookDiv')
const blackBackgroud = $('.blackBackground');

newBookBtn.addEventListener('click', function () {
    newBookDiv.classList.add('active');
    blackBackgroud.classList.add('active');
})

document.addEventListener('click', function (event) {
    const isClick2 = newBookBtn.contains(event.target);
    const isClickInsideElement = newBookDiv.contains(event.target);
    if ((!isClickInsideElement) && (!isClick2)) {
        newBookDiv.classList.remove('active');
        blackBackgroud.classList.remove('active');
        // body.classList.remove('active');
        // dimmer.classList.remove('active');
    }
});

const addBookBtn = $('#addBook');
console.log(addBookBtn);
addBookBtn.addEventListener('click', function () {
    newBookDiv.classList.remove('active');
    blackBackgroud.classList.remove('active');
});


const newBookForm = $('#newBookForm');

addBookBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const title = $('#title').value;
    const author = $('#author').value;
    const pages = $('#pages').value;
    const read = $('#read').checked;

    const book = new Book(title, author, pages, read);
    addToLibrary(book);
    showBooks();
    storeBooks();
})

