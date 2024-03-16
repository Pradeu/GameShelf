<template>
    <div class="card rounded-md bg-white shadow-lg mx-2 my-4 w-48 flex flex-col max-w-fit overflow-hidden hover:bg-slate-200">
        <div class="image overflow-hidden">
            <slot name="image"></slot>
        </div>
        <div class="content pl-2">
            <slot name="content"></slot>
        </div>
        <div class="score pl-2 pb-4">
            <slot name="score"></slot>
        </div>
    </div>
</template>

<script setup>



</script>