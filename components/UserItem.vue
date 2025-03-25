<template>
    <div class="user-item d-flex align-items-center justify-content-between p-2 mb-2 border rounded">
        <div class="user-info d-flex align-items-center">
            <span class="sequence-number me-3 fs-6 fw-bolder">{{ index + 1 }}</span>
            <span class="username me-3 fs-5 fw-bolder text-user">{{ user.username }}</span>
            <span class="email me-3 fs-6">{{ user.email }}</span>
            <span class="role fs-6 fw-bolder">{{ user.role }}</span>
        </div>
        <div class="user-actions">
            <router-link :to="{ name: 'userdetails', params: { id: user._id } }"
                class="btn btn-details btn-sm me-2 fs-6" @click="viewDetails(user._id)">Details</router-link>
            <router-link :to="{ name: 'edit-user', params: { id: user._id } }" class="btn btn-edit btn-sm fs-6"
                @click="editUser(user._id)">Edit</router-link>
        </div>
    </div>
</template>

<script>
import { toRefs } from 'vue';

export default {
    props: {
        user: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        const { user, index } = toRefs(props);

        const viewDetails = (id) => {
            console.log(`Viewing details for user with id: ${id}`);
        };

        const editUser = (id) => {
            console.log(`Editing user with id: ${id}`);
        };

        return {
            user,
            index,
            viewDetails,
            editUser
        };
    }
};
</script>

<style scoped>
.btn-details {
    color: white;
    background-color: #0700f8;
}

.btn-edit {
    color: white;
    background-color: #e20050;
}

.text-user {
    color: #e20050;
}

.user-item {
    background-color: #f8f9fa;
}

.user-info span {
    font-size: 14px;
}

.user-actions .btn {
    font-size: 12px;
}

.sequence-number {
    width: 100px;
    text-align: center;
}

.username {
    width: 300px;
    text-align: center;
}

.email {
    width: 150px;
    text-align: center;
}

.role {
    width: 200px;
    text-align: center;
}
</style>
