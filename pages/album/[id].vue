<template>
	<div class="relative w-full h-[200px]">
		<img v-if="currentAlbum.cover" :src="`https://i.imgur.com/${currentAlbum.cover}.jpg`"
			class="block w-full h-full object-cover opacity-50" alt="">
		<div class="absolute w-full h-full backdrop-blur top-0"></div>
	</div>
	<div class="lg:container mx-auto px-4 pt-6">
		<button class="btn" @click="$router.push('/album')">
			<LucideArrowLeft />
		</button>
		<div class="text-lg md:text-3xl font-bold">
			<input type="text" class="" :value="currentAlbum.title" readonly>
		</div>
		<div class="py-3 space-x-3">
			<button class="btn" @click="drawerIsOpen = true">
				<LucidePlus /><span>添加圖片</span>
			</button>
		</div>
		<div class="grid grid-cols-2 gap-3 md:gap-6 md:grid-cols-3 lg:grid-cols-4">
			<div class="relative" v-for="image in currentAlbum.images" :key="image.id">
				<Card :img="image.link" :class="{ 'border-[5px] border-purple-500': selectedImgs.includes(image.id) }">
				</Card>
				<label :for="image.id" class="absolute top-2 left-2 w-full h-full cursor-pointer">
					<input class="hidden" :id="image.id" type="checkbox" v-model="selectedImgs" :value="image.id">
				</label>
				<Dropdown class="absolute top-2 right-2">
					<DropdownItem @click="updateAlbum({ cover: image.id })">
						<LucideImage />
						<span>設為封面</span>
					</DropdownItem>
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
		<!-- footer -->
		<div v-if="selectedImgs.length > 0"
			class="fixed w-full bg-white bottom-0 left-0 py-5 border-t shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.15)]">
			<div class="flex justify-between items-center lg:container mx-auto px-4">
				<div class="font-bold">已選擇 {{ selectedImgs.length }} 張圖片</div>
				<div class="space-x-2">
					<button class="btn" @click="selectedImgs = []">取消選取</button>
					<button @click="deleteSelectedImages" class="btn bg-rose-600 hover:bg-rose-700 text-white">
						<LucideTrash2 />
						<span>刪除</span>
					</button>
				</div>
			</div>
		</div>
		<Toast ref="$toast" />
	</div>
</template>
<script setup lang="ts">
const storeAlbum = useImgurAlbum();
const { currentAlbum } = storeToRefs(storeAlbum);
const route = useRoute();
const $toast = ref();

const drawerIsOpen = ref(false);
const selectedImgs = ref([]);

async function copy(text: string) {
	try {
		await navigator.clipboard.writeText(text);
		$toast.value.toggleToast('已複製');
	} catch (error) {
		alert(error)
	}
}

// 圖片
async function getAlbumImages() {
	currentAlbum.value = [];
	currentAlbum.value = await $fetch(`/api/album/${route.params.id}`).then(({ data }) => data);
}
async function updateAlbum(data) {
	await $fetch(`/api/album/${route.params.id}`, {
		method: 'PUT',
		body: data
	});
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

async function deleteSelectedImages() {
	const reqs = selectedImgs.value.map((id) => $fetch(`/api/image/${id}`, { method: 'DELETE' }))
	try {
		await Promise.all(reqs);
	} catch (error) {
		console.log(error);
	}

	selectedImgs.value = [];
	getAlbumImages();
}

getAlbumImages();
</script>