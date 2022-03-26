// LocalStorage Key
const bookListKey = "BOOK-LIST-KEY";
const bookInProgressKey = "BOOK-IN-PROGRESS-KEY";
const bookCompleted = "BOOK-COMPLETED";

// Get Parent Elements
const containerThemeLight = document.getElementById('container-theme-light');
const containerThemeDark = document.getElementById('container-theme-dark');
const checkThemeLight = document.getElementById('check-theme-light');
const checkThemeDark = document.getElementById('check-theme-dark');
const btnAddActivity = document.getElementById('add-book');
const containerTodoBook = document.getElementById('container-todo-book');
const containerBookRead = document.getElementById('container-book-read');
const containerBookDone = document.getElementById('container-book-done');

window.addEventListener('load', () => {
    if(typeof(Storage) !== undefined){
        let dataBookList = localStorage.getItem(bookListKey);
        let dataBookInProgress = localStorage.getItem(bookInProgressKey);
        let dataBookCompleted = localStorage.getItem(bookCompleted);

        if(!dataBookList){
            localStorage.setItem(bookListKey, "");
        }else{
            let arrBookList = dataBookList.split(', ');
            for(let elm of arrBookList){
                let jsonObj;
                if(elm){
                    jsonObj = JSON.parse(elm);
                    if(jsonObj){
                        if(jsonObj.bookList){
                            settingUpBookList(jsonObj);
                        }
                    }
                }
            }
        }
        if(!dataBookInProgress){
            localStorage.setItem(bookInProgressKey, "");
        }
        if(!dataBookCompleted){
            localStorage.setItem(bookCompleted, "");
        }
    }else{
        alert('Sorry, Some of the functionality on this page may not work due to your browser does not support Web Storage');
    }
});

function settingUpBookList(json){
    let classSign = json.id;
    let elmtInput = document.createElement('div');
    elmtInput.classList.add("d-flex");
    elmtInput.classList.add('flex-row');
    elmtInput.classList.add('justify-content-between');
    elmtInput.classList.add('list-todo-book');
    elmtInput.classList.add(classSign);
    elmtInput.classList.add('p-2');
    elmtInput.classList.add('mt-2');
    elmtInput.setAttribute('id', 'child-list');
    let inputBook = `
        <div class="container-fluid disp-none">
            <div class="row">
                <div class="col-sm-7">
                    <div class="form-group mt-1 disp-none" id="inputBookTitle">
                        <label for="exampleInputEmail1" style="color:black;">Book Title</label>
                        <input type="text" class="disp-none form-control inputTodoBook inputBookTitle" placeholder="Book Title">
                        <small class="form-text text-muted disp-none clr-warning inputHelp">Please fill book title before add it to book list!</small>
                    </div>
                    <div class="form-group mt-2 disp-none" id="inputBookAuthor">
                        <label for="exampleInputEmail1" style="color:black;">Book's Author</label>
                        <input type="text" class="disp-none form-control inputTodoBook inputBookAuthor" placeholder="Book's Author">
                        <small class="form-text text-muted disp-none clr-warning inputHelp">Please fill book's author before add it to book list!</small>
                    </div>
                    <div class="form-group mt-2 disp-none" id="inputYearPublished">
                        <label for="exampleInputEmail1" style="color:black;">Year Published</label>
                        <input type="text" class="disp-none form-control inputTodoBook inputYearPublished" placeholder="Year Published">
                        <small class="form-text text-muted disp-none clr-warning inputHelp">Please fill year published before add it to book list!</small>
                    </div>
                    <small class="form-text text-muted disp-none clr-warning inputHelpWarning">Please fill all forms before add it to book list!</small>
                </div>
                <div class="col-sm-5">
                    <div class="d-flex flex-row justify-content-end btnFunctionality mt-1">
                        <div class="add-book-title" onclick="accTodoBook()">
                            <img src="./check-theme-dark.png" alt="Add" class="check-add-todo">
                        </div>
                        <div class="remove-book-title ml-2" id="cancel-todo-book" onclick="removeTodoBook()">
                            <img src="./cancel-todo.png" alt="remove" class="cancel-todo">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex flex-column justify-content-center container-text-result">
            <div class="align-self-start mt-3 bookTitleText pr-2">
                <p class="text-book-title" style="color: black">${json.title}</p>
            </div>
            <div class="align-self-start mt-1 d-flex flex-row justify-content-start container-decoration">
                <div class="bookAuthorText">
                    <p class="text-special container-book-author">${json.author}</p>
                </div>
                <div class="yearPublishedText ml-2">
                    <p class="text-special container-year-published">${json.year}</p>
                </div>
            </div>
        </div>
        <div class="d-flex flex-row justify-content-start container-edit-read align-self-center">
            <div class="edit-book-title" onclick="editBook()">
                <img src="./edit-book.png" alt="Edit" class="edit-book">
            </div>
            <div class="read-book ml-2" onclick="readBook()">
                <img src="./read_a_book.png" alt="Edit" class="read-book-img">
            </div>
        </div>
    `;
    elmtInput.innerHTML = inputBook;
    containerTodoBook.appendChild(elmtInput);
}   

