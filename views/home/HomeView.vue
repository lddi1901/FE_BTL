<template>
    <div>
        <div class="container mt-2">
            <div class="welcome-section text-center p-2">
                <h1 class="display-5 text-home fs-2 fw-bold mb-0">CHÀO MỪNG ĐẾN VỚI THƯ VIỆN SÁCH!</h1>
                <p class="lead text-home fs-5 fw-normal mb-1">Discover a world of knowledge and adventure</p>
                <router-link class="btn btn-light-blue fs-6 fw-bold mt-1" to="/books">
                    Tìm sách
                    <i class="fa-solid fa-magnifying-glass ms-1"></i>
                </router-link>
            </div>
            <div class="d-flex justify-content-center">
                <div id="carouselExampleIndicators" class="carousel slide mt-2" data-bs-ride="carousel"
                    data-bs-interval="3000">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                            class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                            aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                            aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="https://bizweb.dktcdn.net/100/438/408/articles/nhung-cuon-sach-hay.jpg?v=1683514806703" class="d-block w-100"
                                alt="Image 1">
                        </div>
                        <div class="carousel-item">
                            <img src="https://vcdn.tikicdn.com/assets/events/sach-hay-mua-thu/img/sach-hay-mua-thu.jpg"
                                class="d-block w-100" alt="Image 2">
                        </div>
                        <div class="carousel-item">
                            <img src="https://images2.thanhnien.vn/zoom/642_401/528068263637045248/2025/3/6/bo-sach-tu-duy-17412359586082066975254-239-0-802-900-crop-17412359684641736121273.png"
                                class="d-block w-100" alt="Image 3">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {

}
</script>

<style>
.text-home {
    color: #00008B;
}

.btn-light-blue {
    background-color: #800080;
    color: #ffffff;
}

.btn-light-blue:hover {
    background-color: #670067;
    color: white;
}

.carousel-item img {
    height: 460px;
    width: 720px !important;
    object-fit: contain;
}
</style>
