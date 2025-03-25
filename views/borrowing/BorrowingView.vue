<template>
    <div class="container">
        <!-- Navbar -->
        <div class="d-flex align-items-center">
            <div class="navbar-brand text-dark fw-normal fs-1 fw-bold mt-2 head" @click="reload">Borrowed Book List
            </div>
            <form class="d-flex justify-content-center custom-gap-0 ms-auto mt-2" @submit.prevent="handleSearch">
                <input class="form-control me-4 search-input" type="search" placeholder="Enter user name ..."
                    aria-label="Search" v-model="searchText">
                <button class="btn btn-sm btn-search">Search</button>
            </form>
        </div>
        <div class="d-flex justify-content-center align-items-center mt-4">
            <ul class="navbar-nav ms-auto d-flex flex-row m-auto">
                <li class="nav-item">
                    <button class="nav-link text-primary fs-6 fw-normal" :class="{ active: activeItem === 'all' }"
                        @click="setActive('all')">All</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link text-primary fs-6 fw-normal"
                        :class="{ active: activeItem === 'processing' }"
                        @click="setActive('processing')">Requested</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link text-primary fs-6 fw-normal" :class="{ active: activeItem === 'borrowed' }"
                        @click="setActive('borrowed')">Borrowed</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link text-primary fs-6 fw-normal" :class="{ active: activeItem === 'returned' }"
                        @click="setActive('returned')">Returned</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link text-primary fs-6 fw-normal text-danger"
                        :class="{ 'active-overdue': activeItem === 'overdue' }"
                        @click="setActive('overdue')">Overdue</button>
                </li>
            </ul>
        </div>
        <!-- Search -->
        <div v-if="borrowings.length">
            <BorrowingCard v-for="borrowing in borrowings" :borrowing="borrowing" class="borrow-card" />
        </div>
        <div v-else class="mt-4">
            <div v-if="activeItem === 'processing'" class="alert alert-info text-center">
                No books have been requested.
            </div>
            <div v-else-if="activeItem === 'borrowed'" class="alert alert-info text-center">
                No books have been borrowed.
            </div>
            <div v-else-if="activeItem === 'returned'" class="alert alert-info text-center">
                No books have been returned.
            </div>
            <div v-else-if="activeItem === 'overdue'" class="alert alert-info text-center">
                No books are overdue.
            </div>
            <div v-else class="alert alert-info text-center">
                You currently have no books in your list.
            </div>
        </div>
    </div>
</template>

<script>
import BorrowingCard from "../../components/BorrowingCard.vue";
import { ref, onMounted } from "vue";
import { getAllBorrowings } from "../../API/borrowingApi";
export default {
    components: {
        BorrowingCard,
    },
    setup() {
        const allBorrowings = ref([]);
        const borrowings = ref([]);
        const activeItem = ref('all');
        const searchText = ref('');
        onMounted(async () => {
            activeItem.value = 'all';
            allBorrowings.value = await getAllBorrowings();
            borrowings.value = allBorrowings.value;
            sortBorrowings();
        });
        const setActive = (value) => {
            activeItem.value = value;
            if (value === 'all') {
                borrowings.value = allBorrowings.value;
            } else {
                borrowings.value = allBorrowings.value.filter(borrowing => borrowing.status === value);
            }
        }
        const handleSearch = () => {
            if (activeItem.value === 'all') {
                borrowings.value = allBorrowings.value.filter(
                    borrowing => borrowing.reader.username.toLowerCase().includes(searchText.value.toLowerCase())
                );
            } else {
                borrowings.value = allBorrowings.value.filter((borrowing) => (borrowing.status === activeItem.value
                    && borrowing.reader.username.toLowerCase().includes(searchText.value.toLowerCase())))
            }
            sortBorrowings();
        }

        const sortBorrowings = () => {
            borrowings.value.sort((a, b) => {
                if (a.requestDate < b.requestDate) return -1;
                if (a.requestDate > b.requestDate) return 1;
                return 0;
            });
        };

        const reload = () => {
            window.location.reload();
        }

        return {
            borrowings,
            setActive,
            searchText,
            handleSearch,
            activeItem,
            searchText,
            reload,
        };
    },
};
</script>

<style scoped>
.head {
    cursor: pointer;
}

.btn-search,
.search-input {
    height: 40px;
}

.navbar-brand {
    color: #4921f3 !important;
}

.nav-link {
    width: 120px;
    border-radius: 10px;
    font-weight: bolder !important;
}

.active {
    background-color: #0d6efd !important;
    color: white !important;
}

.active-overdue {
    background-color: #dc3545 !important;
    color: white !important;
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

.navbar {
    padding: 0;
}

.navbar-nav .nav-link:hover {
    font-weight: bold !important;
    font-size: 1.1em;
    margin: 0px !important;
}

.custom-gap-0>* {
    margin: 2px !important;
}

.search-input {
    max-width: 300px;
}
</style>
