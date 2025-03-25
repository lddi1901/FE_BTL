<template>
    <div class="profile-container mt-2">
        <h1>{{ user.username }}'s Profile</h1>
        <div class="profile-item">
            <label>Username:</label>
            <span>{{ user.username }}</span>
        </div>
        <div class="profile-item">
            <label>Email:</label>
            <span>{{ user.email }}</span>
        </div>
        <div class="profile-item">
            <label>Role:</label>
            <span>{{ user.role }}</span>
        </div>
        <div class="profile-item" v-if="user.birthday">
            <label>Birth day:</label>
            <span>{{ formatDate(user.birthday) }}</span>
        </div>
        <div class="profile-item">
            <label>Position:</label>
            <span>{{ user.position }}</span>
        </div>
        <div class="profile-item">
            <label>Address:</label>
            <span>{{ user.address }}</span>
        </div>
        <div class="profile-item">
            <label>Phone Number:</label>
            <span>{{ user.phoneNumber }}</span>
        </div>
        <div class="d-flex justify-content-end me-2">
            <button class="btn-exit fs-6 fw-normal btn btn-danger" @click="handleExit">Exit</button>
        </div>
    </div>
</template>
<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getSingleUser } from '../../API/userApi';
export default {
    props: {
        id: {
            type: String,
            Required: true,
        }
    },
    setup(props) {
        const user = ref({});
        const router = useRouter();

        const id = props.id;
        onMounted(async () => {
            user.value = await getSingleUser(id);
            console.log(user.value);
        });
        const handleExit = () => {
            router.push('/users');
        };
        const formatDate = (date) => {
            return new Date(date).toLocaleDateString();
        };
        return {
            user,
            handleExit,
            formatDate,
        }
    }
}
</script>

<style scoped>
h1 {
    color: #00008B !important;
}

.profile-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.profile-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.profile-item label {
    font-size: 18px;
    font-weight: bold;
    color: #343a40;
}

.profile-item span {
    font-size: 18px;
    color: #495057;
}

h1 {
    text-align: center;
    color: #343a40;
    margin-bottom: 20px;
}

.btn-exit {
    width: 80px;
}
</style>