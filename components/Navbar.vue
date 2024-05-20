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
                <li class ="pl-4 pr-4">
                    <div class="text-white font-semibold">{{ user.name }}</div>
                </li>
                <li class ="pl-4 pr-4">
                    <button class="text-white hover:font-semibold" @click="goUserPage(user)">Личный кабинет</button>
                </li>
                <li class="pl-4 pr-4">
                    <NuxtLink to="/" class="text-white hover:font-semibold" @click="logout">Разлогиниться</NuxtLink>
                </li>
            </ul>
        </div>
    </div>
    
</template>

<script setup>
import { userStore } from '~/stores';

const useStore = userStore();
const user = ref([]);
const router = useRouter();

onMounted(() =>{
    getUser()
})

const logout = async () => {
    await fetch('http://localhost:5109/User/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });
    await useStore.setAuth(false);
}

async function goUserPage(user){
    router.push(`/profile/${user.id}`);
    console.log(`Произведен переход на страницу пользователя с id ${user.id}`)
}

async function getUser() {
    fetch(
        'http://localhost:5109/User/jwtuser',
        {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        }
    )
    .then(async response => {
        const data = await response.json();
        console.log(data);
        user.value = data;
        if (response.status != 401){
        await useStore.setAuth(true);
    }
        return user;
    })
    .catch(async err => {
        console.error(err);
        await useStore.setAuth(false);
    })
}
</script>

<style scoped>

</style>