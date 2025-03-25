<template>
    <div class="container p-2">
        <!-- Navbar -->
        <div>
            <div class="navbar-brand text-dark fw-normal fs-1 fw-bold">Borrowed Books</div>
            <ul class="navbar-nav ms-auto d-flex flex-row ms-auto justify-content-center mt-3">
                    <li class="nav-item">
                    <button class="nav-link text-primary fs-6 fw-normal" :class="{ active: activeItem === 'all' }"
                        @click="setActive('all')">Tất cả</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link text-primary fs-6 fw-normal"
                        :class="{ active: activeItem === 'processing' }"
                        @click="setActive('processing')"> Yêu cầu</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link text-primary fs-6 fw-normal" :class="{ active: activeItem === 'borrowed' }"
                        @click="setActive('borrowed')">Đang mượn</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link text-primary fs-6 fw-normal" :class="{ active: activeItem === 'returned' }"
                        @click="setActive('returned')">Đã trả</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link text-primary fs-6 fw-normal text-danger"
                        :class="{ 'active-overdue': activeItem === 'overdue' }"
                        @click="setActive('overdue')">Quá hạn</button>
                </li>
            </ul>
        </div>
        <div v-if="borrowings.length" class="mt-2">
            <BorrowedBookCard v-for="borrowing in borrowings" :borrowing="borrowing" class="borrow-card" />
        </div>
        <div v-else class="mt-4">
            <div v-if="activeItem === 'processing'" class="alert alert-info text-center">
                Không có sách nào được yêu cầu.
            </div>
            <div v-else-if="activeItem === 'borrowed'" class="alert alert-info text-center">
                Không có sách nào được mượn.
            </div>
            <div v-else-if="activeItem === 'returned'" class="alert alert-info text-center">
                Không có sách nào được trả.
            </div>
            <div v-else-if="activeItem === 'overdue'" class="alert alert-info text-center">
                Không có sách nào quá hạn.
            </div>
            <div v-else class="alert alert-info text-center">
                Hiện tại bạn không có sách nào trong danh sách.
            </div>
        </div>
    </div>
</template>

<script>
import BorrowedBookCard from "../../components/BorrowedBookCard.vue";
import { ref, onMounted } from "vue";
import { getCurrentBorrowings } from "../../API/borrowingApi";
export default {
    components: {
        BorrowedBookCard,
    },
    setup() {
        const allBorrowings = ref([]);
        const borrowings = ref([]);
        const activeItem = ref('all');
        onMounted(async () => {
            allBorrowings.value = await getCurrentBorrowings();
            borrowings.value = allBorrowings.value;
        });
        const setActive = (value) => {
            activeItem.value = value;
            if (value === 'all') {
                borrowings.value = allBorrowings.value;
            } else {
                borrowings.value = allBorrowings.value.filter(borrowing => borrowing.status === value);
            }
        }
        return {
            borrowings,
            setActive,
            activeItem,
        };
    },
};
</script>

<style scoped>
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

.nav-item {
    width: 150px;
}

.navbar-nav .nav-link:hover {
    font-weight: bold !important;
    font-size: 1.1em;
    margin: 0px !important;
}
</style>
