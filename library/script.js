const book1 = new Book("Sapiens: A Brief History of Humankind", "Yuval Noah Harari", 464, true);
const book2 = new Book("Frankenstein", "Mary Shelley", 216, false);

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) { 
    myLibrary.push(book); 
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function removeBookFromLibrary(index) { 
    myLibrary.splice(index, 1); 
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

const addBookBtn = document.querySelector(".addBtn");
const addFormBtn = document.querySelector(".addFormBtn");
const cancelFormBtn = document.querySelector(".cancelFormBtn");
const dialog = document.querySelector("dialog");
const div = document.querySelector("body > div:first-child");
const table = document.querySelector("table");

const dataDiv = document.createElement("div");
dataDiv.style.display = "none";

if (localStorage.getItem("myLibrary") === null) {
    myLibrary = [book1, book2];
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
} else {
    document.querySelector("#sample-one").parentNode.removeChild(document.querySelector("#sample-one"));
    document.querySelector("#sample-two").parentNode.removeChild(document.querySelector("#sample-two"));

    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));

    myLibrary.forEach((obj => {
        const tr = document.createElement("tr");

        const td2 = document.createElement("td");
        td2.textContent = obj.title;
        const td3 = document.createElement("td");
        td3.textContent = obj.author;
        const td4 = document.createElement("td");
        td4.textContent = obj.pages;
        const td5 = document.createElement("td");
        if (obj.read) {
            td5.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path fill=\"green\" d=\"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z\" /></svg>";
        } else {
            td5.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path fill=\"red\" d=\"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z\" /></svg>";
        }
        const td6 = document.createElement("td");
        td6.innerHTML = `<img src=\"./icons/pencil.svg\" alt=\"Edit icon\" data-index=\"${myLibrary.indexOf(obj)}\">`;
        const td7 = document.createElement("td");
        td7.innerHTML = `<img src=\"./icons/delete.svg\" alt=\"Delete icon\" data-index=\"${myLibrary.indexOf(obj)}\">`;

        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);

        table.appendChild(tr);
    }))
}

document.querySelectorAll("img[src$=\"delete.svg\"]").forEach(node => node.addEventListener("click", deleteBook));
document.querySelectorAll("img[src$=\"pencil.svg\"]").forEach(node => node.addEventListener("click", editBook));

addBookBtn.addEventListener("click", () => {
    dialog.show();

    if (screen.width > 890 && document.documentElement.clientWidth > 890) {
        div.style.marginTop = "-20rem";
    } else {
        dialog.style.marginTop = "-13rem";
    }

    addBookBtn.style.visibility = "hidden";
});

addFormBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (addFormBtn.textContent === "Add") {
        const tr = document.createElement("tr");

        const td2 = document.createElement("td");
        td2.textContent = document.querySelector("#title").value;
        const td3 = document.createElement("td");
        td3.textContent = document.querySelector("#author").value;
        const td4 = document.createElement("td");
        td4.textContent = document.querySelector("#pages").value;
        const td5 = document.createElement("td");
        if (document.querySelector("#read").checked) {
            td5.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path fill=\"green\" d=\"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z\" /></svg>";
        } else {
            td5.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path fill=\"red\" d=\"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z\" /></svg>";
        }
        const td6 = document.createElement("td");
        td6.innerHTML = `<img src=\"./icons/pencil.svg\" alt=\"Edit icon\" data-index=\"${myLibrary.length}\">`;
        const td7 = document.createElement("td");
        td7.innerHTML = `<img src=\"./icons/delete.svg\" alt=\"Delete icon\" data-index=\"${myLibrary.length}\">`;

        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);

        table.appendChild(tr);

        addBookToLibrary(new Book(document.querySelector("#title").value, document.querySelector("#author").value, document.querySelector("#pages").value, document.querySelector("#read").checked));
    }

    if (addFormBtn.textContent === "Replace") {
        const index = dataDiv.textContent;
        
        let title = document.querySelector("#title").value;
        let author = document.querySelector("#author").value;
        let pages = document.querySelector("#pages").value;
        let read = document.querySelector("#read").checked;
        
        const element = document.querySelector(`img[data-index=\"${index}\"]`);
        const elementGrandParent = element.parentNode.parentNode;
    
        let titleElement = Array.from(elementGrandParent.childNodes)[0];
        let authorElement = Array.from(elementGrandParent.childNodes)[1];
        let pagesElement = Array.from(elementGrandParent.childNodes)[2];
        let readElement = Array.from(elementGrandParent.childNodes)[3];
    
        if (Array.from(elementGrandParent.childNodes).length > 6) {
            titleElement = Array.from(elementGrandParent.childNodes)[1];
            authorElement = Array.from(elementGrandParent.childNodes)[3];
            pagesElement = Array.from(elementGrandParent.childNodes)[5];
            readElement = Array.from(elementGrandParent.childNodes)[7];
        } 
    
        titleElement.style.backgroundColor = "lightgray";
        authorElement.style.backgroundColor = "white";
        pagesElement.style.backgroundColor = "white";
        readElement.style.backgroundColor = "white";   

        titleElement.textContent = title;
        authorElement.textContent = author;
        pagesElement.textContent = pages;
        if (read) {
            readElement.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path fill=\"green\" d=\"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z\" /></svg>";
        } else {
            readElement.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path fill=\"red\" d=\"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z\" /></svg>";
        }

        myLibrary[index] = new Book(title, author, pages, read);
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
        addFormBtn.textContent = "Add";
    }

    document.querySelectorAll("input").forEach((node) => node.value = "");

    document.querySelectorAll("img[src$=\"delete.svg\"]").forEach(node => node.addEventListener("click", deleteBook));
    document.querySelectorAll("img[src$=\"pencil.svg\"]").forEach(node => node.addEventListener("click", editBook));
});

cancelFormBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (addFormBtn.textContent === "Replace") {
        const index = dataDiv.textContent;
        const element = document.querySelector(`img[data-index=\"${index}\"]`);
        const elementGrandParent = element.parentNode.parentNode;
    
        let titleElement = Array.from(elementGrandParent.childNodes)[0];
        let authorElement = Array.from(elementGrandParent.childNodes)[1];
        let pagesElement = Array.from(elementGrandParent.childNodes)[2];
        let readElement = Array.from(elementGrandParent.childNodes)[3];
    
        if (Array.from(elementGrandParent.childNodes).length > 6) {
            titleElement = Array.from(elementGrandParent.childNodes)[1];
            authorElement = Array.from(elementGrandParent.childNodes)[3];
            pagesElement = Array.from(elementGrandParent.childNodes)[5];
            readElement = Array.from(elementGrandParent.childNodes)[7];
        } 
    
        titleElement.style.backgroundColor = "lightgray";
        authorElement.style.backgroundColor = "white";
        pagesElement.style.backgroundColor = "white";
        readElement.style.backgroundColor = "white";   
        document.querySelectorAll("input").forEach((node) => node.value = "");
        addFormBtn.textContent = "Add";
    }

    dialog.close();

    div.style.marginTop = "0";
    addBookBtn.style.visibility = "visible";
})

function deleteBook(e) {
    const index = e.target.dataset.index;

    e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);

    updateIndices();

    removeBookFromLibrary(index);
}

function editBook(e) {
    const index = e.target.dataset.index;
    const tr = e.target.parentNode.parentNode;

    let titleElement = Array.from(tr.childNodes)[0];
    let authorElement = Array.from(tr.childNodes)[1];
    let pagesElement = Array.from(tr.childNodes)[2];
    let readElement = Array.from(tr.childNodes)[3];

    if (Array.from(tr.childNodes).length > 6) {
        titleElement = Array.from(tr.childNodes)[1];
        authorElement = Array.from(tr.childNodes)[3];
        pagesElement = Array.from(tr.childNodes)[5];
        readElement = Array.from(tr.childNodes)[7];
    } 

    titleElement.style.backgroundColor = "yellow";
    authorElement.style.backgroundColor = "yellow";
    pagesElement.style.backgroundColor = "yellow";
    readElement.style.backgroundColor = "yellow";

    let title = titleElement.textContent;
    let author = authorElement.textContent;
    let pages = pagesElement.textContent;
    let read = (readElement.childNodes[0].childNodes[0].getAttribute("fill") === "green") ? true : false;

    dialog.show();

    if (screen.width > 890 && document.documentElement.clientWidth > 890) {
        div.style.marginTop = "-20rem";
    } else {
        dialog.style.marginTop = "-13rem";
    }

    addBookBtn.style.visibility = "hidden";

    addFormBtn.textContent = "Replace";

    document.querySelector("#title").value = title;
    document.querySelector("#author").value = author;
    document.querySelector("#pages").value = pages;
    document.querySelector("#read").checked = read;

    dataDiv.textContent = index;
}

function updateIndices() {
    let trArray = Array.from(document.querySelectorAll("tr"));
    trArray.splice(0, 1);
    let count = 0;

    trArray.forEach((node) => {
        let img1 = node.querySelector("img[src$=\"delete.svg\"]");
        let img2 = node.querySelector("img[src$=\"pencil.svg\"]");

        img1.dataset.index = count;
        img2.dataset.index = count;
        count++;
    })
}