<template>
    <div class="card book-card">
        <img :src="'http://localhost:3000/uploads/' + book.image" class="card-img-top" alt="Author Image" />
        <div class="card-body p-2">
            <h5 class="card-title text-primary fw-bold fs-5">
                <router-link :to="`/books/${book._id}`" class="no-underline">{{ book.title }}</router-link>
            </h5>
            <p class="card-text"><strong>Author:</strong> {{ book.author }}</p>
            <p class="card-text"><strong>Price:</strong> {{ book.price }}</p>
            <p class="card-text"><strong>Quantity:</strong> {{ book.quantity }}</p>
        </div>
        <hr>
        <div class="d-flex justify-content-end mt-2">
            <router-link class="btn btn-danger btn-sm fs-6 fw-normal"
                v-if="(user?.role === 'admin') || (user?.role === 'employee')"
                :to="{ name: 'edit-book', params: { id: book._id } }">Edit</router-link>
            <router-link class="btn btn-primary btn-sm fs-6 fw-normal"
                :to="{ name: 'bookdetails', params: { id: book._id } }">Details</router-link>
            <!-- Button trigger modal -->
            <button :disabled="book.quantity < 1" class="btn btn-borrow btn-sm fs-6 fw-normal" data-bs-toggle="modal"
                :data-bs-target="'#' + book._id">Borrow</button>
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
    </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { createBorrowings } from '../API/borrowingApi';
export default {
    props: {
        book: Object,
    },
    setup(props) {
        const authStore = useAuthStore();
        const user = authStore.user;
        const duration = ref(8);

        const handleBorrow = async () => {
            console.log(duration.value);
            await createBorrowings({ book: props.book._id, duration: Number(duration.value) });

            window.location.reload();

        };
        return {
            user,
            handleBorrow,
            duration,
        };
    },
}
</script>

<style scoped>
.book-card {
    width: 18rem;
    height: 375px;
    overflow: hidden;
}

.card-title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 3em;
    margin-bottom: 0;

}

.no-underline {
    text-decoration: none;
}

.card-title:hover {
    text-decoration: underline;
    cursor: pointer;
}

.card-img-top {
    height: 150px;
    object-fit: cover;
}

.card-body {
    flex: none;
}

.card-text {
    margin-bottom: 5px;
}

.btn {
    margin-right: 10px;
}

.btn-borrow {
    color: white;
    background-color: #6610f2;
}

.btn-borrow:hover {
    background-color: #b400b4;
}

.btn:last-child {
    margin-right: 10px;
}

button:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
    opacity: 0.6;
}

hr {
    margin: 0;
    margin-bottom: 5px;
}

.book-info-container {
    max-width: 600px;
    margin: 20px auto;
    padding: 15px;
}

.book-info {
    margin-bottom: 10px;
}

.book-info label {
    font-weight: bold;
}

.book-info p {
    margin-bottom: 5px;
}
</style>
