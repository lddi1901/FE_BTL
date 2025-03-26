<template>
    <div class="profile-container">
        <h1>Thông tin cá nhân</h1>
        <div class="profile-item">
            <label>Tên người dùng:</label>
            <span>{{ user.username }}</span>
        </div>
        <div class="profile-item">
            <label>Email:</label>
            <span>{{ user.email }}</span>
        </div>
        <div class="profile-item">
            <label>Vài trò:</label>
            <span>{{ user.role }}</span>
        </div>
        <div class="profile-item">
            <label>Tên:</label>
            <span>{{ user.firstname + ' ' + user.lastname }}</span>
        </div>
        <div class="profile-item">
            <label>Giới tính:</label>
            <span>{{ user.gender }}</span>
        </div>
        <div class="profile-item" v-if="user.birthday">
            <label>Ngày sinh:</label>
            <span>{{ formatDate(user.birthday) }}</span>
        </div>
        <div class="profile-item">
            <label>Vị trí:</label>
            <span>{{ user.position }}</span>
        </div>
        <div class="profile-item">
            <label>Địa chỉ:</label>
            <span>{{ user.address }}</span>
        </div>
        <div class="profile-item">
            <label>Số điện thoại:</label>
            <span>{{ user.phoneNumber }}</span>
        </div>
        <div class="d-flex justify-content-around mt-4">
            <router-link to="/" class="btn btn-secondary">Thoát</router-link>
            <button class="edit-button btn btn-danger" @click="editProfile">Chỉnh sửa</button>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#changePasswordModal">
                Đổi mật khẩu
            </button>

            <!-- Modal -->
            <div class="modal fade" id="changePasswordModal" tabindex="-1" aria-labelledby="changePasswordLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="changePasswordLabel">Đổi mật khẩu</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="oldpassword" class="form-label">Mật khẩu cũ</label>
                                <input type="password" class="form-control" id="oldpassword" v-model="oldPassword"
                                    required>
                            </div>
                            <div class="mb-3">
                                <label for="newpassword" class="form-label">Mật khẩu mới</label>
                                <input type="password" class="form-control" id="newpassword" v-model="newPassword"
                                    required>
                            </div>
                        </div>
                        <p v-if="response.msg === 'Invalid Credentials'"
                            class=" alert alert-danger custom-alert ms-4 me-4">{{ response.msg }}</p>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="button" class="btn btn-primary" @click="handleChangePassword">Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End modal -->
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../../stores/authStore';
import { useRouter } from 'vue-router';
import { showMe, updateUserPassword } from '../../API/userApi';

export default {
    setup() {
        const authStore = useAuthStore();
        const user = ref({});
        const router = useRouter();
        const newPassword = ref('');
        const oldPassword = ref('');
        const response = ref({});

        const editProfile = () => {
            router.push('/edit-profile');
        };
        const handleChangePassword = async () => {
            response.value = await updateUserPassword({ oldPassword: oldPassword.value, newPassword: newPassword.value });
            if (response.value.msg !== 'Invalid Credentials') {
                window.location.reload();
            }
        };
        const formatDate = (date) => {
            return new Date(date).toLocaleDateString();
        };
        onMounted(async () => {
            user.value = (await showMe()).data.user;
        });

        return {
            user,
            editProfile,
            handleChangePassword,
            newPassword,
            oldPassword,
            response,
            formatDate,
        };
    },
};
</script>

<style scoped>
.profile-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
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

.btn {
    width: 150px;
}
</style>
