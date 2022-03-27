// !!!!! Variable and Constant !!!!!! ============================================
const bookListKey = "BOOK-LIST-KEY";
const bookInProgressKey = "BOOK-IN-PROGRESS-KEY";
const bookCompleted = "BOOK-COMPLETED-KEY";

const containerThemeLight = document.getElementById('container-theme-light');
const containerThemeDark = document.getElementById('container-theme-dark');
const checkThemeLight = document.getElementById('check-theme-light');
const checkThemeDark = document.getElementById('check-theme-dark');
const btnAddActivity = document.getElementById('add-book');
const containerTodoBook = document.getElementById('container-todo-book');
const containerBookRead = document.getElementById('container-book-read');
const containerBookDone = document.getElementById('container-book-done');
const containerSearch = document.getElementById('search');
const searchTextBefore = document.getElementById('search-text');
const searchInput = document.getElementById('search-data');
//==================================================================================



// !!!!!!! Event On Load !!!!!!!!!! ===============================================
window.addEventListener('load', () => {
    if(typeof(Storage) !== undefined){
        let dataBookList = localStorage.getItem(bookListKey);
        let dataBookInProgress = localStorage.getItem(bookInProgressKey);
        let dataBookCompleted = localStorage.getItem(bookCompleted);

        if(!dataBookList){
            localStorage.setItem(bookListKey, "");
        }else{
            let arrBookList = dataBookList.split('=');
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
        }else{
            let arrBookRead = dataBookInProgress.split('=');
            for(let elm of arrBookRead){
                let jsonObj;
                if(elm){
                    jsonObj = JSON.parse(elm);
                    if(jsonObj){
                        if(!jsonObj.bookList && !jsonObj.isComplete){
                            settingUpBookRead(jsonObj);
                        }
                    }
                }
            }
        }

        if(!dataBookCompleted){
            localStorage.setItem(bookCompleted, "");
        }else{
            let arrBookDone = dataBookCompleted.split('=');
            for(let elm of arrBookDone){
                let jsonObj;
                if(elm){
                    jsonObj = JSON.parse(elm);
                    if(jsonObj){
                        if(jsonObj.isComplete){
                            settingUpBookDone(jsonObj);
                        }
                    }
                }
            }
        }
    }else{
        alert('Sorry, Some of the functionality on this page may not work due to your browser does not support Web Storage');
    }
});
// ================================================================================



// !!!!!!! Helper Function !!!!!!!!! ==============================================
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
                            <img src="./asset/check-theme-dark.png" alt="Add" class="check-add-todo">
                        </div>
                        <div class="remove-book-title ml-2" id="cancel-todo-book" onclick="removeTodoBook()">
                            <img src="./assets/cancel-todo.png" alt="remove" class="cancel-todo">
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
                <img src="./assets/edit-book.png" alt="Edit" class="edit-book">
            </div>
            <div class="read-book ml-2" onclick="readBook()">
                <img src="./assets/read_a_book.png" alt="Edit" class="read-book-img">
            </div>
        </div>
    `;
    elmtInput.innerHTML = inputBook;
    containerTodoBook.appendChild(elmtInput);
}

function settingUpBookRead(json){
    let valBookTitle = json.title;
    let valBookAuthor = json.author;
    let valYearPublished = json.year;

    let classSign = json.id;
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
                        <img src="./assets/check-theme-dark.png" alt="Add" class="check-to-done">
                    </div>
                    <div class="btn-uncheck align-self-center ml-2" onclick="cancelProgressBook()">
                        <img src="./assets/cancel-todo.png" alt="remove" class="cancel-todo">
                    </div>
                </div>
            </div>
        </div>
    `;

    elmBookRead.innerHTML = bookReadInner;
    containerBookRead.appendChild(elmBookRead);
}

