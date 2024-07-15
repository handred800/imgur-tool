<template>
    <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
        <div class="fixed bottom-5 right-5 p-4 bg-white shadow-lg text-lg rounded-lg" v-if="$props.isShow">
            {{ $props.message }}
        </div>
    </transition>
</template>
<script setup lang="ts">
const emit = defineEmits(['close']);

defineExpose({ toggleToast })
</script>