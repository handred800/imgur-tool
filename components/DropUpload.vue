<template>
  <div class="py-2 space-x-2">
    <label for="file" class="btn">
      <span>選檔案</span>
      <input type="file" id="file" ref="$file" @change="fileHandler" class="file-input file-input-bordered hidden"
        multiple />
    </label>
    <button class="btn bg-purple-500 hover:bg-purple-600 text-white" @click="upload" :disabled="isLoading">
      <LucideLoaderCircle class="animate-spin" v-if="isLoading" />
      <LucideUpload /><span>上傳</span>
    </button>
  </div>
  <div ref="$dropzone" class="dropzone h-[50dvh]" :class="{ 'border-dashed border-4 border-slate-400': isDragOver }">
    <!-- 上傳預覽 -->
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
    </div>
    <div class="flex justify-center items-center bg-slate-300 h-full" v-else>將檔案拖曳至此上傳</div>

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
  console.log('dd');

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