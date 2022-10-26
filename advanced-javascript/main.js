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


let library = []

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}


function addBookToLibrary(){
    let title = prompt('What is the title of the book')
    let author = prompt('Who is the author')
    let pages = prompt('How many pages')
    let read = confirm('Have you read it?')
    if(!read) read = false
    let myNewBook = new Book(title, author, pages, read)
    library.push(myNewBook)
}
