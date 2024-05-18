<template>
    <div class="lg:container mx-auto px-4">
        <div class="grid">
            <div>
                <!-- <a href="https://api.imgur.com/oauth2/authorize?client_id=7a3adb2577f7a4e&response_type=token" target="_blank">登入</a> -->
                <form @submit.prevent="createAlbum">
                    <input class="input input-bordered" type="text" v-model="albumForm.title">
                    <button class="btn" type="submit">新增相簿</button>
                </form>
                <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    <div v-for="album in albums" :key="album.id" @click="currentAlbumId = album.id" class="card">
                        <figure class="aspect-[5/3] bg-primary">
                            <img class="w-full h-full object-scale-down" v-if="album.cover"
                                :src="`https://i.imgur.com/${album.cover}.jpg`" alt="">
                        </figure>
                        <div class="card-body">
                            <div class="card-title">
                                <div class="text-lg">{{ album.title || '無標題' }}</div>
                                <div class="badge">{{ album.images_count }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 當前相簿 -->
            <div v-if="currentAlbumId !== null">
                <button class="btn" @click="currentAlbumId = null">
                    <LucideX />
                </button>
                <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    <div class="card" v-for="image in currentAlbumImages" :key="image.id">
                        <figure class="aspect-[5/3]">
                            <img class="w-full h-full object-scale-down" :src="image.link" alt="">
                            <Dropdown>
                                <DropdownItem as="a" :href="image.link" target="_blank">連結</DropdownItem>
                                <DropdownItem @click="deleteImage(image.id)" class="hover:bg-rose-600 hover:text-white">刪除</DropdownItem>
                            </Dropdown>
                        </figure>
                    </div>
                </div>
                <input type="file" @change="fileHandler" class="file-input file-input-bordered" multiple />
                <button v-if="filesHolder.length > 0" class="btn btn-primary" @click="uploadImages">上傳</button>
                <button class="btn bg-rose-600 hover:bg-rose-500 text-white" @click="deleteAlbum">
                    <LucideTrash2 class="inline-block mr-1" />刪除相簿
                </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const albumForm = reactive({
    title: '',
});
const filesHolder = ref([]);
const storeAlbum = useImgurAlbum();
const { albums, currentAlbumId, currentAlbumImages } = storeToRefs(storeAlbum);

if (albums.value <= 0) {
    getAlbums()
}

function bb() {
    console.log('ccc');
    
}

function fileHandler(e) {
    filesHolder.value = e.target.files;
    console.log(e.target.files);
    console.log(filesHolder.value);
}

// 相簿
async function getAlbums() {
    albums.value = await $fetch('/api/album').then(({ data }) => data);
}
async function createAlbum() {
    await $fetch('/api/album', {
        method: 'POST',
        body: albumForm
    });
    albumForm.title = '';
    getAlbums();
}
async function deleteAlbum() {
    await $fetch(`/api/album/${currentAlbumId.value}`, { method: 'DELETE' });
    currentAlbumId.value = null;
    getAlbums();
}

// 圖片
async function getAlbumImages() {
    currentAlbumImages.value = await $fetch(`/api/album/${currentAlbumId.value}`).then(({ data }) => data.images);
}
async function uploadImages() {
    const uploadTasks = Array.from(filesHolder.value).map((file) => singleUpload(file));

    function singleUpload(inputFile) {
        const formData = new FormData();
        formData.append('image', inputFile);
        formData.append('album', currentAlbumId.value);
        return $fetch('/api/image', {
            method: 'POST',
            body: formData
        });
    }

    await Promise.all(uploadTasks);
    getAlbumImages();
}
async function deleteImage(id) {
    await $fetch(`/api/image/${id}`, { method: 'DELETE' });
    getAlbumImages();
}

watch(currentAlbumId, (id) => {
    if (id !== null) getAlbumImages();
});
</script>