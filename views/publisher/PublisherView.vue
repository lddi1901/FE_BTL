<template>
    <div class="container">
        <!-- Navigation Bar -->
        <div class="list-group-item d-flex justify-content-between align-items-center border p-1 rounded">
            <div>
                <span class="fw-bold ms-2 publisher-name">Publisher name</span>
                <span class="fw-bold publisher-address">Address</span>
            </div>
            <div>
                <!-- Button -->
                <button class="btn btn-create me-2" data-bs-toggle="modal" data-bs-target="#createPublisher"
                    @click="handleClick">
                    <i class="fa-solid fa-plus"></i>
                    Add Publisher</button>
                <!-- Model -->
                <div class="modal fade" id="createPublisher" tabindex="-1" aria-labelledby="createNewPublisher"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content custom-modal-height">
                            <div class="modal-header">
                                <h5 class="modal-title fw-bolder" id="createNewPublisher">Add Publisher</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <label for="name">Name</label>
                                <input type="text" v-model="newPublisherName" class="form-control mb-3" id="name">
                                <label for="address">Address</label>
                                <input type="text" v-model="newPublisherAddress" class="form-control mb-3" id="address">
                                <div v-if="errorMessage" class="mt-2">
                                    <p class="alert alert-danger custom-alert p-2">{{ errorMessage }}</p>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-success" @click="addPublisher">Add
                                    Publisher</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Publisher List -->
        <ul class="list-group mt-2">
            <li class="list-group-item d-flex justify-content-between align-items-center"
                v-for="publisher in publishers" :key="publisher._id">
                <div class="d-flex justify-content-center">
                    <span class="fw-bold publisher-name">{{ publisher.name }}</span>
                    <span class="text-muted publisher-address">{{ publisher.address }}</span>
                </div>
                <div>
                    <!-- Button -->
                    <button class="btn btn-edit btn-sm me-2 fs-6 fw-normal" @click="editPublisher(publisher._id)"
                        data-bs-toggle="modal" data-bs-target="#updatePublisher">Edit</button>
                    <button class="btn btn-danger btn-sm fs-6 fw-normal"
                        @click="deleteChoosePublisher(publisher._id, publisher.name)">Delete</button>
                </div>
            </li>
        </ul>
        <!-- Update Modal -->
        <div class="modal fade" id="updatePublisher" tabindex="-1" aria-labelledby="updatePublisherLabel"
            aria-hidden="true" ref="updatePublisherModal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content custom-modal-height">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bolder" id="updatePublisherLabel">Update Publisher</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <label for="updateName">Name</label>
                        <input type="text" v-model="updatePublisherName" class="form-control mb-3" id="updateName">
                        <label for="updateAddress">Address</label>
                        <input type="text" v-model="updatePublisherAddress" class="form-control mb-3"
                            id="updateAddress">
                        <div v-if="errorMessage" class="mt-2">
                            <p class="alert alert-danger custom-alert p-2">{{ errorMessage }}</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" @click="comfirmSavePublisher">Save
                            changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import {
    getAllPublishers,
    createPublisher,
    getSinglePublisher,
    updatePublisher,
    deletePublisher,
} from '../../API/publisherApi';

export default {
    setup() {
        const publishers = ref([]);
        const newPublisherName = ref('');
        const newPublisherAddress = ref('');
        const newPublisher = ref({});
        const updatePublisherName = ref('');
        const updatePublisherAddress = ref('');
        const updatePublisherId = ref('');
        const updatePublisherInfo = ref({});

        const errorMessage = ref('');

        onMounted(async () => {
            publishers.value = await getAllPublishers();
        });

        const addPublisher = async () => {
            if (!newPublisherName.value) {
                errorMessage.value = "Please provide publisher name";
                return;
            }
            else if (!newPublisherAddress.value) {
                errorMessage.value = "Please provide publisher address";
                return;
            }
            else {
                newPublisher.value = await createPublisher({ name: newPublisherName.value, address: newPublisherAddress.value });
                window.location.reload();
            }
        }
        const editPublisher = async (publisherId) => {
            errorMessage.value = '';
            updatePublisherInfo.value = await getSinglePublisher(publisherId);
            updatePublisherId.value = publisherId;
            updatePublisherName.value = updatePublisherInfo.value.name;
            updatePublisherAddress.value = updatePublisherInfo.value.address;

        }
        const comfirmSavePublisher = async () => {
            if (!updatePublisherName.value) {
                errorMessage.value = "Please provide publisher name";
                return;
            }
            else if (!updatePublisherAddress.value) {
                errorMessage.value = "Please provide publisher address";
                return;
            }
            await updatePublisher(updatePublisherId.value, { name: updatePublisherName.value, address: updatePublisherAddress.value });
            window.location.reload();
        }

        const deleteChoosePublisher = async (publisherId, publisherName) => {
            if (confirm(`Do you want to delete "${publisherName}"?`)) {
                await deletePublisher(publisherId);
                window.location.reload();
            }
        }
        const handleClick = () => {
            errorMessage.value = '';
        }
        return {
            publishers,
            newPublisherName,
            newPublisherAddress,
            updatePublisherName,
            updatePublisherAddress,
            addPublisher,
            editPublisher,
            comfirmSavePublisher,
            deleteChoosePublisher,
            errorMessage,
            handleClick,
        }
    }
};
</script>

<style>
.container {
    max-width: 800px;
    margin: auto;
}

.navbar {
    padding: 1rem;
}

.btn-create {
    background: linear-gradient(120deg, #cd00cd, #2162f3);
    color: white;
}

.btn-create:hover {
    background: linear-gradient(120deg, #800080, #4921f3);
    color: white;
}

.btn-edit {
    background-color: #b400b4;
    color: white;
}

.btn-edit:hover {
    background-color: #800080;
    color: white;
}

.list-group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.custom-modal-height .modal-content {
    max-height: 70vh;
    overflow-y: auto;
}

label {
    font-weight: bold;
    margin-bottom: 5px;
}

input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.mb-3 {
    margin-bottom: 1rem;
}

.input-group {
    max-width: 500px;
    margin: auto;
}

.input-group .form-control {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.input-group .btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.publisher-name {
    display: inline-block;
    width: 350px;
    text-align: center;
}

.publisher-address {
    display: inline-block;
    width: 150px;
    text-align: center;
}
</style>
