<template>
    <div class="container d-flex justify-content-center align-items-center" style="min-height: 50vh;">
        <div class="card p-4" style="width: 24rem;">
            <h3 class="card-title text-center">Login</h3>
            <form @submit.prevent="handleLogin">
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" v-model="email" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" v-model="password" required>
                </div>
                <p class="alert alert-danger custom-alert" v-if="message">{{ message }}</p>
                <button type="submit" class="btn btn-primary w-100 mt-4">Login</button>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { login } from '../../API/authApi';
import { useRouter } from 'vue-router';
export default {
    setup() {
        const router = useRouter();
        const email = ref('');
        const password = ref('');
        const message = ref('');

        const handleLogin = async () => {
            message.value = '';
            const response = await login({ email: email.value, password: password.value });
            const user = response.data.user;
            if (!user) {
                message.value = response.data.msg;
            }
            else router.push('/');
        };

        return {
            email,
            password,
            message,
            handleLogin,
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