function settingUpBookDone(json){
    let valBookTitle = json.title;
    let valBookAuthor = json.author;
    let valYearPublished = json.year;

    let classSign = json.id;
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
                    <img src="./assets/cancel-todo.png" alt="remove" class="cancel-todo">
                </div>
            </div>
        </div>
    </div>
    `;

    elmBookDone.innerHTML = bookDoneInner;
    containerBookDone.appendChild(elmBookDone);
}

function generateClassSign(){
    let timeStamps = +new Date();
    return `container-${timeStamps}`;
}

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

function addToBookProgressStorage(json){
    let storageBookProgress = localStorage.getItem(bookInProgressKey);
    let arrBookProgress = storageBookProgress.split('=');
    let jsonObj;
    let newItems = "";
    if(arrBookProgress){
        for(let elm of arrBookProgress){
            if(elm){
                jsonObj = JSON.parse(elm);
                if(jsonObj.id !== json.id){
                    newItems += JSON.stringify(jsonObj);
                    newItems += "=";
                }
            }
        }

        json.isComplete = false;
        newItems += JSON.stringify(json);
        newItems += "=";

        localStorage.removeItem(bookInProgressKey);
        localStorage.setItem(bookInProgressKey, newItems);
    }
}
// =================================================================================



// !!!!!!!!! Container Builder !!!!!!!!! ==========================================
function addContainerBookInProgress(bookTitle, bookAuthor, yearPublished, containerBookRead, listClass){
    let valBookTitle = bookTitle.innerText;
    let valBookAuthor = bookAuthor.innerText;
    let valYearPublished = yearPublished.innerText;

    let classSign = listClass;
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
                <div class="col-5" id="btn-book-progress">
                    <div class="btn-check-done align-self-center" onclick="bookDoneRead()" id="btn-check-progress">
                        <img src="./assets/check-theme-dark.png" alt="Add" class="check-to-done">
                    </div>
                    <div class="btn-uncheck align-self-center ml-2" onclick="cancelProgressBook()" id="btn-cancel-progress">
                        <img src="./assets/cancel-todo.png" alt="remove" class="cancel-todo">
                    </div>
                </div>
            </div>
        </div>
    `;

    elmBookRead.innerHTML = bookReadInner;
    containerBookRead.appendChild(elmBookRead);
}

function addContainerBookDone(bookTitle, bookAuthor, yearPublished, containerBookDone, listClass){
    let valBookTitle = bookTitle.innerText;
    let valBookAuthor = bookAuthor.innerText;
    let valYearPublished = yearPublished.innerText;

    let classSign = listClass;
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
                    <img src="./assets/cancel-todo.png" alt="remove" class="cancel-todo">
                </div>
            </div>
        </div>
    </div>
    `;

    elmBookDone.innerHTML = bookDoneInner;
    containerBookDone.appendChild(elmBookDone);
}
// ================================================================================



// !!!!!!!!!!! Book List Functionality !!!!!!!!!!!! ===============================
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
            const arrBookList = dataBookList.split('=');
            let newItems = "";
            let jsonObj;
            let addToLocal = true;
            for(let elm of arrBookList){
                if(elm){
                    jsonObj = JSON.parse(elm);
                    if(jsonObj.id !== listClass){
                        newItems += JSON.stringify(jsonObj);
                        newItems += "=";
                    }
                }
            }

            let dataJson = {
                id: listClass,
                title: valBookTitle,
                author: valBookAuthor,
                year: valYearPublished,
                isComplete: false,
                bookList: true,
            };
            newItems += JSON.stringify(dataJson);
            newItems += '=';
            localStorage.setItem(bookListKey, newItems);
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
            dataBookList += "=";
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
    let bookAuthorTag = document.querySelector(`#child-list.${listClass} .container-text-result .container-decoration .bookAuthorText`);
    let yearPublishedTag = document.querySelector(`#child-list.${listClass} .container-text-result .container-decoration .yearPublishedText`);
    let cardContainer = document.querySelector(`#child-list.${listClass}`);
    let valBookTitle = (containerBookTitle.childNodes[0].innerText == undefined) ? containerBookTitle.childNodes[1].innerText  : containerBookTitle.childNodes[0].innerText;
    let valBookAuthor = (containerBookAuthor.childNodes[0].innerText == undefined) ? containerBookAuthor.childNodes[1].innerText : containerBookAuthor.childNodes[0].innerText;
    let valYearPublished = (containerYearPublished.childNodes[0].innerText == undefined) ? containerYearPublished.childNodes[1].innerText : containerYearPublished.childNodes[0].innerText;
    
    if(containerBookTitle.hasChildNodes()){
        containerBookTitle.removeChild(containerBookTitle.lastChild);
    }

    if(bookAuthorTag.hasChildNodes()){
        bookAuthorTag.removeChild(bookAuthorTag.lastChild);
    }

    if(yearPublishedTag.hasChildNodes()){
        yearPublishedTag.removeChild(yearPublishedTag.lastChild);
    }

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

    // const dataJson = {
    //     id: listClass,
    //     title: valBookTitle,
    //     author: valBookAuthor,
    //     year: valYearPublished,
    //     isComplete: false,
    //     bookList: true,
    // }

    // const storageBookList = localStorage.getItem(bookListKey);
    // const arrBookList = storageBookList.split('=');
    // let jsonObj;
    // let newItems = "";
    // if(arrBookList){
    //     for(let elm of arrBookList){
    //         if(elm){
    //             jsonObj = JSON.parse(elm);
    //             if(jsonObj.id !== listClass){
    //                 newItems += JSON.stringify(jsonObj);
    //                 newItems += '=';
    //             }
    //         }
    //     }

    //     newItems += JSON.stringify(dataJson);
    //     newItems += '=';
    //     console.log(newItems);
    //     localStorage.setItem(bookListKey, newItems);
    // }
}

