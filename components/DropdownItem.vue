<template>
    <HeadlessMenuItem v-slot="{ active }">
        <component :is="as" class="block px-4 py-2" :class='{ "bg-slate-300": active }'>
            <slot></slot>
        </component>
    </HeadlessMenuItem>
</template>
<script setup>
const props = defineProps({
    icon: String,
    as: {
        type: String,
        default: 'button'
    }
})
</script>