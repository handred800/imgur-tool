<template>
    <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
        <div class="fixed bottom-5 right-5 p-4 bg-slate-300 shadow-lg text-lg rounded-lg" v-if="isShow">
            {{ message }}
        </div>
    </transition>
</template>
<script setup lang="ts">
const isShow = ref(false);
const message = ref('');

const toggleToast = function(content: string, isOpen = true) {
    message.value = content;
    isShow.value = isOpen;
    if (isShow.value === true) {
        setTimeout(() => {
            isShow.value = false
        }, 50000)
    }
}

defineExpose({ toggleToast })
</script>