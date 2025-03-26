<template>
    <div class="container row align-items-center border rounded mt-2 p-2"
        :class="{ 'background-danger': borrowing.status === 'overdue' }">
        <div class="col-md-2">
            <img :src="'http://localhost:3000/uploads/' + borrowing.book.image" alt="Book Image"
                class="img-fluid rounded">
        </div>
        <div class="col-md-3">
            <h5 class="mb-0">{{ borrowing.book.title }}</h5>
            <p class="mb-0 mt-2" v-if="borrowing.returnDate"><strong>Hạn trả:</strong> {{ borrowing.returnDate
                ? formatDate(borrowing.returnDate) :
                'Not returned yet' }}</p>

            <div class="mb-0 mt-2" v-else-if="borrowing.borrowDate">
                <p class="mb-0"><strong>Hạn mượn:</strong> {{
                    borrowing.borrowDate
                        ? formatDate(borrowing.borrowDate) :
                        'Not borrowed yet' }}</p>
                <p class-="mt-0">
                    <strong class="text-danger">Thời gian quá hạn:</strong> {{
                        borrowing.borrowDate && borrowing.duration
                            ? formatDate(calculateOverdueDate(borrowing.borrowDate, borrowing.duration)) :
                            'Not borrowed yet' }}
                </p>
            </div>
            <div class="mb-0 mt-2" v-else>
                <p class="mb-0"><strong>Hạn xử lý:</strong> {{
                    formatDate(borrowing.requestDate) }}</p>
                <p class="mt-0"><strong>Thời gian mượn:</strong> {{ borrowing.duration }}</p>
            </div>

        </div>
        <div class="col-md-3">
            <h5 class="mb-0">{{ borrowing.reader.username }}</h5>
            <p class="mb-0 mt-1">{{ borrowing.reader.email }}</p>
        </div>
        <div class="col-md-2">
            <select name="status" id="status" v-model="borrowing.status">
                <option value="processing"
                    :disabled="borrowing.status === 'returned' || borrowing.status === 'borrowed' || borrowing.status === 'overdue'">
                    Chờ xử lý</option>
                <option value="borrowed" :disabled="borrowing.status === 'returned' || borrowing.status === 'overdue'">
                    Đã mượn</option>
                <option value="returned" :disabled="borrowing.status === 'processing' || borrowing.stats === 'overdue'">
                    Đã trả</option>
                <option value="overdue" disabled>Quá hạn</option>
            </select>
            <div v-if="borrowing.employee" class="mt-2"><strong>Cập nhật bởi:<p class="text-center text-danger">{{
                borrowing?.employee?.username }}</p>
                </strong>
            </div>
        </div>
        <div class="col-md-2 text-end d-flex justify-content-end">
            <button class="btn btn-danger" @click="handleUpdate">Cập nhật</button>
        </div>
    </div>
</template>

<script>
import { updateBorrowing } from '../API/borrowingApi';
export default {
    props: {
        borrowing: {
            type: Object,
            required: true
        }
    },
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleDateString();
        },
        calculateOverdueDate(borrowDate, duration) {
            let date = new Date(borrowDate);
            date.setDate(date.getDate() + duration);
            return date;
        },
        async handleUpdate() {
            const updatedBorrowing = await updateBorrowing(this.borrowing._id, { status: this.borrowing.status });
            alert('Update successfully!');
            window.location.reload();
        },
    }
};
</script>

<style scoped>
.container {
    background-color: #fafafa;
}

.status {
    padding-left: 0 !important;
}

.background-danger {
    background-color: #f8d7da;
}
</style>