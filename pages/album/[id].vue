<template>
	<div class="lg:container mx-auto px-4">
		<button class="btn" @click="$router.push('/album')">
			<LucideArrowLeft />
		</button>
		<div class="text-lg md:text-3xl font-bold">
			{{ currentAlbum.title }}
			<button>
				<LucideEdit />
			</button>
		</div>
		<div class="py-3 space-x-3">
			<button class="btn" @click="drawerIsOpen = true">
				<LucideUpload /><span>上傳</span>
			</button>
			<button @click="deleteAlbum" class="btn bg-rose-600 hover:bg-rose-700 text-white">
				<LucideTrash2 /><span>刪除相簿</span>
			</button>
		</div>
		<div class="grid grid-cols-2 gap-3 md:gap-6 md:grid-cols-3 lg:grid-cols-4">
			<div class="relative" v-for="image in currentAlbum.images" :key="image.id">
				<Card :img="image.link"></Card>
				<Dropdown class="absolute top-2 right-2">
					<DropdownItem @click="copy(image.link)">
						<LucideCopy />
						<span>複製連結</span>
					</DropdownItem>
					<DropdownItem @click="deleteImage(image.id)" class="hover:bg-rose-600 hover:text-white">
						<LucideTrash2 /><span>刪除</span>
					</DropdownItem>
				</Dropdown>
			</div>
		</div>
		<Drawer :is-show="drawerIsOpen" @close="drawerIsOpen = false">
			<DropUpload @upload="uploadImages" />
		</Drawer>
		<Toast ref="$toast" />
	</div>
</template>
<script setup lang="ts">
const storeAlbum = useImgurAlbum();
const { currentAlbum } = storeToRefs(storeAlbum);
const router = useRouter();
const route = useRoute();
const $toast = ref();

const drawerIsOpen = ref(false);

async function copy(text) {
	try {
		await navigator.clipboard.writeText(text);
		$toast.value.toggleToast('已複製');
	} catch (error) {
		alert(error)
	}
}

async function deleteAlbum() {
	await $fetch(`/api/album/${route.params.id}`, { method: 'DELETE' });
	router.push('/album');
}

// 圖片
async function getAlbumImages() {
	currentAlbum.value = [];
	currentAlbum.value = await $fetch(`/api/album/${route.params.id}`).then(({ data }) => data);
}

// upload
function singleUpload(inputFile) {
	const formData = new FormData();
	formData.append('image', inputFile);
	formData.append('album', route.params.id);
	return $fetch('/api/image', {
		method: 'POST',
		body: formData
	});
}
async function uploadImages(files) {
	
	const uploadTasks = files.map((file) => singleUpload(file));
	try {
		await Promise.all(uploadTasks);
		await getAlbumImages();
		drawerIsOpen.value = false;
	} catch (error) {
		alert(error);
	}
}

async function deleteImage(id: string) {
	await $fetch(`/api/image/${id}`, { method: 'DELETE' });
	getAlbumImages();
}

getAlbumImages();
</script>