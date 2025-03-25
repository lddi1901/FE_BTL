<template>
    <div class="edit-profile-container">
        <h1>Edit Profile</h1>
        <form @submit.prevent="saveProfile">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="user.username" readonly class="readonly" />
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="user.email" readonly class="readonly" />
            </div>
            <div class="form-group">
                <label for="role" class="form-label">Role:</label>
                <select name="role" class="form-select" id="role" v-model="user.role">
                    <option value="reader">Reader</option>
                    <option value="employee">Employee</option>
                </select>
            </div>
            <div class="d-flex justify-content-between">
                <div class="form-group flex-fill me-2">
                    <label for="role">First name:</label>
                    <input type="text" id="role" v-model="user.firstname" readonly class="readonly" />
                </div>
                <div class="form-group flex-fill ms-2">
                    <label for="role">Last name:</label>
                    <input type="text" id="role" v-model="user.lastname" readonly class="readonly" />
                </div>
            </div>
            <div class="form-group">
                <label for="gender">Gender:</label>
                <input type="text" id="gender" v-model="user.gender" readonly class="readonly" />
            </div>
            <div class="form-group">
                <label for="birthday">Birth Day:</label>
                <input type="date" id="position" v-model="user.birthday" readonly class="readonly" />
            </div>
            <div class="form-group">
                <label for="position">Position:</label>
                <input type="text" id="position" v-model="user.position" readonly class="readonly" />
            </div>
            <div class="form-group">
                <label for="address">Address:</label>
                <input type="text" id="address" v-model="user.address" readonly class="readonly" />
            </div>
            <div class="form-group">
                <label for="phonenumber">Phone Number:</label>
                <input type="text" id="phonenumber" v-model="user.phoneNumber" readonly class="readonly" />
            </div>
            <button type="submit" class="save-button btn-save" @click="handleEditProfile">Save</button>
        </form>
    </div>
</template>
<script>
import { getSingleUser, editSingleUser } from '../../API/userApi';
import { onMounted, ref } from 'vue';
import router from '../../router';

export default {
    props: {
        id: {
            type: String,
            Required: true,
        },
    },
    setup(props) {
        const id = props.id;
        const user = ref({});
        const response = ref({});
        onMounted(async () => {
            user.value = await getSingleUser(id);
        });
        const handleEditProfile = async () => {
            response.value = await editSingleUser(id, { role: user.value.role });
            router.push('/users');
        }
        return {
            user,
            handleEditProfile
        }
    }
}
</script>
<style scoped>
.edit-profile-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
