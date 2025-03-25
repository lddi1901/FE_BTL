import UserView from "../views/user/UserView.vue";
import UserDetailsView from "../views/user/UserDetailsView.vue";
import EditUserView from "../views/user/EditUserView.vue";

export default [
    {
        path: '/users',
        name: 'users',
        component: UserView,
    },
    {
        path: '/users/details/:id',
        name: 'userdetails',
        component: UserDetailsView,
        props: true,
    },
    {
        path: '/users/edit/:id',
        name: 'edit-user',
        component: EditUserView,
        props: true,
    },
];