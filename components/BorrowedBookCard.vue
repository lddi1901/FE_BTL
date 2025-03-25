<template>
    <div class="container row align-items-center border rounded mt-2"
        :class="{ 'background-danger': borrowing.status === 'overdue' }">
        <div class="col-md-2">
            <img :src="'http://localhost:3000/uploads/' + borrowing.book.image" alt="Book Image"
                class="img-fluid rounded">
        </div>
        <div class="col-md-4">
            <h5 class="mb-0">{{ borrowing.book.title }}</h5>
            <p class="mb-0 mt-2" v-if="borrowing.returnDate"><strong>Return Date:</strong> {{ borrowing.returnDate ?
                formatDate(borrowing.returnDate) :
                'Not returned yet' }}</p>

            <div class="mb-0 mt-2" v-else-if="borrowing.borrowDate">
                <p class="mb-0"><strong>Borrow Date:</strong> {{
                    borrowing.borrowDate
                        ? formatDate(borrowing.borrowDate) :
                        'Not borrowed yet' }}</p>
                <p class-="mt-0">
                    <strong class="text-danger">Overdue Date:</strong> {{
                        borrowing.borrowDate && borrowing.duration
                            ? formatDate(calculateOverdueDate(borrowing.borrowDate, borrowing.duration)) :
                            'Not borrowed yet' }}
                </p>
            </div>
            <div class="mb-0 mt-2" v-else>
                <p class="mb-0"><strong>Request Date:</strong> {{
                    formatDate(borrowing.requestDate) }}</p>
                <p class="mt-0"><strong>Duration:</strong> {{ borrowing.duration }}</p>
            </div>

        </div>
        <div class="col-md-4 text-center">
            <p class="mb-0 fs-6">{{ (borrowing.status).charAt(0).toUpperCase() + (borrowing.status).slice(1) }}</p>
            <p v-if="borrowing.employee"><strong>Updated by: {{ borrowing?.employee?.username }}</strong></p>
        </div>
        <div class="col-md-2 text-end">
            <router-link :to="{ name: 'bookdetails', params: { id: borrowing.book._id } }" class="btn btn-primary"
                @click="viewDetails">View Book</router-link>
        </div>
    </div>
</template>

<script>
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
    }
};
</script>

<style scoped>
.container {
    background-color: #fafafa;
}

.background-danger {
    background-color: #f8d7da;
}
</style>