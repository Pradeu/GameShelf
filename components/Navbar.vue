<template>
    <div class="w-50 h-14 shadow-xl flex align-center bg-slate-700">
        <div class="flex justify-center flex-1 pl-4">
            <NuxtLink to="/" class="justify-center">
                <img src="/gameshelf-logo.jpg" alt="logo" class="h-14"/>
            </NuxtLink>
        </div>
        <div class="flex-grow">
            <ul class="flex h-full pt-4 justify-center pr-7 align-center">
                <li class="pr-4">
                    <NuxtLink to="/" class="text-white hover:font-semibold">Главная страница</NuxtLink>
                </li>
                <li class="pr-4">
                    <NuxtLink to="/games" class="text-white hover:font-semibold">Игры</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/about" class="text-white hover:font-semibold">О нас</NuxtLink>
                </li>
            </ul>
        </div>
    </div>
    
</template>

<script>

</script>

<style scoped>

</style>