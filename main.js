const dq = document.querySelector.bind(document)
const dqa = document.querySelectorAll.bind(document)
const c = console.log.bind(document)

let library = []
const addBook = dq('.add-book')
const bookWrapper = dq('.book-wrapper')
const addBookSection = dq('.add-book-section')
const form = dq('.form')
let checked; 
addBook.addEventListener('click', openModal)
getDeleteButtons()
getReadToggle()
addBookSection.addEventListener('click', processModal)

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function openModal() {
    addBookSection.style.display = 'flex'
}

function processModal(e){
    if (
        e.target.className == 'add-book-section' ||
        e.target.className == 'cancel'
    ){
        addBookSection.style.display = 'none'
        clearFormSection()
        renderToPage(library)
    }
}



function renderToPage(library){
    bookWrapper.innerHTML = ''
    let book;
    for (let i = 0; i < library.length; i++){
        book = library[i]  
        checked = '' 
        if (book.read) checked = 'checked'
        bookWrapper.innerHTML += `
        <div class="book" data-number=${i}>
        <h1 class="title">${book.title}</h1>
        <p>By</p>
        <p class="author">${book.author}</p>
        <p class="pages">${book.pages} Pages</p>
        <div>
        
        <label><input type="checkbox" ${checked}>Read</label>
        </div>
        <button class="delete">Remove Book</button>
        `
    }
}

function getDeleteButtons(){
    let delButtons = dqa('.delete')
    delButtons.forEach(delButton => {
        delButton.addEventListener('click', removeFromLibrary)
    })
}

function getReadToggle(){
    let toggleRead = dqa('input[type=checkbox]') 
    toggleRead.forEach(box => {
        box.addEventListener('click', toggleLibraryRead)
    })  
}

function toggleLibraryRead(){
    let libraryIndex = Number(this.parentNode.parentNode.parentNode.dataset.number)
    let libraryItem = library[libraryIndex]
    if(libraryItem.read) libraryItem.read = false
    else libraryItem.read = true
}

function removeFromLibrary(){
    let book
    let confirmDelete = confirm('Are you sure you want to remove book?')
    if(confirmDelete) {
        book = this.parentNode
        let bookIndex = book.dataset.number
        library.splice(bookIndex, 1)
        renderToPage(library)
        getDeleteButtons()
        getReadToggle()
    }
}

/* -----------------------
FORM VALIDATION SECTION
------------------------ */

const submit = dq('.add')
const inputsDiv = dqa('.form-control')
const inputs = dqa('.form-control input')
let title = inputsDiv[0]
let titleInput = title.querySelector('input')
let author = inputsDiv[1]
let authorInput = author.querySelector('input')
let pages = inputsDiv[3]
let pagesInput = pages.querySelector('input')
let readSwitch = dq('.select')
let readOrNot = readSwitch.querySelector('select')
let successCount

submit.addEventListener('click', validateAll)
form.addEventListener('submit', (e)=>{
    e.preventDefault()
})

function validateAll(){
    successCount = 0;
    let titleValue = titleInput.value
    let authorValue = authorInput.value
    let pagesValue = pagesInput.value
    let read = readOrNot.value
    let readBoolean = (read === '1' || read === '0')  ? true : false

    let error1 = 'Field cannot be left blank'
    successError(title, Boolean(titleValue), error1)
    successError(author, Boolean(authorValue), error1)
    successError(pages, Boolean(pagesValue), error1)
    successError(readSwitch, readBoolean, 'Choose An Option')
    if(successCount == 4){
            let readCheck = read === '1' ? true: false
            let myNewBook = new Book(titleValue, authorValue, pagesValue, readCheck)
                library.push(myNewBook)
                addBookSection.style.display = 'none'
                clearFormSection()
                renderToPage(library)
                getDeleteButtons()
                getReadToggle()
    }
}


// Function to log error messages
function successError(nodeElement, value, ErrorMessage) {
    let errorText = nodeElement.querySelector('small')
    if (value) { nodeElement.classList.add('success'); nodeElement.classList.remove('error')
    errorText.textContent = ''
    successCount += 1
}
    else {
        nodeElement.classList.add('error'); nodeElement.classList.remove('success')
        errorText.textContent = ErrorMessage
    }
}


function clearFormSection(){
    let inputDivs = addBookSection.querySelectorAll('.form-control')
    let allInputs = addBookSection.querySelectorAll('.selection')
    let allErrors = addBookSection.querySelectorAll('small')
    allInputs.forEach(input => {
        input.value = ''
    })
    allErrors.forEach(error => {
        error.textContent = ''
    })
    inputDivs.forEach(div => div.classList.remove('success', 'error'))
}

