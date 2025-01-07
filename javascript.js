const myLibrary = [];

function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        message = title + " by " + author + ", " + pages + " pages, ";
        
        if(this.read) {
            message += "read";
        }
        else {
            message += "not read";
        }
        
        return message;
    }

    this.toggleRead = function () {
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

myLibrary.forEach((book) => console.log(book.info()));

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

function toggleRead(button) {
    let cardNum = button.parentNode.parentNode.parentNode.getAttribute("cardnumber"); // not sure this is the most effective way but it works
    myLibrary[cardNum].toggleRead();
    displayLibrary();
}



theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295", false);
harryPotter = new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", "223", true);
petSematary = new Book("Pet Sematary", "Stephen King", "374", true);
addBookToLibrary(theHobbit);
addBookToLibrary(harryPotter);
addBookToLibrary(petSematary);
displayLibrary();


