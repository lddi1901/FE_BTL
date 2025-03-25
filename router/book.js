import BookView from "../views/book/BookView.vue";
import BookDetailsView from '../views/book/BookDetailsView.vue';
import CreateBookView from '../views/book/CreateBook.vue';
import EditBookView from "../views/book/EditBookView.vue";

export default [
    {
        path: '/books',
        name: 'book',
        component: BookView,
    },
    {
        path: '/books/:id',
        name: 'bookdetails',
        component: BookDetailsView,
        props: true,
    },
    {
        path: '/books/create',
        name: 'create-book',
        component: CreateBookView,
    },
    {
        path: '/books/edit/:id',
        name: 'edit-book',
        component: EditBookView,
        props: true,
    },
];