<template>
    <div class="relative min-h-dvh overflow-hidden">
        <div class="lg:container mx-auto px-4">
            <div class="grid">
                <div>
                    <!-- <a href="https://api.imgur.com/oauth2/authorize?client_id=7a3adb2577f7a4e&response_type=token" target="_blank">登入</a> -->
                    <form @submit.prevent="createAlbum">
                        <input class="input input-bordered" type="text" v-model="albumForm.title">
                        <button class="btn" type="submit">新增相簿</button>
                    </form>
                    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <NuxtLink v-for="album in albums" :key="album.id" :to="`/album/${album.id}`">
                            <Card :interactable="true" :img="album.cover && `https://i.imgur.com/${album.cover}.jpg`"
                                :title="album.title || '無標題'">
                                <template #content>
                                    <div class="badge">{{ album.images_count }}</div>
                                </template>
                            </Card>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const albumForm = reactive({
    title: '',
});
const storeAlbum = useImgurAlbum();
const { albums } = storeToRefs(storeAlbum);

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

getAlbums()
</script>