function removeTodoBook(){
    let evt = window.event.target;
    let listClass = evt.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.classList;

    let dataBookList = localStorage.getItem(bookListKey);
    if(dataBookList){
        let arrBookList = dataBookList.split('=');
        let newItems = "";
        for(let elm of arrBookList){
            let jsonObj;
            if(elm){
                jsonObj = JSON.parse(elm);
                if(jsonObj.id !== listClass[4]){
                    newItems += JSON.stringify(jsonObj);
                    newItems += "=";
                }
            }
        }
        localStorage.removeItem(bookListKey);
        localStorage.setItem(bookListKey, newItems);
    }

    let idxContainer = searchChildIndex(evt.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes, listClass[4]);
    containerTodoBook.removeChild(containerTodoBook.childNodes[idxContainer]);
}

function readBook(){
    let evt = window.event.target;
    let listClass = evt.parentNode.parentNode.parentNode.classList;
    if(listClass == undefined){
        listClass = evt.parentNode.parentNode.parentNode.parentNode.classList;
    }
    listClass = listClass[4];
    
    const bookTitle = document.querySelector(`#child-list.${listClass} .container-text-result .bookTitleText`);
    const bookAuthor = document.querySelector(`#child-list.${listClass} .container-text-result .container-decoration .bookAuthorText`);
    const yearPublished = document.querySelector(`#child-list.${listClass} .container-text-result .container-decoration .yearPublishedText`);

    let dataBookRead = localStorage.getItem(bookInProgressKey);

    if(dataBookRead){
        let arrBookRead = dataBookRead.split('=');
        let addToLocal = true;
        let jsonObj;
        for(let elm of arrBookRead){
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
                title: bookTitle.innerText,
                author: bookAuthor.innerText,
                year: yearPublished.innerText,
                isComplete: false,
                bookList: false,
            }
            dataJson = JSON.stringify(dataJson);
            dataBookRead += dataJson;
            dataBookRead += "=";
            localStorage.setItem(bookInProgressKey, dataBookRead);

            addContainerBookInProgress(bookTitle, bookAuthor, yearPublished, containerBookRead, listClass);
        }else{
            alert(`Sorry, '${bookTitle.innerText}' book was added on the 'In Progress Read' tab`);
        }
    }else{
        let dataJson = {
            id: listClass,
            title: bookTitle.innerText,
            author: bookAuthor.innerText,
            year: yearPublished.innerText,
            isComplete: false,
            bookList: false,
        }
        dataJson = JSON.stringify(dataJson);
        dataBookRead += dataJson;
        dataBookRead += "=";
        localStorage.setItem(bookInProgressKey, dataBookRead);

        addContainerBookInProgress(bookTitle, bookAuthor, yearPublished, containerBookRead, listClass);
    }
}
// ================================================================================



