<template>
    <div class="custom-container">
        <nav class="nav nav-pills nav-fill mb-3">
            <a class="nav-link d-flex align-items-center justify-content-center fs-6"
                :class="{ active: activeItem === 'all' }" aria-current="page" @click="setActive('all')">All
                users</a>

            <a class="nav-link d-flex align-items-center justify-content-center fs-6"
                :class="{ active: activeItem === 'employee' }" @click="setActive('employee')">Employee</a>

            <a class="nav-link d-flex align-items-center justify-content-center fs-6"
                :class="{ active: activeItem === 'reader' }" @click="setActive('reader')">Reader</a>

            <form class="search-form d-flex ms-auto" @submit.prevent="handleSearch">
                <input class="form-control me-2" type="search" placeholder="Enter user name..." v-model="searchName"
                    aria-label="Search">
                <button class="search-btn btn btn-outline-white btn-search" type="submit">Search</button>
            </form>
        </nav>
        <div class="user-item d-flex align-items-center justify-content-between p-2 mb-2 border rounded">
            <div class="user-info d-flex align-items-center">
                <span class="sequence-number me-3 fw-bold text-head fs-5">Index</span>
                <span class="username me-3 fw-bold text-head fs-5">User Name</span>
                <span class="email me-3 fw-bold text-head fs-5">Email</span>
                <span class="role fw-bold text-head fs-5">Role</span>
            </div>
        </div>
        <user-item v-for="(showUser, index) in showUsers" :user="showUser" :index=index></user-item>
    </div>
</template>
<script>
import UserItem from '../../components/UserItem.vue';
import { getAllUsers } from '../../API/userApi';
import { ref, onMounted } from 'vue';
export default {
    components: {
        UserItem,
    },
    setup() {
        const users = ref([]);
        const showUsers = ref([]);
        const activeItem = ref('');
        const searchName = ref('');

        onMounted(async () => {
            users.value = (await getAllUsers());
            showUsers.value = users.value;
            activeItem.value = 'all';
        });

        const setActive = (role) => {
            activeItem.value = role;
            if (role === 'all')
                showUsers.value = users.value;
            else
                showUsers.value = users.value.filter(user => {
                    return user.role === role;
                });
            console.log(showUsers.value);
        }

        const handleSearch = () => {
            if (searchName.value.trim() === '') return;
            showUsers.value = users.value.filter(user => {
                return (user.role === activeItem.value || activeItem.value === 'all')
                    && user.username.toLowerCase().includes(searchName.value.toLocaleLowerCase());
            });
        }

        return {
            activeItem,
            setActive,
            showUsers,
            searchName,
            handleSearch,
            users,
        }
    }
}
</script>

<style scoped>
.custom-container {
    margin: 0 auto;
    width: 1000px;
}

.text-head {
    color: #00008B;
}

.nav {
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.nav-link {
    color: #5300ac;
    font-weight: bold;
}

.nav-link.active {
    background-color: #5300ac;
    color: #fff;
}

.nav-link:hover {
    background-color: #5300ac;
    color: #fff;
}

.search-form {
    margin: 0 2px;
    padding: 5px;
}

.btn-search {
    background-color: #5300ac;
    color: white;
}

.btn-search:hover {
    background-color: #b200d5;
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