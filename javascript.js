const myLibrary = [];

function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        message = title + " by " + author + ", " + pages + " pages, ";
        
        if(read) {
            message += "already read";
        }
        else {
            message += "not read yet";
        }
        
        return message;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295", false);
harryPotter = new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", "223", true);
petSematary = new Book("Pet Sematary", "Stephen King", "374", true);
addBookToLibrary(theHobbit);
addBookToLibrary(harryPotter);
addBookToLibrary(petSematary);

myLibrary.forEach((book) => console.log(book.info()));


let main = document.querySelector("#main");

myLibrary.forEach((book) => {
    let card = document.createElement("div");
    card.setAttribute("class", "card");

    let cardTitle = document.createElement("div");
    cardTitle.setAttribute("class", "cardTitle");
    cardTitle.textContent = book.title;
    card.appendChild(cardTitle);

    let cardAuthor = document.createElement("div");
    cardAuthor.setAttribute("class", "cardAuthor");
    cardAuthor.textContent = book.author;
    card.appendChild(cardAuthor);

    let cardPages = document.createElement("div");
    cardPages.setAttribute("class", "cardPages");
    cardPages.textContent = book.pages;
    card.appendChild(cardPages);

    main.appendChild(card);
});

