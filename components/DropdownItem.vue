<template>
    <HeadlessMenuItem v-slot="{ active }">
        <component :is="as" class="dropdown-link p-2 rounded-lg transition-colors" :class='{ "bg-slate-300": active }'>
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