// !!!!!!!!!! Book In Progress Functionality !!!!!!!!!!!!! ========================
function cancelProgressBook(){
    let evt = window.event.target;
    let listClass = evt.parentNode.parentNode.parentNode.parentNode.parentNode.classList;
    if(listClass == undefined){
        console.log("Masuk Undefined");
        listClass = evt.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.classList;
    }
    listClass = listClass[4];

    console.log("List Class : " + listClass);

    let dataBookRead = localStorage.getItem(bookInProgressKey);
    if(dataBookRead){
        console.log("Masuk If");
        let arrBookRead = dataBookRead.split('=');
        let newItems = "";
        let jsonObj;

        console.log(arrBookRead.length);
        console.log(arrBookRead);
        let count = 1;
        if(arrBookRead[1] != ""){
            for(let elm of arrBookRead){
                console.log("--- Iterasi " + count + " -----");
                console.log("elm : " + elm);
                if(elm){
                    jsonObj = JSON.parse(elm);
                    console.log("Json Objek : " + jsonObj);
                    if(jsonObj.id !== listClass){
                        console.log("JSON ID !== list class");
                        newItems += JSON.stringify(jsonObj);
                        newItems += "=";
                        console.log("New Items : " + newItems);
                    }
                }
                console.log("");
                console.log("");
                count++;
            }

            localStorage.removeItem(bookInProgressKey);
            localStorage.setItem(bookInProgressKey, newItems);
        }else{
            localStorage.removeItem(bookInProgressKey);
            localStorage.setItem(bookInProgressKey, "");
        }

        let idxContainer = searchChildIndex(evt.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes, listClass);
        containerBookRead.removeChild(containerBookRead.childNodes[idxContainer]);
    }
}

function bookDoneRead(){
    let evt = window.event.target;
    let listClass = evt.parentNode.parentNode.parentNode.parentNode.parentNode.classList;
    listClass = listClass[4];

    const bookTitle = document.querySelector(`#child-list-book-read.${listClass} .container-fluid .row .container-detail-book-read .text-book-title-read`);
    const bookAuthor = document.querySelector(`#child-list-book-read.${listClass} .container-fluid .row .container-detail-book-read .book-detail-read .book-author-read .container-book-author-read`);
    const yearPublished = document.querySelector(`#child-list-book-read.${listClass} .container-fluid .row .container-detail-book-read .book-detail-read .year-published-read  .container-year-published-read`);

    let bookDone = localStorage.getItem(bookCompleted);

    if(bookDone){
        let arrBookDone = bookDone.split('=');
        let addToLocal = true;
        let jsonObj;
        
        for(let elm of arrBookDone){
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
                title: bookTitle.innerText,
                author: bookAuthor.innerText,
                year: yearPublished.innerText,
                isComplete: true,
                bookList: false,
            }
            dataJson = JSON.stringify(dataJson);
            bookDone += dataJson;
            bookDone += "=";
            localStorage.setItem(bookCompleted, bookDone);

            addContainerBookDone(bookTitle, bookAuthor, yearPublished, containerBookDone, listClass);
        }
    }else{
        let dataJson = {
            id: listClass,
            title: bookTitle.innerText,
            author: bookAuthor.innerText,
            year: yearPublished.innerText,
            isComplete: true,
            bookList: false,
        }
        dataJson = JSON.stringify(dataJson);
        bookDone += dataJson;
        bookDone += "=";
        localStorage.setItem(bookCompleted, bookDone);

        addContainerBookDone(bookTitle, bookAuthor, yearPublished, containerBookDone, listClass);
    }

    let bookInProgress = localStorage.getItem(bookInProgressKey);
    let arrBookInProgress = bookInProgress.split('=');
    let newBookInProgress = "";
    for(let elm of arrBookInProgress){
        let bookProgObj;
        if(elm){
            bookProgObj = JSON.parse(elm);
            if(bookProgObj.id !== listClass){
                newBookInProgress += JSON.stringify(bookProgObj);
                newBookInProgress += "=";
            }
        }
    }
    localStorage.setItem(bookInProgressKey, newBookInProgress);

    let indexRemove = searchChildIndex(evt.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes, listClass);
    containerBookRead.removeChild(containerBookRead.childNodes[indexRemove]);
}
// ===============================================================================



