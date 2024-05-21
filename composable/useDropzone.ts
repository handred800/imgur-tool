export function useDropzone($el) {
    const isDragOver = ref(false);
    const files = ref<File[]>([]);
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

        $el.value.addEventListener('drop', (e) => {            
            e.preventDefault();
            files.value = e.dataTransfer.files;
        })
    })
    return { files, isDragOver }
}