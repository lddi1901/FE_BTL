<template>
    <div class="container text-center mt-5">
        <h1 class="display-1 fw-bold">404</h1>
        <p class="lead fw-bold">Sorry, the page you are looking for does not exist.</p>
        <router-link to="/" class="btn btn-light-blue">Go to Home</router-link>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
};
</script>

<style scoped>
.container {
    margin-top: 100px;
}

.btn-light-blue {
    background-color: #800080;
    color: #ffffff;
}

.btn-light-blue:hover {
    background-color: #670067;
    color: white;
}
</style>