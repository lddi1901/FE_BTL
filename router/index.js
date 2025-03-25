import { createRouter, createWebHistory } from 'vue-router';

// routes
import homeRoutes from "./home";
import authRoutes from "./auth";
import meRoutes from "./me";
import bookRoutes from "./book";
import userRoutes from "./user";
import publisherRoutes from './publisher';
import borrowingRoutes from './borrowing';

// not found
import NotFound from '../views/notFound/NotFound.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...homeRoutes,
        ...authRoutes,
        ...meRoutes,
        ...bookRoutes,
        ...userRoutes,
        ...publisherRoutes,
        ...borrowingRoutes,
        {
            path: '/:catchAll(.*)',
            name: 'NotFound',
            component: NotFound,
        },
    ],
});

export default router;