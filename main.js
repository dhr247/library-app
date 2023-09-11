Vue.component('book-card', {
    props: ['book', 'disabled', 'members'],
    data() {
        return {
            memberID: '',
            isRenting: false,
            isMemberIDValid: true,
        };
    },
    template: `
        <div class="column is-one-quarter">
            <div class="card" style="height: 100%;">
                <div class="card-content" style="height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <p class="title">{{ book.title }}</p>
                        <p>Author: {{ book.author }}</p>
                        <p>Year: {{ book.year }}</p>
                        <p>ID: {{ book.id }}</p>
                    </div>
                    <div>
                        <div class="field has-addons mt-6">
                            <div class="control">
                                <input class="input" type="text" v-model="memberID" :disabled="isRenting" required>
                            </div>
                            <div class="control">
                                <button class="button is-success" @click="rentBook" :disabled="isRenting">Rent</button>
                            </div>
                            <div class="control">
                                <button class="button is-danger" @click="returnBook" :disabled="!isRenting">Return</button>
                            </div>
                        </div>
                        <div class="control has-text-centered">
                            <button class="button is-danger is-fullwidth" @click="deleteBook(index)" :disabled="isRenting">Delete</button>
                        </div>
                        <div class="has-text-danger mt-2" v-if="!isMemberIDValid">
                            Invalid Membership ID. Please check.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    methods: {
        rentBook() {
            if (!this.isRenting && this.memberID) {
                // If member id is valid rent the book
                this.isMemberIDValid = this.members.some(member => member.id === this.memberID || member.id == this.memberID);
                if (this.isMemberIDValid) {
                    this.isRenting = true;
                    // Confirmation Notification
                    this.$root.showNotification('Book rented successfully.');
                }
            }
        },        
        returnBook() {
            if (this.isRenting) {
                // Return the book and enable the card
                this.isRenting = false;
                this.memberID = '';
                // Confirmation Notification
                this.$root.showNotification('Book returned successfully.');
            }
        },
        deleteBook(index) {
            this.$emit('delete-book', index);
            // Confirmation Notification
            this.$root.showNotification('Book deleted successfully.');
        },
    },
});
Vue.component('add-book-form', {
    data() {
        return {
            newBook: {
                title: '',
                author: '',
                year: null,
                id: null,
                isRented: false,
            },
            errorMessage: '',
        };
    },
    template: `
        <div class="card">
            <div class="card-content">
                <h2 class="title has-text-centered">Add a Book</h2>
                <form @submit.prevent="addNewBook()">
                    <div class="field">
                        <div class="control">
                            <input class="input" type="text" v-model="newBook.title" required placeholder="Enter Title...">
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <input class="input" type="text" v-model="newBook.author" required placeholder="Enter Author...">
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <input class="input" type="number" v-model="newBook.year" required placeholder="Enter Year (4-digit number)">
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <input class="input" type="number" v-model="newBook.id" required placeholder="Enter ID (4-digit number)">
                        </div>
                        <p class="help is-danger" v-if="errorMessage">{{ errorMessage }}</p>
                    </div>
                    <div class="control">
                        <button class="button is-primary is-fullwidth" type="submit">Add</button>
                    </div>
                </form>
            </div>
        </div>
    `,
    methods: {
        addNewBook() {
            // Check if the year and ID are both 4-digit numbers
            const isYearValid = /^\d{4}$/.test(this.newBook.year.toString());
            const isIdValid = /^\d{4}$/.test(this.newBook.id.toString());
            if (!isYearValid || !isIdValid) {
                // Display an error message for invalid year or ID
                this.errorMessage = 'Error: Year and ID must be 4-digit numbers.';
                this.newBook = { title: '', author: '', year: null, id: null, isRented: false };
            } else {
                // Check if the book with the same ID already exists
                const isDuplicateId = this.$root.books.some(book => book.id === this.newBook.id || book.id == this.newBook.id);

                if (isDuplicateId) {
                    // Display an error message for duplicate ID
                    this.errorMessage = 'Error: Book with the same ID already exists.';
                    this.newBook = { title: '', author: '', year: null, id: null, isRented: false };
                } else {
                    // Add the new book to the list
                    this.$emit('add-book', { ...this.newBook });
                    // Clear the form fields
                    this.newBook = { title: '', author: '', year: null, id: null, isRented: false };
                    // Clear the error message
                    this.errorMessage = '';
                    // Confirmation Notification
                    this.$root.showNotification('Book added successfully.');
                }
            }
        },
    },
});
Vue.component('add-member-form', {
    data() {
        return {
            newMember: {
                name: '',
                id: null,
            },
            isMemberIdValid: true,
        };
    },
    template: `
        <div class="card">
            <div class="card-content">
                <h2 class="title">Add a Member</h2>
                <form @submit.prevent="addNewMember">
                    <div class="field">
                        <div class="control">
                            <input class="input" type="text" v-model="newMember.name" required placeholder="Enter Name...">
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <input class="input" type="number" v-model.number="newMember.id" required placeholder="Enter Membership ID (4-Digit Number)...">
                        </div>
                        <p class="help is-danger" v-if="!isMemberIdValid">Member ID must be a 4-digit number and should be unique.</p>
                    </div>
                    <div class="control is-fullwidth">
                        <button class="button is-primary is-fullwidth" type="submit">Add</button>
                    </div>
                </form>
            </div>
        </div>
    `,
    methods: {
        addNewMember() {
            // Check if the member ID is a four-digit number
            if (
                this.newMember.id !== null &&
                /^\d{4}$/.test(this.newMember.id)
            ) {
                // Check if the member ID already exists
                const isDuplicateId = this.$root.members.some(
                    (member) => member.id === this.newMember.id
                );
                if (isDuplicateId) {
                    // Display an error message for duplicate ID
                    this.isMemberIdValid = false;
                } else {
                    // Add the new member to the list
                    this.$emit('add-member', { ...this.newMember });
                    // Clear the form fields
                    this.newMember = { name: '', id: null };
                    // Clear the error message
                    this.isMemberIdValid = true;
                    // Confirmation Notification
                    this.$root.showNotification('Member added successfully.');
                }
            } else {
                // Display an error message for invalid member ID
                this.isMemberIdValid = false;
            }
        },
    },
});
var app = new Vue({
    el: '#app',
    data: {
        activeTab: 'books',
        books: [
            { id: 1234, title: 'Murder on the Orient Express', author: 'Agatha Christie', year: 1934, isRented: false },
            { id: 5678, title: 'Harry Potter', author: 'J.K. Rowling', year: 1978, isRented: false }
        ],
        members: [
            { name: 'Joe Williams', id: 1234 },
            { name: 'Takeshi Castle', id: 5678 }
        ],
        searchQuery: '',
        notification: '',
        showAddBookForm: false,
        showAddMemberForm: false,
    },
    methods: {
        toggleAddBookForm() {
            this.showAddBookForm = !this.showAddBookForm;
        },
        toggleAddMemberForm() {
            this.showAddMemberForm = !this.showAddMemberForm;
        },
        activateTab(tabName) {
            this.activeTab = tabName;
        },
        showNotification(message) {
            // Set the notification message and clear it after 3 seconds
            this.notification = message;
            setTimeout(() => {
                this.notification = '';
            }, 3000);
        },
        deleteBook(bookIndex) {
            this.books.splice(bookIndex, 1);
        },
        addBook(newBook) {
            this.showAddBookForm = false;
            this.books.push({ ...newBook, isRented: false });
        },
        addMember(newMember) {
            this.showAddMemberForm = false;
            this.members.push({ ...newMember });
        },
        deleteMember(memberIndex) {
            this.members.splice(memberIndex, 1);
            this.showNotification('Member deleted successfully.');
        }
    },
    computed: {
        filteredBooks() {
            // Use the searchQuery to filter books based on title or author
            const query = this.searchQuery.toLowerCase();
            return this.books.filter(book => {
                const titleMatch = book.title.toLowerCase().includes(query);
                const authorMatch = book.author.toLowerCase().includes(query);
                const yearMatch = book.year.toString().includes(query);
                const idMatch = book.id.toString().includes(query);
                return titleMatch || authorMatch || yearMatch || idMatch;
            });
        },
    },
});