<template>
    <div class="block shadow-lg transition rounded-lg overflow-hidden border"
        :class="{ 'hover:shadow focus:shadow cursor-pointer': props.interactable }" :tabindex="props.interactable && 0">
        <figure class="relative aspect-[16/10] bg-slate-400">
            <img class="w-full h-full object-scale-down" v-if="props.img" :src="props.img" alt="">
            <slot name="cover"></slot>
        </figure>
        <div v-if="$slots.content" class="py-2 px-4">
            <div class="text-lg font-bold">{{ props.title }}</div>
            <div>
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    interactable: Boolean,
    img: String,
    title: String,
})
</script>