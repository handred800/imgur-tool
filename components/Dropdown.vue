<template>
    <HeadlessMenu class="absolute top-0 right-0">
        <HeadlessMenuButton>
            <slot name="trigger">
                <button class="btn p-0 px-1" type="button">
                    <LucideEllipsis />
                </button>
            </slot>
        </HeadlessMenuButton>
        <transition enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-out" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <HeadlessMenuItems>
                <div class="absolute right-0 bg-white rounded text-center shadow-lg overflow-hidden whitespace-nowrap">
                    <slot></slot>
                </div>
            </HeadlessMenuItems>
        </transition>
    </HeadlessMenu>
</template>