//DONE WORKING
function generateClassSign(){
    let timeStamps = +new Date();
    return `container-${timeStamps}`;
}

// DONE WORKING
function searchChildIndex(parent, className){
    let idx = 0;
    for(let elm of parent){
        if(elm.classList != undefined){
            if(elm.classList.contains(className)){
                return idx;
            }
        }
        idx += 1;
    }
}

// DONE
function removeTodoBook(){
    let evt = window.event.target;
    let listClass = evt.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.classList;
    let idxContainer = searchChildIndex(evt.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes, listClass[4]);
    containerTodoBook.removeChild(containerTodoBook.childNodes[idxContainer]);
}

//DONE
function accTodoBook(){
    let evt = window.event.target;
    let listClass = evt.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.classList;
    listClass = listClass[4];

    let inputBookTitle = document.querySelector(`#child-list.${listClass} .form-group .inputBookTitle`);
    let inputBookAuthor = document.querySelector(`#child-list.${listClass} .form-group .inputBookAuthor`);
    let inputYearPublished = document.querySelector(`#child-list.${listClass} .form-group .inputYearPublished`);
    let containerBookTitle = document.querySelector(`#child-list.${listClass} .bookTitleText`);
    let containerBookAuthor = document.querySelector(`#child-list.${listClass} .bookAuthorText`);
    let containerYearPublished = document.querySelector(`#child-list.${listClass} .yearPublishedText`);
    let containerBtn = document.querySelector(`#child-list.${listClass} .btnFunctionality`);
    let inputHelp = document.querySelector(`#child-list.${listClass} .col-sm-7 .inputHelpWarning`);
    let mainContainer = document.querySelector(`#child-list.${listClass} .container-fluid`);
    let containerEditRead = document.querySelector(`#child-list.${listClass} .container-edit-read`);
    let containerInputBookTitle = document.querySelector(`#child-list.${listClass} #inputBookTitle`);
    let containerInputBookAuthor = document.querySelector(`#child-list.${listClass} #inputBookAuthor`);
    let containerInputYearPublished = document.querySelector(`#child-list.${listClass} #inputYearPublished`);
    let containerTextResult = document.querySelector(`#child-list.${listClass} .container-text-result`);
    let containerDecoration = document.querySelector(`#child-list.${listClass} .container-decoration`);
    let bookAuthorTag = document.querySelector(`#child-list.${listClass} .container-text-result .container-decoration .bookAuthorText`);
    let yearPublishedTag = document.querySelector(`#child-list.${listClass} .container-text-result .container-decoration .yearPublishedText`);
    let cardContainer = document.querySelector(`#child-list.${listClass}`);

    let valBookTitle = inputBookTitle.value;
    let valBookAuthor = inputBookAuthor.value;
    let valYearPublished = inputYearPublished.value;

    if(valBookTitle && valBookAuthor && valYearPublished){
        if(!inputHelp.classList.contains('disp-none')){
            inputHelp.classList.add('disp-none');
        }

        if(containerBookTitle.hasChildNodes()){
            containerBookTitle.removeChild(containerBookTitle.lastChild);
        }

        if(bookAuthorTag.hasChildNodes()){
            bookAuthorTag.removeChild(bookAuthorTag.lastChild);
        }

        if(yearPublishedTag.hasChildNodes()){
            yearPublishedTag.removeChild(yearPublishedTag.lastChild);
        }

        let dataBookList = localStorage.getItem(bookListKey);
        if(dataBookList){
            let arrBookList = dataBookList.split(', ');
            let addToLocal = true;
            for(let elm of arrBookList){
                let jsonObj;
                if(elm){
                    jsonObj = JSON.parse(elm);
                    if(jsonObj.id === listClass){
                        addToLocal = false;
                    }
                }
            }

            if(addToLocal){
                let dataJson = {
                    id: listClass,
                    title: valBookTitle,
                    author: valBookAuthor,
                    year: valYearPublished,
                    isComplete: false,
                    bookList: true,
                };
                dataJson = JSON.stringify(dataJson);
                dataBookList += dataJson;
                dataBookList += ", ";
                localStorage.setItem(bookListKey, dataBookList);
            }
        }else{
            let dataJson = {
                id: listClass,
                title: valBookTitle,
                author: valBookAuthor,
                year: valYearPublished,
                isComplete: false,
                bookList: true,
            };
            dataJson = JSON.stringify(dataJson);
            dataBookList += dataJson;
            dataBookList += ", ";
            localStorage.setItem(bookListKey, dataBookList);
        }


        let bookTitle = document.createElement('p');
        bookTitle.classList.add('text-book-title')
        bookTitle.setAttribute('style', "color: black");
        containerBtn.classList.add('disp-none-impt');
        bookTitle.innerText = valBookTitle;
        let bookAuthor = document.createElement('p');
        bookAuthor.classList.add('text-special');
        bookAuthor.classList.add('container-book-author');
        bookAuthor.innerText = valBookAuthor;
        let yearPublished = document.createElement('p');
        yearPublished.classList.add('text-special');
        yearPublished.classList.add('container-year-published');
        yearPublished.innerText = valYearPublished;

        containerBookTitle.appendChild(bookTitle);
        containerBookAuthor.appendChild(bookAuthor);
        containerYearPublished.appendChild(yearPublished);
        inputBookTitle.value = "";
        inputBookAuthor.value = "";
        inputYearPublished.value = "";

        inputBookTitle.classList.add('disp-none');
        inputBookAuthor.classList.add('disp-none');
        containerInputBookTitle.classList.add('disp-none');
        containerInputBookAuthor.classList.add('disp-none');
        containerInputYearPublished.classList.add('disp-none');
        mainContainer.classList.add('disp-none');
        cardContainer.classList.remove('box-shadow-card');
        containerDecoration.classList.remove('disp-none');
        containerTextResult.classList.remove('disp-none-impt');
        inputYearPublished.classList.add('disp-none');
        containerBookTitle.classList.remove('disp-none');
        containerEditRead.classList.remove('disp-none-impt');
    }else{
        inputHelp.classList.remove('disp-none');
    }
}

