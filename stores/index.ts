export const useImgurAlbum = defineStore('album', () => {
    const albums = ref([]);
    const currentAlbumId = ref(null)
    const currentAlbum = ref({});


    return { albums, currentAlbum, currentAlbumId }
})