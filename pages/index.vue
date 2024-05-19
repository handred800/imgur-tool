<template>
    <div class="relative min-h-dvh overflow-hidden">
        <div class="lg:container mx-auto px-4 ">
            <div class="grid">
                <div>
                    <!-- <a href="https://api.imgur.com/oauth2/authorize?client_id=7a3adb2577f7a4e&response_type=token" target="_blank">登入</a> -->
                    <form @submit.prevent="createAlbum">
                        <input class="input input-bordered" type="text" v-model="albumForm.title">
                        <button class="btn" type="submit">新增相簿</button>
                    </form>
                    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <Card v-for="album in albums" :key="album.id" :interactable="true"
                            :img="album.cover && `https://i.imgur.com/${album.cover}.jpg`" :title="album.title || '無標題'"
                            @click="currentAlbumId = album.id">
                            <template #content>
                                <div class="badge">{{ album.images_count }}</div>
                            </template>
                        </Card>
                    </div>
                </div>
                <!-- 當前相簿 -->
                <Drawer :isShow="currentAlbumId !== null" @close="currentAlbumId = null">
                    <template #title>
                        {{ currentAlbum.title }}
                        <button>
                            <LucideEdit />
                        </button>
                    </template>
                    <div class="py-3">
                        <label for="file" class="btn mr-3">
                            <LucideUpload /><span>上傳</span>
                            <input type="file" id="file" @change="fileHandler" class="file-input file-input-bordered hidden" multiple />
                        </label>
                        <button v-if="filesHolder.length > 0" class="btn btn-primary" @click="uploadImages">上傳</button>
                        <button @click="deleteAlbum" class="btn bg-rose-600 hover:bg-rose-700 text-white">
                            <LucideTrash2 /><span>刪除相簿</span>
                        </button>
                    </div>
                    <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        <Card v-for="image in currentAlbum.images" :key="image.id" :img="image.link">
                            <template #cover>
                                <Dropdown class="absolute top-2 right-2">
                                    <DropdownItem @click="copy(image.link)">
                                        <LucideCopy />
                                        <span>複製連結</span>
                                    </DropdownItem>
                                    <DropdownItem @click="deleteImage(image.id)" class="hover:bg-rose-600 hover:text-white">
                                        <LucideTrash2 /><span>刪除</span>
                                    </DropdownItem>
                                </Dropdown>
                            </template>
                        </Card>
                    </div>
                </Drawer>
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
const { albums, currentAlbumId, currentAlbum } = storeToRefs(storeAlbum);

if (albums.value <= 0) {
    getAlbums()
}

async function copy(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch(error) {
        alert(error)
    }
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
    currentAlbum.value = [];
    currentAlbum.value = await $fetch(`/api/album/${currentAlbumId.value}`).then(({ data }) => data);
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