//DONE
function editBook(){
    let evt = window.event.target;
    let listClass = evt.parentNode.parentNode.parentNode.classList;
    listClass = listClass[4];

    let inputBookTitle = document.querySelector(`#child-list.${listClass} .form-group .inputBookTitle`);
    let inputBookAuthor = document.querySelector(`#child-list.${listClass} .form-group .inputBookAuthor`);
    let inputYearPublished = document.querySelector(`#child-list.${listClass} .form-group .inputYearPublished`);
    let containerBookTitle = document.querySelector(`#child-list.${listClass} .bookTitleText`);
    let containerBookAuthor = document.querySelector(`#child-list.${listClass} .bookAuthorText`);
    let containerYearPublished = document.querySelector(`#child-list.${listClass} .yearPublishedText`);
    let containerBtn = document.querySelector(`#child-list.${listClass} .btnFunctionality`);
    let mainContainer = document.querySelector(`#child-list.${listClass} .container-fluid`);
    let containerEditRead = document.querySelector(`#child-list.${listClass} .container-edit-read`);
    let containerInputBookTitle = document.querySelector(`#child-list.${listClass} #inputBookTitle`);
    let containerInputBookAuthor = document.querySelector(`#child-list.${listClass} #inputBookAuthor`);
    let containerInputYearPublished = document.querySelector(`#child-list.${listClass} #inputYearPublished`);
    let containerTextResult = document.querySelector(`#child-list.${listClass} .container-text-result`);
    let cardContainer = document.querySelector(`#child-list.${listClass}`);
    let valBookTitle = (containerBookTitle.childNodes[0].innerText == undefined) ? containerBookTitle.childNodes[1].innerText  : containerBookTitle.childNodes[0].innerText;
    let valBookAuthor = (containerBookAuthor.childNodes[0].innerText == undefined) ? containerBookAuthor.childNodes[1].innerText : containerBookAuthor.childNodes[0].innerText;
    let valYearPublished = (containerYearPublished.childNodes[0].innerText == undefined) ? containerBookAuthor.childNodes[1].innerText : containerBookAuthor.childNodes[0].innerText;
    
    containerTextResult.classList.add('disp-none-impt');
    containerEditRead.classList.add('disp-none-impt');
    mainContainer.classList.remove('disp-none');
    containerInputBookTitle.classList.remove('disp-none');
    containerInputBookAuthor.classList.remove('disp-none');
    containerInputYearPublished.classList.remove('disp-none');
    inputBookTitle.classList.remove('disp-none');
    inputBookAuthor.classList.remove('disp-none');
    cardContainer.classList.add('box-shadow-card');
    inputYearPublished.classList.remove('disp-none');
    containerBtn.classList.remove('disp-none-impt');

    inputBookTitle.value = valBookTitle;
    inputBookAuthor.value = valBookAuthor;
    inputYearPublished.value = valYearPublished;
}

