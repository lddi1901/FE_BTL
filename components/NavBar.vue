<template>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container-fluid">
            <router-link class="navbar-brand fs-4 fw-bold" to="/">
                <i class="fa-solid fa-book-open"></i>
                Library
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarLibraryBook"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarLibraryBook">
                <!-- Left -->
                <ul class="navbar-nav me-auto mb-0 ms-4 mb-lg-0">
                    <li class="nav-item" :class="{ active: activeItem === 'home' }" @click="setActive('home')">
                        <router-link class="nav-link" aria-current="page" to="/">
                            <i class="fa-solid fa-house me-1"></i>
                            Home
                        </router-link>
                    </li>
                    <li v-if="user?.role === 'admin'" class="nav-item ms-4" :class="{ active: activeItem === 'users' }"
                        @click="setActive('users')">
                        <router-link class="nav-link" to="/users">
                            <i class="fa-solid fa-users"></i>
                            User
                        </router-link>
                    </li>
                    <li class="nav-item ms-4" :class="{ active: activeItem === 'books' }" @click="setActive('books')">
                        <router-link class="nav-link " to="/books">
                            <i class="fa-solid fa-book"></i>
                            Book
                        </router-link>
                    </li>
                    <li v-if="user?.role === 'admin' || user?.role === 'employee'" class="nav-item ms-4"
                        :class="{ active: activeItem === 'publisher' }" @click="setActive('publisher')">
                        <router-link to="/publisher" class="nav-link">
                            <i class="fa-regular fa-copy"></i>
                            Publisher
                        </router-link>
                    </li>
                    <li v-if="user?.role === 'admin' || user?.role === 'employee'" class="nav-item ms-4"
                        :class="{ active: activeItem === 'borrowing' }" @click="setActive('borrowing')">
                        <router-link class="nav-link" to="/borrowings">
                            <i class="fa-solid fa-pen-to-square"></i>
                            Borrow
                        </router-link>
                    </li>
                </ul>
                <!-- Right -->
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0 navbar-right">
                    <li class="nav-item" v-if="!user" :class="{ active: activeItem === 'login' }"
                        @click="setActive('login')">
                        <router-link class="nav-link me-2" aria-current="page" to="/login">
                            <i class="fa-solid fa-right-to-bracket"></i>
                            Login
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="!user" :class="{ active: activeItem === 'register' }"
                        @click="setActive('register')">
                        <router-link class="nav-link" to="/register">
                            <i class="fa-solid fa-user-plus"></i>
                            Register
                        </router-link>
                    </li>
                    <li class="nav-item dropdown dropdown-custom" v-if="user">
                        <a class="nav-link dropdown-toggle active fw-bold" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="navbar-username">
                                <i class="fa-solid fa-user icon-user"></i>
                                <span>{{ user.username }}</span>
                            </span>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><router-link class="dropdown-item" to="/profile">Profile</router-link></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><router-link class="dropdown-item" to="/borrowedbooks">Borrowed Books</router-link></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><button class="dropdown-item" @click="handleLogout">Logout</button></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
import { ref, computed, watch, onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { logout } from '../API/authApi';
import { useRouter, useRoute } from 'vue-router';

export default {
    setup() {
        const authStore = useAuthStore();
        const user = computed(() => authStore.user);
        const activeItem = ref('');
        const router = useRouter();
        const route = useRoute();

        const setActive = (item) => {
            activeItem.value = item;
            window.location.reload();
        }

        const handleLogout = async () => {
            console.log('Logout');
            await logout();
            router.push('/');
        };

        onMounted(() => {
            activeItem.value = 'home';
        });

        watch(route, (newRoute) => {
            if (newRoute.path === '/') {
                activeItem.value = 'home';
            } else {
                const pathSegments = newRoute.path.split('/')[1];
                activeItem.value = pathSegments;
            }
        });

        return {
            user,
            authStore,
            activeItem,
            setActive,
            handleLogout,
            router,
        };
    }
};
</script>
<style scoped>
.dropdown-custom .dropdown-menu {
    left: 20px;
    width: 150px;
    text-align: center;
    background: linear-gradient(130deg, purple, blue, purple) !important;
    border: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dropdown-custom .dropdown-item {
    padding: 10px 20px;
    font-size: 16px;
    color: #ffffff;
}

.dropdown-custom .dropdown-item:hover {
    background-color: white;
    font-weight: bold;
    color: purple;
}

.nav-link {
    font-size: 20px;
    color: #ffffff;
    transition: color 0.3s ease;
}

.nav-link:hover {
    color: #FFB6C1 !important;
    font-weight: bolder;
}

.navbar-toggler {
    border: none;
    outline: none;
}

.navbar-toggler-icon {
    transition: transform 0.3s ease;
}

.navbar-toggler[aria-expanded="true"] .navbar-toggler-icon {
    transform: rotate(90deg);
}

.navbar {
    padding: 1rem 2rem;
    height: 75px !important;
    background: linear-gradient(90deg, #800080, #0000ff, #800080);
}

.navbar-brand {
    font-size: 1.5rem;
    color: #ffffff;
}

.navbar-brand:hover {
    color: #FFB6C1;
}

.navbar-right {
    margin-right: 15px;
}

.icon-user {
    margin-right: 8px;
}

.nav-item.active .nav-link {
    color: #ffffff;
    font-weight: bold;
}

.active>* {
    color: #FFB6C1 !important;
}

.navbar-username {
    color: #ffffff !important;
}
</style>