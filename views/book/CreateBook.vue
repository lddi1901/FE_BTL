<template>
    <div class="container mt-2 mb-4">
        <div class="d-flex justify-content-center">
            <h1>Thêm sách</h1>
        </div>
        <form @submit.prevent="handleCreateBook" @change="handleFileUpload">
            <div class="mb-3">
                <label for="title" class="form-label">Tên sách:</label>
                <input type="text" v-model="book.title" class="form-control" />
            </div>
            <div class="mb-3">
                <label for="price" class="form-label">Giá:</label>
                <input type="number" min="0" v-model="book.price" class="form-control" />
            </div>
            <div class="mb-3">
                <label for="quantity" class="form-label">Số lượng:</label>
                <input type="number" min="0" v-model="book.quantity" class="form-control" />
            </div>
            <div class="mb-3">
                <label for="publicationYear" class="form-label">Năm xuất bản:</label>
                <input type="number" v-model="book.publicationYear" class="form-control" />
            </div>
            <div class="mb-3">
                <label for="publisher" class="form-label">Nhà xuất bản:</label>
                <select name="publisher" id="publisher" class="form-select" v-model="book.publisher">
                    <option value=""></option>
                    <option v-for="publisher in publishers" :value="publisher">
                        {{ publisher.name + " " + publisher.address }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="author" class="form-label">Tác giả:</label>
                <input type="text" v-model="book.author" class="form-control" />
            </div>
            <div class="mb-3">
                <label for="image" class="form-label">Ảnh sách:</label>
                <input type="file" @change="handleFileUpload" class="form-control" />
            </div>
            <!-- Error message -->
            <div v-if="errorMessage" class="mt-2">
                <p class="alert alert-danger">{{ errorMessage }}</p>
            </div>
            <!-- Button -->
            <div class="mt-4">
                <button type="button" class="btn ms-3 btn-secondary fs-6 btn-sm ms-3"
                    @click.prevent="handleExit">Thoát</button>
                <button type="submit" class="btn btn-primary btn-sm ms-3 fs-6">
                    Thêm sách</button>
            </div>
        </form>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { getAllPublishers } from '../../API/publisherApi';
import { createBook, uploadBookImage } from '../../API/bookApi';
import router from '../../router';

export default {
    setup() {
        const book = ref({
            title: '',
            price: 0,
            quantity: 0,
            publicationYear: new Date().getFullYear(),
            publisher: '',
            author: '',
            image: null,
        });
        const errorMessage = ref('');
        const publishers = ref([]);

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
                errorMessage.value = 'Hãy thêm tên sách';
                return false;
            } else if (book.value.title.length > 100) {
                errorMessage.value = 'Không được quá 100 kí tự';
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
            if (!book.value.file) {
                errorMessage.value = 'Please provide book image';
                return false;
            }
            return (!errorMessage.value);
        }

        const handleCreateBook = async () => {
            if (validateForm()) {
                const data = {
                    title: book.value.title,
                    price: book.value.price,
                    quantity: book.value.quantity,
                    publisher: book.value.publisher._id,
                    author: book.value.author,
                    image: book.value.image,
                    file: book.value.file,
                }
                await createBook(data);
                await uploadBookImage(data.file);
                router.push('/books');
            }
        };

        const handleExit = () => {
            router.push('/books');
        };

        onMounted(async () => {
            publishers.value = await getAllPublishers();
        });

        return {
            handleCreateBook,
            handleFileUpload,
            book,
            handleExit,
            publishers,
            errorMessage,
        };
    },
};
</script>
