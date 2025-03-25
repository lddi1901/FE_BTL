<template>
    <div class="mt-5 book-infomation">
        <div class="row">
            <div class="col-md-4 ms-4">
                <img :src="'http://localhost:3000/uploads/' + book.image" class="img-fluid rounded shadow"
                    alt="Book Image">
            </div>
            <div class="col-md-6 ms-4">
                <h1 class="display-4 book-title">{{ book.title }}</h1>
                <p class="lead"><strong>Author:</strong> {{ book.author }}</p>
                <p class="lead"><strong>Price:</strong> {{ book.price }} VND</p>
                <p class="lead"><strong>Quantity:</strong> {{ book.quantity }}</p>
                <p class="lead"><strong>Publication Year:</strong> {{ book.publicationYear }}</p>
                <p class="lead"><strong>Publisher Information:</strong></p>
                <div class="mt-0 ms-4">
                    <p class="fs-5"><strong>Name:</strong> {{ book.publisher?.name }}</p>
                    <p class="fs-5"><strong>Address:</strong> {{ book.publisher?.address }}</p>
                </div>
                <div class="mt-4">
                    <button class="btn me-2 btn-secondary fs-6" @click="handleExit">Exit</button>
                    <router-link v-if="user?.role === 'admin' || user === 'employee'"
                        :to="{ name: 'edit-book', params: { id: book._id } }"
                        class="btn btn-danger me-2 fs-6">Edit</router-link>
                    <button :disabled="book.quantity < 1" class="btn btn-primary ms-2 fs-6" data-bs-toggle="modal"
                        :data-bs-target="'#' + book._id">Borrow</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade " :id="book._id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Book Borrow Confirmation</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-0">
                        <label class="form-label"><strong>Title:</strong></label>
                        <p class="form-control-plaintext mt-0">{{ book.title }}</p>
                    </div>
                    <div class="mb-0">
                        <label class="form-label"><strong>Author:</strong></label>
                        <p class="form-control-plaintext">{{ book.author }}</p>
                    </div>
                    <div class="mb-0">
                        <label class="form-label"><strong>Price:</strong></label>
                        <p class="form-control-plaintext">{{ book.price }}</p>
                    </div>
                    <div class="mb-0">
                        <label class="form-label"><strong>Quantity:</strong></label>
                        <p class="form-control-plaintext">{{ book.quantity }}</p>
                    </div>
                    <div class="mb-0">
                        <label class="form-label"><strong>Duration:</strong></label>
                        <input type="number" min="1" max="90" class="form-control" v-model="duration">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="handleBorrow">Borrow</button>
                </div>
            </div>
        </div>
    </div>
    <!-- End modal -->
</template>

<script>
import { ref, onMounted } from 'vue';
import { getSingleBook } from '../../API/bookApi';
import router from '../../router';
import { useAuthStore } from '../../stores/authStore';
import { createBorrowings } from '../../API/borrowingApi';
export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const book = ref({});
        const user = ref({});
        const duration = ref(7);
        user.value = useAuthStore().user;
        onMounted(async () => {
            book.value = await getSingleBook(props.id);
        });
        const handleExit = () => {
            router.push('/books');
        };
        const handleBorrow = async () => {
            await createBorrowings({ book: book.value._id, duration: duration.value });
            console.log(book.value._id);
            window.location.reload();

        };
        return {
            book,
            handleExit,
            user,
            handleBorrow,
            duration,
        };
    },
}
</script>

<style scoped>
.book-infomation {
    max-width: 1400px;
}

.row {
    margin: auto;
}

.img-fluid {
    width: 500px;
    height: 500px;
    object-fit: cover;
}

h1.display-4 {
    font-size: 2.5rem;
    font-weight: 300;
}

.lead {
    font-size: 1.25rem;
    font-weight: 500;
}

.book-title {
    color: #4921f3;
    font-weight: bolder !important;
    margin-top: 20px;
    margin-bottom: 20px;
}

button:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
    opacity: 0.6;
}
</style>
