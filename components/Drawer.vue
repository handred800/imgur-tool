<template>
    <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition duration-300 ease-out" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <div v-if="props.isShow" class="fixed top-0 left-0 w-full h-full bg-slate-900/85 backdrop-blur-sm" @click="$emit('close')"></div>
    </transition>
    <transition enter-active-class="transition duration-200 ease-out delay-100"
        enter-from-class="transform translate-y-10 opacity-0" enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-100 ease-out" leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform translate-y-10 opacity-0">
        <div v-if="props.isShow" class="fixed bottom-0 left-0 w-full p-4 bg-white rounded-t-lg">
            <div class="flex justify-between mb-5">
                <div class="text-4xl font-bold">
                    <slot name="title">{{ props.title }}</slot>
                </div>
                <button class="btn rounded-full" @click="$emit('close')">
                    <LucideX />
                </button>
            </div>

            <div class="h-[80vh] overflow-auto">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>
<script setup lang="ts">
defineEmits(['close']);
const props = defineProps({
    isShow: {
        type: Boolean,
        default: false
    },
    title: String
})

</script>