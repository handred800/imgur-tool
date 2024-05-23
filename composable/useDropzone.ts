export function useDropzone($el, acceptFormat:string[]) {
    const isDragOver = ref(false);
    const files = ref<File[]>([]);

    function hasInvalidFormat(fileList:FileList) {
        const fs = Array.from(fileList)
        return fs.some((f) => !acceptFormat.includes(f.type))
    }
    watch($el, () => {        
        if(!$el.value) return;
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
            e.preventDefault();
            if (!e.dataTransfer) return;
            const files = Array.from(e.dataTransfer.files);
            if (acceptFormat) {
                if (hasInvalidFormat(files)) {
                    // 不接受格式
                    alert('不接受的格式');
                } else {
                    files.value = files;
                }
            } else {
                files.value = files;
            }
        })
    })
    return { files, isDragOver }
}