// DONE
function cancelProgressBook(){
    let evt = window.event.target;
    let listClass = evt.parentNode.parentNode.parentNode.parentNode.parentNode.classList;
    listClass = listClass[4];
    let idxContainer = searchChildIndex(evt.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes, listClass);
    containerBookRead.removeChild(containerBookRead.childNodes[idxContainer]);
}

// DONE
function readBook(){
    let evt = window.event.target;
    let listClass = evt.parentNode.parentNode.parentNode.classList;
    listClass = listClass[4];
    
    const bookTitle = document.querySelector(`#child-list.${listClass} .container-text-result .bookTitleText`);
    const bookAuthor = document.querySelector(`#child-list.${listClass} .container-text-result .container-decoration .bookAuthorText`);
    const yearPublished = document.querySelector(`#child-list.${listClass} .container-text-result .container-decoration .yearPublishedText`);

    let valBookTitle = bookTitle.innerText;
    let valBookAuthor = bookAuthor.innerText;
    let valYearPublished = yearPublished.innerText;

    let classSign = generateClassSign();
    let elmBookRead = document.createElement('div');
    elmBookRead.classList.add('d-flex');
    elmBookRead.classList.add('flex-row');
    elmBookRead.classList.add('justify-content-between');
    elmBookRead.classList.add('list-book-read');
    elmBookRead.classList.add(classSign);
    elmBookRead.classList.add('p-2');
    elmBookRead.classList.add('mt-2');
    elmBookRead.setAttribute('id', 'child-list-book-read');

    let bookReadInner = `
        <div class="container-fluid">
            <div class="row">
                <div class="col-7">
                    <div class="container-detail-book-read">
                        <p class="text-book-title-read text-start" style="color: black;">${valBookTitle}</p>
                        <div class="d-flex flex-row justify-content-start book-detail-read">
                            <div class="align-self-center book-author-read">
                                <p class="container-book-author-read">${valBookAuthor}</p>
                            </div>
                            <div class="align-self-center ml-2 year-published-read">
                                <p class="container-year-published-read">${valYearPublished}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-5 d-flex flex-row justify-content-end">
                    <div class="btn-check-done align-self-center" onclick="bookDoneRead()">
                        <img src="./check-theme-dark.png" alt="Add" class="check-to-done">
                    </div>
                    <div class="btn-uncheck align-self-center ml-2" onclick="cancelProgressBook()">
                        <img src="./cancel-todo.png" alt="remove" class="cancel-todo">
                    </div>
                </div>
            </div>
        </div>
    `;

    elmBookRead.innerHTML = bookReadInner;
    containerBookRead.appendChild(elmBookRead);
}

