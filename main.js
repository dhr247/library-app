// Tabs
const tabs = document.querySelectorAll('.tabs ul li');
const tabContents = document.querySelectorAll('.tab-content');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('is-active'));
    tab.classList.add('is-active');

    const targetId = tab.querySelector('a').getAttribute('href').substring(1);
    tabContents.forEach(content => {
      content.style.display = 'none';
      if (content.id === targetId) {
        content.style.display = 'block';
      }
    });
  });
});
// Book Class
class Book {
    constructor(title, author, year, id) {
        this.title = title;
        this.year = year;
        this.author = author;
        this.id = id;
    }
}
// UI Class
// Note: Books are synchronized and displayed on both tab 1 and tab2
class UI {
    static displayBooks() {
        const storedBooks = [
            {
                title: "Harry Potter and the Philosopher's Stone",
                author: 'J.K. Rowling',
                year: 1997,
                id: 1234
            },
            {
                title: "Murder on the Orient Express",
                author: 'Agatha Cristie',
                year: 1934,
                id: 5678
            }
        ]
        const books = storedBooks;
        books.forEach(book => (UI.addBookToList(book)))
    }
    static addBookToList(book) {
        // Tab 1
        const list = document.querySelector('#book-cards');
        const column = document.createElement('div')
        column.classList.add('column', 'is-one-quarter');
        const card = document.createElement('div');
        card.classList.add('card');
        const cardTitle = document.createElement('p');
        cardTitle.classList.add('card-content', 'is-size-4', 'has-text-weight-bold');
        cardTitle.innerText = book.title;
        const cardAuthor = document.createElement('p');
        cardAuthor.classList.add('card-content');
        cardAuthor.innerText = book.author;
        const cardYear = document.createElement('p');
        cardYear.classList.add('card-content');
        cardYear.innerText = book.year;
        const cardID = document.createElement('p');
        cardID.classList.add('card-content');
        cardID.innerText = book.id;
        const cardDelete = document.createElement('div');
        cardDelete.classList.add('has-text-centered');
        const cardDeleteButton = document.createElement('input');
        cardDeleteButton.classList.add('button', 'is-danger', 'mb-5');
        cardDeleteButton.setAttribute('type', 'submit');
        cardDeleteButton.setAttribute('value', 'Delete Book');
        cardDelete.appendChild(cardDeleteButton);
        card.appendChild(cardTitle);
        card.appendChild(cardAuthor);
        card.appendChild(cardYear);
        card.appendChild(cardID);
        card.appendChild(cardDelete)
        column.appendChild(card);
        list.appendChild(column);
        UI.addBookToListTab2(book);
    }
        // Tab2
        static addBookToListTab2(book) {
        const list2 = document.querySelector('#book-cards-2');
        const column2 = document.createElement('div')
        column2.classList.add('column', 'is-one-quarter');
        const card2 = document.createElement('div');
        card2.classList.add('card');
        const cardTitle2 = document.createElement('p');
        cardTitle2.classList.add('card-content', 'is-size-4', 'has-text-weight-bold');
        cardTitle2.innerText = book.title;
        const cardAuthor2 = document.createElement('p');
        cardAuthor2.classList.add('card-content', 'x');
        cardAuthor2.innerText = book.author;
        const cardYear2 = document.createElement('p');
        cardYear2.classList.add('card-content', 'y');
        cardYear2.innerText = book.year;
        const cardID2 = document.createElement('p');
        cardID2.classList.add('card-content', 'z');
        cardID2.innerText = book.id;
        const lineBreak = document.createElement('hr');
        // Rent Form
        const rentForm = document.createElement('form');
        rentForm.setAttribute('id', 'book-rent');
        const rentColumns = document.createElement('div');
        rentColumns.classList.add('columns');
        const rentColumn = document.createElement('div');
        rentColumn.classList.add('column', 'field');
        const rentLabel = document.createElement('label');
        rentLabel.classList.add('label', 'has-text-centered');
        rentLabel.innerText = 'Rent this Book';
        const rentInputDiv = document.createElement('div');
        rentInputDiv.classList.add('p-3');
        const rentInput = document.createElement('input');
        rentInput.classList.add('input');
        rentInput.setAttribute('type', 'number');
        rentInput.setAttribute('id', 'rentMembershipNumber');
        rentInput.setAttribute('placeholder', 'Enter Membership Number');
        const rentButtonDiv = document.createElement('div');
        rentButtonDiv.classList.add('p-3');
        const rentButton = document.createElement('input');
        rentButton.classList.add('button', 'is-primary' ,'is-fullwidth');
        rentButton.setAttribute('type', 'submit');
        rentButton.setAttribute('id', "rentMembershipNumberSubmit");
        // Adding button to div
        rentButtonDiv.appendChild(rentButton);
        // Adding input to div
        rentInputDiv.appendChild(rentInput);
        // Adding evrything to column
        rentColumn.appendChild(rentLabel);
        rentColumn.appendChild(rentInputDiv);
        rentColumn.appendChild(rentButtonDiv);
        // Adding column to columns
        rentColumns.appendChild(rentColumn);
        // Adding columns to form
        rentForm.appendChild(rentColumns);
        // Adding Elements to DOM
        card2.appendChild(cardTitle2);
        card2.appendChild(cardAuthor2);
        card2.appendChild(cardYear2);
        card2.appendChild(cardID2);
        card2.appendChild(lineBreak);
        card2.appendChild(rentForm);
        column2.appendChild(card2);
        list2.appendChild(column2);
    }
    static clearFields() {
        const title = document.querySelector('#title').value = '';
        const author = document.querySelector('#author').value = '';
        const year = document.querySelector('#year').value = '';
        const id = document.querySelector('#id').value = '';
        const name = document.querySelector('#name').value = '';
        const membershipNumber = document.querySelector('#membershipNumber').value = '';
    }
    static deleteBook(book) {
        if (book.classList.contains('button')) {
            const bookCard = book.parentElement.parentElement;
            const bookTitle = bookCard.querySelector('.is-size-4.has-text-weight-bold').innerText;
            const tab2BookList = document.querySelector('#book-cards-2');
            const tab2BookCards = tab2BookList.querySelectorAll('.card');
            tab2BookCards.forEach(tab2Card => {
                if (tab2Card.querySelector('.card-content.is-size-4.has-text-weight-bold').innerText === bookTitle) {
                    tab2Card.parentElement.remove();
                }
            });
            book.parentElement.parentElement.parentElement.remove();
        }
    }
    // -------------------------- (Tab 2) ----------------------------------------
    static searchBook(e) {
        const searchTerm = e.target.value.toLowerCase();
        const bookColumns = document.querySelector('#book-cards-2');
        const books = bookColumns.querySelectorAll('.column.is-one-quarter');
        
        books.forEach(book => {
            const textContent = book.textContent.toLowerCase();
            console.log(textContent);
            const card = book.querySelector('.card');
            
            if (textContent.includes(searchTerm)) {
                book.style.display = 'block'; // Show the book card container
                card.style.display = ''; // Show the book card
            } else {
                book.style.display = 'none'; // Hide the book card container
            }
        });
    };
}
// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks());
// Event: Add Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const year = document.querySelector('#year').value;
    const id = document.querySelector('#id').value;
    const book = new Book(title, author, year, id);
    UI.addBookToList(book);
    UI.clearFields();
});
// Event: Delete Book
const books = document.querySelector('#book-cards').addEventListener('click', (e) => {
    e.preventDefault();
    UI.deleteBook(e.target);
})
// Member Class
class Member {
    constructor(name, membershipNumber) {
        this.name = name;
        this.membershipNumber = membershipNumber;
    }
}
// Member UI Class
class UIMember {
    static displayMember() {
        const storedMembers = [
            {
                name: "Arthur",
                membershipNumber: "1234"
            },
            {
                name: "Blake",
                membershipNumber: "5678"
            }
        ]
        const members = storedMembers;
        members.forEach(member => UIMember.addMemberToList(member));
    }
    static addMemberToList(member) {
        const list = document.querySelector('#member-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${member.name}</td>
        <td>${member.membershipNumber}</td>
        <td><a href='#' class='button is-danger'>X</a></td>
        `;
        list.appendChild(row);
    }
    static deleteMember(member) {
        if (member.classList.contains('button')) {
            member.parentElement.parentElement.remove();
        }
    }
}
// Event; Display Member
document.addEventListener('DOMContentLoaded', UIMember.displayMember());
// Event: Add Member
document.querySelector('#member-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const membershipNumber = document.querySelector('#membershipNumber').value;
    const member = new Member(name, membershipNumber);
    UIMember.addMemberToList(member);
    UI.clearFields();
})
// Event: Delete Member
document.querySelector('#member-list').addEventListener('click', (e) => {
    e.preventDefault();
    UIMember.deleteMember(e.target);
})
// ----------------------- (Tab 2) --------------------------------------------
// Search (Books)
document.querySelector('#book-search').addEventListener('input', (e) => {
    e.preventDefault();
    UI.searchBook(e);
});
// Rent Record Class
class Record {
    constructor(membershipNumber, bookName, bookAuthor, bookYear, bookID) {
        this.membershipNumber = membershipNumber;
        this.bookName = bookName;
        this.bookAuthor = bookAuthor;
        this.bookYear = bookYear;
        this.bookID = bookID
    }
}
// UI Class
class UIRecord {
    static displayRecord() {
        const storedRecords = [
            {
                membershipNumber: 1234,
                bookName: 'Harry Potter',
                bookAuthor: 'J.K. Rowling',
                bookYear: 1997,
                bookID: 1234
            },
            {
                membershipNumber: 1234,
                bookName: 'Harry Potter',
                bookAuthor: 'J.K. Rowling',
                bookYear: 1997,
                bookID: 1234
            }
        ]
        const records = storedRecords;
        records.forEach(record => UIRecord.addRecordToList(record));
    }
    static addRecordToList(record) {
        const recordsList = document.querySelector('#records-list');
        const recordRow = document.createElement('tr');
        recordRow.innerHTML = `
        <td>${record.membershipNumber}</td>
        <td id="recordName">${record.bookName}</td>
        <td id="recordAuthor">${record.bookAuthor}</td>
        <td id="recordYear">${record.bookYear}</td>
        <td id="recordID">${record.bookID}</td>
        <td><a href='#' class='button is-danger'>Return</a></td>
        `;
        recordsList.appendChild(recordRow);
    }
    static deleteRecord(record) {
        if (record.classList.contains('button')) {
            const temp = record.parentElement.parentElement;
            const recordName = temp.querySelector('#recordName').innerText;
            const recordAuthor = temp.querySelector('#recordAuthor').innerText;
            const recordYear = temp.querySelector('#recordYear').innerText;
            const recordID = temp.querySelector('#recordID').innerText;
            const returnBook = new Book(recordName, recordAuthor, recordYear, recordID);
            UI.addBookToListTab2(returnBook);
            // console.log(recordNumber);
            record.parentElement.parentElement.remove();
        }
    }
}
// Event: Display Records
document.addEventListener('DOMContentLoaded', UIRecord.displayRecord());
// Event: Add Record
const addRecords = document.querySelectorAll('#book-rent');
console.log(addRecords);
addRecords.forEach(addRecord => {
    addRecord.addEventListener('submit', (e) => {
        console.log('clicked');
        e.preventDefault();
        var rentMembershipNumber = addRecord.querySelector('#rentMembershipNumber').value;
        const temp1 = addRecord.parentElement;
        const newRecordBookName = temp1.querySelector('.card-content.is-size-4.has-text-weight-bold').innerText;
        const temp2 = addRecord.parentElement;
        const newRecordBookAuthor = temp2.querySelector('.card-content.x').innerText;
        const temp3 = addRecord.parentElement;
        const newRecordBookYear = temp3.querySelector('.card-content.y').innerText;
        const temp4 = addRecord.parentElement;
        const newRecordBookID = temp4.querySelector('.card-content.z').innerText;
        const newRecord = new Record(rentMembershipNumber, newRecordBookName, newRecordBookAuthor, newRecordBookYear, newRecordBookID);
        UIRecord.addRecordToList(newRecord);
        rentMembershipNumber = addRecord.querySelector('#rentMembershipNumber').value = '';
        addRecord.parentElement.parentElement.remove();
    })
});
// Event: Delete Record
const delRecords = document.querySelectorAll('#records-list');
delRecords.forEach(delRecord => {
    delRecord.addEventListener('click', (e) => {
        e.preventDefault();
        UIRecord.deleteRecord(e.target);
    })
})