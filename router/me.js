import ProfileView from "../views/me/ProfileView.vue";
import EditProfileView from "../views/me/EditProfileView.vue";
import BorrowedBook from '../views/me/BorrowedBook.vue';

export default [
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView,
    },

    {
        path: '/edit-profile',
        name: 'edit-profile',
        component: EditProfileView,
    },
    {
        path: '/borrowedbooks',
        name: 'borrowed-books',
        component: BorrowedBook,
    },
];