//DONE
function cancelDone(){
    let evt = window.event.target;
    let listClass = evt.parentNode.parentNode.parentNode.parentNode.parentNode.classList;
    listClass = listClass[4];
    let idxToRemove = searchChildIndex(evt.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes, listClass);
    containerBookDone.removeChild(containerBookDone.childNodes[idxToRemove]);
}

//DONE
function bookDoneRead(){
    let evt = window.event.target;
    let listClass = evt.parentNode.parentNode.parentNode.parentNode.parentNode.classList;
    listClass = listClass[4];

    const bookTitle = document.querySelector(`#child-list-book-read.${listClass} .container-fluid .row .container-detail-book-read .text-book-title-read`);
    const bookAuthor = document.querySelector(`#child-list-book-read.${listClass} .container-fluid .row .container-detail-book-read .book-detail-read .book-author-read .container-book-author-read`);
    const yearPublished = document.querySelector(`#child-list-book-read.${listClass} .container-fluid .row .container-detail-book-read .book-detail-read .year-published-read  .container-year-published-read`);

    let valBookTitle = bookTitle.innerText;
    let valBookAuthor = bookAuthor.innerText;
    let valYearPublished = yearPublished.innerText;

    let classSign = generateClassSign();
    let elmBookDone = document.createElement('div');
    elmBookDone.classList.add('d-flex');
    elmBookDone.classList.add('flex-row');
    elmBookDone.classList.add('justify-content-between');
    elmBookDone.classList.add('list-book-done');
    elmBookDone.classList.add(classSign);
    elmBookDone.classList.add('p-2');
    elmBookDone.classList.add('mt-2');
    elmBookDone.setAttribute('id', 'child-list-book-done');

    let bookDoneInner = `
    <div class="container-fluid">
    <div class="row">
        <div class="col-7">
            <div class="container-detail-book-done">
                <p class="text-book-title-done text-start" style="color: black;">${valBookTitle}</p>
                <div class="d-flex flex-row justify-content-start book-detail-done">
                    <div class="align-self-center book-author-done">
                        <p class="container-book-author-done">${valBookAuthor}</p>
                    </div>
                    <div class="align-self-center ml-2 year-published-done">
                        <p class="container-year-published-done">${valYearPublished}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-5 d-flex flex-row justify-content-end">
                <div class="btn-uncheck align-self-center ml-2" onclick="cancelDone()">
                    <img src="./cancel-todo.png" alt="remove" class="cancel-todo">
                </div>
            </div>
        </div>
    </div>
    `;

    elmBookDone.innerHTML = bookDoneInner;
    containerBookDone.appendChild(elmBookDone);
}

//DONE
containerThemeLight.addEventListener('click', () => {
    checkThemeLight.classList.remove('disp-none');
    checkThemeDark.classList.add('disp-none');

    const body = document.querySelector('body');
    const footer = document.querySelector('footer');
    body.style.backgroundColor = "#b6f0db";
    body.style.color = "black";
    footer.style.backgroundColor = "#0c1670";
    footer.style.color = "white";
});

