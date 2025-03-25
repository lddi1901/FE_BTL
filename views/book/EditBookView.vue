<template>
    <div class="container mt-2 mb-4">
        <div class="d-flex justify-content-center">
            <h1>Update Book</h1>
        </div>
        <form @submit.prevent="updateBook" @change="handleFileUpload">
            <div class="mb-3">
                <label for="title" class="form-label">Title:</label>
                <input type="text" v-model="book.title" class="form-control" />
            </div>
            <div class="mb-3">
                <label for="price" class="form-label">Price:</label>
                <input type="number" min="0" v-model="book.price" class="form-control" />
            </div>
            <div class="mb-3">
                <label for="quantity" class="form-label">Quantity:</label>
                <input type="number" min="0" v-model="book.quantity" class="form-control" />
            </div>
            <div class="mb-3">
                <label for="publicationYear" class="form-label">Publication Year:</label>
                <input type="number" v-model="book.publicationYear" class="form-control" />
            </div>
            <div class="mb-3">
                <label for="publisher" class="form-label">Publisher:</label>
                <select name="publisher" v-model="book.publisher" id="publisher" class="form-select">
                    <option value=""></option>
                    <option v-for="publisher in publishers" :value="publisher">{{
                        publisher.name }} - {{ publisher.address }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="author" class="form-label">Author:</label>
                <input type="text" v-model="book.author" class="form-control" />
            </div>
            <!-- Error message -->
            <div v-if="errorMessage" class="mt-2">
                <p class="alert alert-danger">{{ errorMessage }}</p>
            </div>
            <div class="mb-3">
                <label for="image" class="form-label">Image:</label>
                <input type="file" @change="handleFileUpload" class="form-control" />
            </div>
            <div>
                <router-link to="/books" class="btn btn-secondary">Exit</router-link>
                <button type="submit" class="btn btn-primary ms-4" @click="handleUpdateBook">Update Book</button>
            </div>
        </form>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { getAllPublishers } from '../../API/publisherApi';
import { getSingleBook, uploadBookImage, updateBook } from '../../API/bookApi';
import router from '../../router';

export default {
    props: {
        id: {
            type: String,
            required: true,
        }
    },
    setup(props) {
        const book = ref({
            title: '',
            price: 0,
            quantity: 0,
            publicationYear: new Date().getFullYear(),
            publisher: '',
            author: '',
            image: null,
        });
        const publishers = ref([]);

        const errorMessage = ref('');

        const handleFileUpload = (event) => {
            const files = event.target.files;
            if (files && files.length > 0) {
                book.value.image = files[0].name;
                book.value.file = files[0];
            }
        };

        const validateForm = () => {
            errorMessage.value = '';
            if (!book.value.title) {
                errorMessage.value = 'Please provide book title';
                return false;
            } else if (book.value.title.length > 100) {
                errorMessage.value = 'Name can not be more than 100 characters';
                return false;
            }
            if (!book.value.price) {
                errorMessage.value = 'Please provide book price';
                return false;
            }
            if (!book.value.quantity) {
                errorMessage.value = 'Please provide quantity';
                return false;
            }
            return (!errorMessage.value);
        }

        const handleUpdateBook = async () => {
            if (validateForm()) {
                const data = {
                    title: book.value.title,
                    price: book.value.price,
                    quantity: book.value.quantity,
                    publisher: book.value.publisher._id,
                    author: book.value.author,
                    file: book.value.file,
                }
                if (book.value.file) {
                    data.image = book.value.image;
                }

                const result = await updateBook(book.value._id, data);
                await uploadBookImage(data.file);
                router.push('/books');
            }
        };

        onMounted(async () => {
            book.value = await getSingleBook(props.id);
            publishers.value = await getAllPublishers();
        });

        return {
            handleUpdateBook,
            handleFileUpload,
            book,
            publishers,
            errorMessage,
        };
    },
};
</script>
