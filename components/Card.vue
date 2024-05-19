<template>
    <div class="block shadow-lg transition rounded-lg overflow-hidden border border-slate-300" :class="{ 'hover:shadow cursor-pointer': props.interactable }">
        <figure class="relative aspect-[16/10] bg-slate-500">
            <img class="w-full h-full object-scale-down" v-if="props.img" :src="props.img" alt="">
            <slot name="cover"></slot>
        </figure>
        <div v-if="$slots.content" class="py-2 px-4">
            <div class="card-title">
                <div class="text-lg">{{ props.title }}</div>
            </div>
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