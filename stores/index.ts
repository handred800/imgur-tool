export const useImgurAlbum = defineStore('album', () => {
    const albums = ref([]);
    const currentAlbumId = ref(null)
    const currentAlbumImages = ref([]);


    return { albums, currentAlbumImages, currentAlbumId }
})