// !!!!!!!!!!! Book Have Been Read Functionality !!!!!!!!!!! ====================
function cancelDone(){
    let evt = window.event.target;
    let listClass = evt.parentNode.parentNode.parentNode.parentNode.parentNode.classList;
    listClass = listClass[4];
    let idxToRemove = searchChildIndex(evt.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes, listClass);
    containerBookDone.removeChild(containerBookDone.childNodes[idxToRemove]);

    let storageBookDone = localStorage.getItem(bookCompleted);
    let arrBookDone = storageBookDone.split('=');
    let jsonObj;
    let itemsBookProgress = "";
    let newItems = "";
    if(arrBookDone){
        for(let elm of arrBookDone){
            if(elm){
                jsonObj = JSON.parse(elm);
                if(jsonObj.id === listClass){
                    settingUpBookRead(jsonObj);
                    addToBookProgressStorage(jsonObj);
                }else{
                    newItems += JSON.stringify(jsonObj);
                    newItems += "=";
                }
            }
        }
    }

    localStorage.removeItem(bookCompleted);
    localStorage.setItem(bookCompleted, newItems);
}
// ==============================================================================




// !!!!!!!!!!!!! General Event Listener !!!!!!!!!!!!!! ===========================
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
                            <img src="./assets/check-theme-dark.png" alt="Add" class="check-add-todo">
                        </div>
                        <div class="remove-book-title ml-2" id="cancel-todo-book" onclick="removeTodoBook()">
                            <img src="./assets/cancel-todo.png" alt="remove" class="cancel-todo">
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
                <img src="./assets/edit-book.png" alt="Edit" class="edit-book">
            </div>
            <div class="read-book ml-2" onclick="readBook()">
                <img src="./assets/read_a_book.png" alt="Edit" class="read-book-img">
            </div>
        </div>
    `;
    elmtInput.innerHTML = inputBook;
    containerTodoBook.appendChild(elmtInput);
});

// containerSearch.addEventListener('click', () => {
//     searchTextBefore.classList.add('disp-none');
//     searchInput.classList.remove('disp-none');
// })

// searchInput.addEventListener('keyup', () => {
//     let valSearch = searchInput.value;
//     let jsonObj;
//     let foundBookList;
//     let foundBookProgress;
//     let foundBookDone;
    
//     const storageBookList = localStorage.getItem(bookListKey);
//     const storageBookProgress = localStorage.getItem(bookInProgressKey);
//     const storageBookDone = localStorage.getItem(bookCompleted);

//     const arrBookList = storageBookList.split('=');
//     for(let elm of arrBookList){
//         if(elm){
//             jsonObj = JSON.parse(elm);
//             if(jsonObj.title.includes(valSearch)){
//                 console.log("Masuk If");
//                 settingUpBookList(jsonObj);
//                 foundBookList = true;
//             }else if(jsonObj.author.includes(valSearch)){
//                 console.log("Masuk Else If");
//                 settingUpBookList(jsonObj);
//                 foundBookList = true;
//             }else{
//                 if(jsonObj.year.includes(valSearch)){
//                     console.log("Masuk Else-If");
//                     settingUpBookList(jsonObj);
//                     foundBookList = true;
//                 }else{
//                     foundBookList = false;
//                 }
//             }
//         }
//     }
// });
// ==============================================================================
