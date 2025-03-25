<template>
    <div class="container d-flex justify-content-center align-items-center" style="min-height: 50vh;">
        <div class="card p-4" style="width: 24rem;">
            <h3 class="card-title text-center">Register</h3>
            <form @submit.prevent="handleRegister">
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" v-model="username" required>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" v-model="email" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" v-model="password" required>
                </div>
                <p v-if="message" class="alert alert-danger custom-alert">{{ message }}</p>
                <button type="submit" class="btn btn-primary w-100 mt-3" @click="handleRegister">Register</button>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { register } from '../../API/authApi';
import { useRouter } from 'vue-router';
export default {
    setup() {
        const router = useRouter();
        const email = ref('');
        const password = ref('');
        const username = ref('');
        const message = ref('');

        const handleRegister = async () => {
            message.value = '';
            const response = await register({
                username: username.value,
                email: email.value,
                password: password.value
            });
            const user = response.data.user;
            if (!user) {
                message.value = response.data.msg;
                if (message.value.includes('Please provide valid email')) {
                    message.value = 'Please provide valid email';
                }
            }
            else router.push('/');
            console.log(response);
        };

        return {
            username,
            email,
            password,
            message,
            handleRegister,
        };
    }
}
</script>

<style scoped>
.container {
    max-width: 500px;
    margin-top: 10px;
}

.custom-alert {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}
</style>