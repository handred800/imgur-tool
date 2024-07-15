export function useDropzone($el, acceptFormat:string[]) {
    const isDragOver = ref(false);
    const files = ref<File[]>([]);

    function hasInvalidFormat(fileList:File[]) {
        const fs = Array.from(fileList)
        return fs.some((f) => !acceptFormat.includes(f.type))
    }

    onMounted(() => {
        $el.value.addEventListener('dragenter', (e) => {            
            e.preventDefault();
            isDragOver.value = true;
        })

        $el.value.addEventListener('dragleave', (e) => {
            e.preventDefault();
            isDragOver.value = false;

        })

        $el.value.addEventListener('dragover', (e) => e.preventDefault())

        $el.value.addEventListener('drop', (e:DragEvent) => {
            isDragOver.value = false;
            e.preventDefault();
            
            if (!e.dataTransfer) return;
            const res = Array.from(e.dataTransfer.files);
            if (acceptFormat) {
                if (hasInvalidFormat(res)) {
                    // 不接受格式
                    alert('不接受的格式');
                } else {
                    files.value = res;
                }
            } else {
                files.value = res;
            }
        })
    })

    return { files, isDragOver }
}