<template>
    <div class="navbar-container mb-3 mt-8">
        <nav class="navbar navbar-light bg-light">
            <div class="container-fluid justify-content-end">
                <h1 class="me-auto text-head fs-1 fw-bold" @click="reload">Book List</h1>
                <router-link v-if="user?.role === 'admin' || user?.role === 'employee'" :to="{ name: 'create-book' }"
                    class="btn btn-create me-3 fs-6 fw-bold rounded-3">
                    <i class="fa-solid fa-plus"></i>
                    Create Book
                </router-link>
                <form class="d-flex" @submit.prevent="handleSearch">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                        v-model="textSearch">
                    <button class="btn btn-search" type="submit">Search</button>
                </form>
            </div>
        </nav>
    </div>
    <div class="row justify-content-center">
        <BookCard class="col-md-4 book-card" v-for="book in books" :book="book" :key="book._id" />
    </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import BookCard from '../../components/BookCard.vue';
import { getAllBooks } from '../../API/bookApi';
import { useAuthStore } from '../../stores/authStore';
export default {
    setup() {
        const textSearch = ref('');
        const authStore = useAuthStore();
        const allBooks = ref([]);
        const books = ref([]);
        const user = ref({});

        user.value = authStore.user;

        onMounted(async () => {
            allBooks.value = await getAllBooks();
            books.value = allBooks.value;
        });

        const handleSearch = () => {
            books.value = allBooks.value.filter(book =>
                book.title.toLowerCase().includes(textSearch.value.toLowerCase())
            );
        };
        const reload = () => {
            window.location.reload();
        }

        return {
            books,
            user,
            textSearch,
            handleSearch,
            reload,
        };
    },
    components: {
        BookCard,
    },
}
</script>
<style scoped>
h1 {
    color: #4921f3;
    cursor: pointer;
}

.btn-create {
    background: linear-gradient(120deg, #cd00cd, #2162f3);
    color: white;
}

.btn-create:hover {
    background: linear-gradient(120deg, #800080, #4921f3);
    color: white;
}

.btn-search {
    background-color: #5300ac;
    color: white;
    font-weight: bold;
}

.btn-search:hover {
    background-color: #b400b4;
    color: #fff;
}

.row {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
}

.book-card {
    margin: 0px;
}

.navbar {
    margin: auto;
    width: 1250px;
    background-color: #f8f9fa !important;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>