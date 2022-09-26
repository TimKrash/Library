let myLibrary = [];

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function removeBook(idx) {
  myLibrary = myLibrary.splice(idx, 1);

  let elemToRemove = document.querySelector("#card" + idx.toString());
  elemToRemove.remove();
}

function displayBooks() {
  let cardContainer = document.querySelector(".card-container");
  let newCard = document.createElement('div');
  let textTitle = document.createElement('div');
  textTitle.className = 'text title';
  let textAuthor = document.createElement('div');
  textAuthor.className = 'text author';
  let textPages = document.createElement('div');
  textPages.className = 'text pages';
  let buttonRead = document.createElement('button');
  let buttonRemove = document.createElement('button');
  buttonRemove.className = 'remove';
  buttonRemove.textContent = 'Remove book';

  myLibrary.forEach((book, idx) => {
    newCard.className = 'card';
    newCard.setAttribute('id', 'card' + idx.toString());
    textTitle.textContent = book.title;
    textAuthor.textContent = book.author;
    textPages.textContent = book.pages + " pages"
    if (book.read) {
      buttonRead.className = 'read yes';
      buttonRead.textContent = 'Have read';
    } else {
      buttonRead.className = 'read no';
      buttonRead.textContent = 'Have not read';
    }
  })

  newCard.appendChild(textTitle);
  newCard.appendChild(textAuthor);
  newCard.appendChild(textPages);
  newCard.appendChild(buttonRead);
  newCard.appendChild(buttonRemove);

  cardContainer.appendChild(newCard);

  buttonRead.addEventListener('click', e => {
    if (e.target.className.includes('yes')) {
      e.target.className = "read no";
      e.target.textContent = "Have not read";
    } else {
      e.target.className = "read yes";
      e.target.textContent = "Have read"
    }
  })

  buttonRemove.addEventListener('click', e => {
    removeBook(parseInt(e.target.parentElement.id.slice(4)));
  })
}

function addBookToLibrary(book) {
  myLibrary.push(book);

  displayBooks();
}

let modal = document.querySelector(".modal");
let addBookBtn = document.querySelector(".add-book");
let formElem = document.querySelector("form");

formElem.onsubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);

  // Build library object
  let newBook = new Book(formProps.author, formProps.title, formProps.pages, formProps.read);
  // Add to library
  addBookToLibrary(newBook);

  modal.style.display = "none";
  formElem.reset();
}

addBookBtn.onclick = function() {
  modal.style.display = "block";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
