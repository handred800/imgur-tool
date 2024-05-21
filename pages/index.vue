<template>

</template>
<script setup lang="ts">
definePageMeta({
    middleware: [
        (to, from) => {
            if (to.path === '/') return navigateTo('/album')
        },
    ],
});
</script>