//DONE
containerThemeDark.addEventListener('click', () => {
    checkThemeDark.classList.remove('disp-none');
    checkThemeLight.classList.add('disp-none');

    const body = document.querySelector('body');
    const headerSpecial = document.querySelectorAll('.change-theme');
    const footer = document.querySelector('footer');
    body.style.backgroundColor = "#0c1670";
    body.style.color = "white";
    for(let elm of headerSpecial){
        elm.style.color = "black";
    }
    footer.style.backgroundColor = "#b6f0db";
    footer.style.color = "black";
});

// DONE
btnAddActivity.addEventListener('click', () => {
    let classSign = generateClassSign();
    let elmtInput = document.createElement('div');
    elmtInput.classList.add("d-flex");
    elmtInput.classList.add('flex-row');
    elmtInput.classList.add('justify-content-between');
    elmtInput.classList.add('list-todo-book');
    elmtInput.classList.add(classSign);
    elmtInput.classList.add('p-2');
    elmtInput.classList.add('mt-2');
    elmtInput.classList.add('box-shadow-card');
    elmtInput.setAttribute('id', 'child-list');
    let inputBook = `
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-7">
                    <div class="form-group mt-1" id="inputBookTitle">
                        <label for="exampleInputEmail1" style="color:black;">Book Title</label>
                        <input type="text" class="form-control inputTodoBook inputBookTitle" placeholder="Book Title">
                        <small class="form-text text-muted disp-none clr-warning inputHelp">Please fill book title before add it to book list!</small>
                    </div>
                    <div class="form-group mt-2" id="inputBookAuthor">
                        <label for="exampleInputEmail1" style="color:black;">Book's Author</label>
                        <input type="text" class="form-control inputTodoBook inputBookAuthor" placeholder="Book's Author">
                        <small class="form-text text-muted disp-none clr-warning inputHelp">Please fill book's author before add it to book list!</small>
                    </div>
                    <div class="form-group mt-2" id="inputYearPublished">
                        <label for="exampleInputEmail1" style="color:black;">Year Published</label>
                        <input type="text" class="form-control inputTodoBook inputYearPublished" placeholder="Year Published">
                        <small class="form-text text-muted disp-none clr-warning inputHelp">Please fill year published before add it to book list!</small>
                    </div>
                    <small class="form-text text-muted disp-none clr-warning inputHelpWarning">Please fill all forms before add it to book list!</small>
                </div>
                <div class="col-sm-5">
                    <div class="d-flex flex-row justify-content-end btnFunctionality mt-1">
                        <div class="add-book-title" onclick="accTodoBook()">
                            <img src="./check-theme-dark.png" alt="Add" class="check-add-todo">
                        </div>
                        <div class="remove-book-title ml-2" id="cancel-todo-book" onclick="removeTodoBook()">
                            <img src="./cancel-todo.png" alt="remove" class="cancel-todo">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="disp-none-impt d-flex flex-column justify-content-center container-text-result">
            <div class="disp-none align-self-start mt-3 bookTitleText pr-2"></div>
            <div class="disp-none align-self-start mt-1 d-flex flex-row justify-content-start container-decoration">
                <div class="bookAuthorText">
                </div>
                <div class="yearPublishedText ml-2"></div>
            </div>
        </div>
        <div class="disp-none-impt d-flex flex-row justify-content-start container-edit-read align-self-center">
            <div class="edit-book-title" onclick="editBook()">
                <img src="./edit-book.png" alt="Edit" class="edit-book">
            </div>
            <div class="read-book ml-2" onclick="readBook()">
                <img src="./read_a_book.png" alt="Edit" class="read-book-img">
            </div>
        </div>
    `;
    elmtInput.innerHTML = inputBook;
    containerTodoBook.appendChild(elmtInput);
});