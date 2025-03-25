<template>
    <div class="edit-profile-container">
        <h1>Edit Profile</h1>
        <form @submit.prevent="saveProfile">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="user.username" />
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="user.email" readonly class="readonly" />
            </div>
            <div class="form-group">
                <label for="role">Role:</label>
                <input type="text" id="role" v-model="user.role" readonly class="readonly" />
            </div>
            <div class="d-flex justify-content-between">
                <div class="form-group flex-fill me-2">
                    <label for="role">First name:</label>
                    <input type="text" id="role" v-model="user.firstname" />
                </div>
                <div class="form-group flex-fill ms-2">
                    <label for="role">Last name:</label>
                    <input type="text" id="role" v-model="user.lastname" />
                </div>
            </div>
            <div class="form-group">
                <label for="gender">Gender:</label>
                <select name="gender" id="gender" v-model="user.gender" class="form-select">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div class="form-group">
                <label for="birthday">Birth Day:</label>
                <input type="date" id="position" v-model="user.birthday" />
            </div>
            <div class="form-group">
                <label for="position">Position:</label>
                <input type="text" id="position" v-model="user.position" />
            </div>
            <div class="form-group">
                <label for="address">Address:</label>
                <input type="text" id="address" v-model="user.address" />
            </div>
            <div class="form-group">
                <label for="phonenumber">Phone Number:</label>
                <input type="text" id="phonenumber" v-model="user.phoneNumber" />
            </div>
            <button type="submit" class="btn btn-save save-button" @click="handleSaveProfile">Save</button>
        </form>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../../stores/authStore';
import { useRouter } from 'vue-router';
import { showMe, updateUser } from '../../API/userApi';

export default {
    setup() {
        const authStore = useAuthStore();
        const user = ref({});
        const router = useRouter();

        onMounted(async () => {
            const response = await showMe();
            user.value = response.data.user;
        });

        const handleSaveProfile = async () => {
            const data = {
                username: user.value.username,
                firstname: user.value.firstname,
                lastname: user.value.lastname,
                gender: user.value.gender,
                birthday: user.value.birthday,
                position: user.value.position,
                address: user.value.address,
                phoneNumber: user.value.phoneNumber,
            }
            console.dir({ data });
            user.value = (await updateUser(data)).data.user;
            authStore.setUser(user);
            router.push('/profile');
        }

        return {
            user,
            handleSaveProfile,
        };
    },
};
</script>

<style scoped>
h1 {
    color: #00008B !important;
}

.edit-profile-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.flex-fill {
    flex: 1;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #343a40;
}

.form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ced4da;
    border-radius: 4px;
}

h1 {
    text-align: center;
    color: #343a40;
    margin-bottom: 20px;
}

.save-button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
    margin-top: 20px;
}

.save-button:hover {
    background-color: #218838;
}

input.readonly {
    background-color: #e9ecef;
    cursor: not-allowed;
    border: 1px solid #ced4da;
    color: #6c757d;
}

.btn-save {
    background: linear-gradient(120deg, #b400b4, #2162f3);
}
</style>
