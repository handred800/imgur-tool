<template>
    <label for="file" class="block h-full bg-slate-300 hover:bg-slate-400 cursor-pointer" :class="{'border-dashed border-4 border-slate-400': isDragOver}">
        <div ref="$dropzone" class="flex justify-center items-center h-full">
            <LucideUpload :size="100" />
        </div>
        <input type="file" id="file" @change="fileHandler" class="file-input file-input-bordered hidden" multiple />
    </label>
    <button v-if="files.length > 0" class="btn btn-primary" @click="uploadImages">上傳</button>
</template>
<script setup lang="ts">
import { useDropzone } from '~/composable/useDropzone';

const $dropzone = ref<HTMLElement>();
const { files:dropFiles, isDragOver } = useDropzone($dropzone);
const files = ref<File[]>([]);

function fileHandler(e:Event) {
    if (!e.target) return;
    files.value = e.target.files;
    console.log(files.value);
}

watch(dropFiles, () => {
    files.value = dropFiles.value;
    console.log(files.value);
})

</script>