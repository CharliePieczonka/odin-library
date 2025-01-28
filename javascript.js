const myLibrary = [];

class Book  {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    
    info() {
        let message = title + " by " + author + ", " + pages + " pages, ";
        
        if(this.read) {
            message += "read";
        }
        else {
            message += "not read";
        }
        
        return message;
    }

    toggleRead() {
        if(this.read) {
            this.read = false;
        }
        else {
           this.read = true;
        }
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayLibrary() {
    let main = document.querySelector("#main");
    main.innerHTML = "";

    myLibrary.forEach((book) => {
        let cardNum = document.createAttribute("cardNumber");
        cardNum.value = myLibrary.indexOf(book);
    
        let card = document.createElement("div");
        card.setAttribute("class", "card");
        card.setAttributeNode(cardNum);
    
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
    
        let readBook = document.createElement("div");
        readBook.setAttribute("class", "readBook");
        
        let toggleText = "";
        if(book.read) {
            readBook.textContent = "Read!";
            readBook.style.color = "green";
            toggleText = "Not Read?";
        }
        else {
            readBook.textContent = "Not Read.";
            readBook.style.color = "red";
            toggleText = "Read?";
        }
    
        card.appendChild(readBook);
    
        let cardFooter = document.createElement("div");
        cardFooter.setAttribute("class", "cardFooter");
    
        let toggleReadDiv = document.createElement("div");
        let deleteCardDiv = document.createElement("div");
    
        let toggleRead = document.createElement("button");
        toggleRead.setAttribute("class", "cardButton");
        toggleRead.setAttribute("onClick", "toggleRead(this)");
        toggleRead.textContent = toggleText;
        toggleReadDiv.appendChild(toggleRead);
    
        let deleteCard = document.createElement("button");
        deleteCard.setAttribute("class", "cardButton");
        deleteCard.setAttribute("onClick", "deleteCard(this)");
        deleteCard.textContent = "Delete";
        deleteCardDiv.appendChild(deleteCard);
    
        cardFooter.appendChild(toggleReadDiv);
        cardFooter.appendChild(deleteCardDiv);
        card.appendChild(cardFooter);
    
        main.appendChild(card);
    });
}

// deletes the book card from the library array and reloads the display
function deleteCard(button) {
    let cardNum = button.parentNode.parentNode.parentNode.getAttribute("cardnumber"); // not sure this is the most effective way but it works
    myLibrary.splice(cardNum, 1);
    displayLibrary();
}

// toggles the read information for the book and reloads the display
function toggleRead(button) {
    let cardNum = button.parentNode.parentNode.parentNode.getAttribute("cardnumber"); // not sure this is the most effective way but it works
    myLibrary[cardNum].toggleRead();
    displayLibrary();
}

// initial library filler
let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295", false);
let harryPotter = new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", "223", true);
let petSematary = new Book("Pet Sematary", "Stephen King", "374", true);
addBookToLibrary(theHobbit);
addBookToLibrary(harryPotter);
addBookToLibrary(petSematary);
displayLibrary();

myLibrary.forEach((book) => console.log(book.info()));

// adding a new book functionality
let dialog = document.querySelector("#enterBook");
let newBook = document.querySelector("#newBook");
let closeButton = document.querySelector("#cancelBook");
let confirmBtn = document.querySelector("#submitBook");

newBook.addEventListener("click", () => {
  dialog.showModal();
});

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault(); // We don't want to submit this fake form

    let message = document.querySelector(".message");
    let newTitle = document.querySelector("#title");
    let newAuthor = document.querySelector("#author");
    let newPages = document.querySelector("#pages");
    let newRead = document.querySelector("#read");

    if(newTitle.validity.valueMissing) {
        message.textContent = "The title is missing!";
    }
    else if (newAuthor.validity.valueMissing) {
        message.textContent = "The author is missing!";
    }
    else if (newPages.validity.rangeUnderflow) {
        message.textContent = "The number of pages is invalid!";
    }
    else {
        let newBook = new Book(newTitle.value, newAuthor.value, newPages.value, newRead.checked);
        addBookToLibrary(newBook);
    
        newTitle.value = "";
        newAuthor.value = "";
        newPages.value = "";
        newRead.checked = false;
        
        dialog.close();
        displayLibrary();
    }
});

// form validity would not let the cancel button work as before
closeButton.addEventListener("click", () => {
    dialog.close();
});
