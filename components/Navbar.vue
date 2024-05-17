<template>
    <div class="w-50 h-14 shadow-xl flex align-center bg-slate-700">
        <div class="flex justify-center flex-1 pl-4">
            <NuxtLink to="/" class="justify-center">
                <img src="/gameshelf-logo.jpg" alt="logo" class="h-14"/>
            </NuxtLink>
        </div>
        <div class="flex-grow">
            <ul class="flex pt-4 pr-7">
                <li class="pr-4">
                    <NuxtLink to="/" class="text-white hover:font-semibold">Главная страница</NuxtLink>
                </li>
                <li class="pr-4">
                    <NuxtLink to="/games" class="text-white hover:font-semibold">Игры</NuxtLink>
                </li>
                <li class="pr-4">
                    <NuxtLink to="/about" class="text-white hover:font-semibold">О нас</NuxtLink>
                </li>
            </ul>
        </div>
        <div class="flex-grow">
            <ul class="flex pt-4 pr-7" v-if="!useStore.authenticated"> 
                <li class="pl-52 pr-4">
                    <NuxtLink to="/login" class="text-white hover:font-semibold">Авторизоваться</NuxtLink>
                </li>
                <li class="">
                    <NuxtLink to="/register" class="text-white hover:font-semibold">Зарегистрироваться</NuxtLink>
                </li>
            </ul>
            <ul class="flex h-full pt-4 pr-7" v-if="useStore.authenticated"> 
                <li class = "pl-52 pr-4">
                </li>
                <li class="pl-52 pr-4">
                    <NuxtLink to="/" class="text-white hover:font-semibold" @click="logout">Разлогиниться</NuxtLink>
                </li>
            </ul>
        </div>
    </div>
    
</template>

<script setup>
import { userStore } from '~/stores';

const useStore = userStore();

const logout = async () => {
    await fetch('http://localhost:5109/User/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });
    await useStore.setAuth(false);
}
</script>

<style scoped>

</style>