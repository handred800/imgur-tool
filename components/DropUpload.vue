<template>
  <label for="file" class="block h-full bg-slate-300 hover:bg-slate-400 cursor-pointer"
    :class="{ 'border-dashed border-4 border-slate-400': isDragOver }">
    <div ref="$dropzone" class="flex justify-center items-center h-full">
      <LucideUpload :size="100" class="pointer-events-none" />
    </div>
    <input type="file" id="file" ref="$file" @change="fileHandler" class="file-input file-input-bordered hidden"
      multiple />
  </label>
  <div v-if="files.length > 0">
    <div class="grid grid-cols-2 gap-3 md:gap-6 md:grid-cols-3 lg:grid-cols-4">
      <div class="relative" v-for="(bolbUrl, index) in filesPreview" :key="bolbUrl">
        <Card :img="bolbUrl"></Card>
        <Dropdown class="absolute top-2 right-2">
          <DropdownItem @click="deleteFile(index)" class="hover:bg-rose-600 hover:text-white">
            <LucideTrash2 /><span>刪除</span>
          </DropdownItem>
        </Dropdown>
      </div>
    </div>
    <button class="btn btn-primary" @click="upload" :disabled="isLoading">
      <LucideLoaderCircle class="animate-spin" v-if="isLoading"/>
      <span>上傳</span>
    </button>
  </div>
</template>
<script setup lang="ts">
import { useDropzone } from '~/composable/useDropzone';

const acceptFormat = ref(['image/png', 'image/jpeg', 'image/gif']);
const isLoading = ref(false);
const $dropzone = ref<HTMLElement>();
const $file = ref<HTMLInputElement>();
const { files: dropFiles, isDragOver } = useDropzone($dropzone, acceptFormat.value);
const files = ref<File[]>([]);

const emit = defineEmits(['upload']);

function cloneAndMergeFiles(fileList: FileList) {
  const newFilesClone: File[] = Array.from(fileList).map((f) => (new File([f], f.name, { type: f.type })))
  files.value = [...files.value, ...newFilesClone];
}

function deleteFile(index) {
  files.value.splice(index, 1);
}

// filehandler
function fileHandler(e: Event) {
  if (!e.target) return;
  cloneAndMergeFiles(e.target.files);
  $file.value = '';
}
watch(dropFiles, () => {
  if (dropFiles.value.length <= 0) return;
  cloneAndMergeFiles(dropFiles.value);
  // console.log(files.value);
})

const filesPreview = computed(() => {
  console.log(files.value);

  return files.value.map((f) => URL.createObjectURL(f))
})

function upload() {
  isLoading.value = true;
  emit('upload', files.value);
}
</script>