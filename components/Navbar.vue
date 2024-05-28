<template>
    <div class="w-50 h-14 shadow-xl flex align-center bg-slate-700">
        <div class="flex justify-center flex-1 pl-4">
            <button class="justify-center" @click="navigateTo(`/`)" >
                <img src="/gameshelf-logo.jpg" alt="logo" class="h-14"/>
            </button>
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
            <ul class="flex pt-4" v-if="!useStore.authenticated"> 
                <li class="pl-52 pr-4">
                    <NuxtLink to="/login" class="text-white hover:font-semibold">Авторизоваться</NuxtLink>
                </li>
                <li class="">
                    <NuxtLink to="/register" class="text-white hover:font-semibold">Зарегистрироваться</NuxtLink>
                </li>
            </ul>
            <ul class="flex h-full pt-4 pl-20" v-if="useStore.authenticated"> 
                <li class ="pl-4 pr-4">
                    <div class="text-white font-semibold">{{ user.name }}</div>
                </li>
                <li class ="pl-4 pr-4">
                    <NuxtLink class="text-white hover:font-semibold" :to="`/profile/${user.id}`">Личный кабинет</NuxtLink>
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

onBeforeMount(() =>{
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
        await useStore.setUser(user);
        console.log(useStore.user)
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