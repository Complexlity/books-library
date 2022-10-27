// // function Student() {
// //   }
  
// //   Student.prototype.sayName = function() {
// //     return `${this.name} is so cool`
// //   }
// //   Student.prototype.goToProm = function() {
// //     return "Eh.. go to prom?"
// //   }

// // function yearOne(name){
// //     this.grade = 'C'
// //     this.name = name
// // }

// // yearOne.prototype = Object.create(Student.prototype)
// // const April =  new yearOne('April')
// // console.log(April.sayName())
// // console.log(April.grade)

// class Programmer {
//     constructor(name){
//         this.name=name
//     }
// }

// class WebDeveloper extends Programmer {
//     constructor(name, technology){
//         super(name)
//         this.technology = technology
//     }
// }
// const Elismo = new Programmer('Elijah')
// const Hottie = new WebDeveloper("Chimex", 'React', 'Heello')

const dq = document.querySelector.bind(document)
const dqa = document.querySelectorAll.bind(document)
const c = console.log.bind(document)

let library = []
const addBook = dq('.add-book')
const bookWrapper = dq('.book-wrapper')
const addBookSection = dq('.add-book-section')
const form = dq('.form')
addBook.addEventListener('click', openModal)
getDeleteButtons()
addBookSection.addEventListener('click', processModal)

form.addEventListener('submit', (e)=>{
    e.preventDefault()
})

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
    }
}

/* -------------------
 USING PROMPT TO GET VALUES
 ---------------------- */
// function addBookToLibrary(){
//     let title = prompt('What is the title of the book')
//     let author = prompt('Who is the author')
//     let pages = prompt('How many pages')
//     let read = confirm('Have you read it?')
//     if(!read) read = false
//     let myNewBook = new Book(title, author, pages, read)
//     library.push(myNewBook)
//     renderToPage(library)
//     getDeleteButtons()
// }

function renderToPage(library){
    bookWrapper.innerHTML = ''
    let book;
    for (let i = 0; i < library.length; i++){
        book = library[i]   
    if (book.read) checked = 'checked'
    bookWrapper.innerHTML += `
    <div class="book" data-number=${i}>
        <h1 class="title">${book.title}</h1>
        <p>By</p>
        <p class="author">${book.author}</p>
        <p class="pages">${book.pages}</p>
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

function removeFromLibrary(){
    let book
    let confirmDelete = confirm('Are you sure you want to remove book?')
    if(confirmDelete) {
        book = this.parentNode
        let bookIndex = book.dataset.number
        library.splice(bookIndex, 1)
        renderToPage(library)
        getDeleteButtons()
    }
}

