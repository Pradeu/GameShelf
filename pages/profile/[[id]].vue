<template>
    <NuxtLayout/>
    <section class="bg-gray-500 px-80">
        <div class="bg-gray-300 max-w-5xl shadow-md m-auto min-h-screen pt-3" v-if="allGames">
            <div class="text-3xl font-semibold border-b-2 border-black border-solid mx-4">Личная страница пользователя {{ user.name }}</div>
            <div class="py-5"></div>
            <div class="flex mx-4 h-48">
                <img :src="`/user_avatars/${$route.params.id}.png`" class="rounded-md border-2 border-gray-500" onerror="this.src='/avatar-placeholder.png'"/>
                <div class="flex-grow">
                    <div class="relative pt-1 mx-5">
                        <div class="w-2/3 overflow-hidden h-4 mb-4 text-xs flex rounded bg-yellow-500">
                            <div id="status-1" class="h-full w-0 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-600">{{ allGames.filter(g => g.statusId === 1).length }}</div>
                            <div id="status-2" class="h-full w-0 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-700">{{ allGames.filter(g => g.statusId === 2).length }}</div>
                            <div id="status-3" class="h-full w-0 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-600">{{ allGames.filter(g => g.statusId === 3).length }}</div>
                            <div id="status-4" class="h-full w-0 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center">{{ allGames.filter(g => g.statusId === 4).length }}</div>
                        </div>
                        <div>
                            <div class="flex mb-1">
                                <div class="size-4 rounded-full bg-emerald-600 mr-1"></div>
                                <div class="text-xs">Играю</div>
                            </div>
                            <div class="flex mb-1">
                                <div class="size-4 rounded-full bg-blue-700 mr-1"> </div>
                                <div class="text-xs">Пройдено</div>
                            </div>
                            <div class="flex mb-1">
                                <div class="size-4 rounded-full bg-red-600 mr-1"> </div>
                                <div class="text-xs">Брошено</div>
                            </div><div class="flex mb-1">
                                <div class="size-4 rounded-full bg-yellow-500 mr-1"> </div>
                                <div class="text-xs">В планах</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="user.createdAt">
                    Аккаунт создан в : {{ user.createdAt.slice(0, 10) }}
                </div>
            </div>
            <div class="flex pt-3 ms-4 me-10">
                <div class="flex-grow"></div>
                <div class="w-fit">
                    <div>Количество игр в списке: {{ allGames.length }}</div>
                </div>
            </div>
            <div class="mx-4 max-w-5xl flex border-t-2 border-black">
                <div class="min-w-40 pr-8">
                    <div class="flex justify-between my-2 border-2 rounded-sm border-gray-600">
                        <button class="flex w-full" @click="statusChange(0)">
                            <span class="w-full text-left">Все</span>
                            <span class="">{{ allGames.length }}</span>
                        </button>
                    </div>
                    <div class="flex justify-between my-2 border-2 rounded-sm border-gray-600">
                        <button class="flex w-full" @click="statusChange(1)">
                            <span class="w-full text-left">Играю</span>
                            <span class="">{{ allGames.filter(g => g.statusId === 1).length }}</span>
                        </button>
                    </div>
                    <div class="flex justify-between my-2 border-2 rounded-sm border-gray-600">
                        <button class="flex w-full">
                            <span class="w-full text-left" @click="statusChange(2)">Пройдено</span>
                            <span class="">{{ allGames.filter(g => g.statusId === 2).length }}</span>
                        </button>
                    </div>
                    <div class="flex justify-between my-2 border-2 rounded-sm border-gray-600">
                        <button class="flex w-full">
                            <span class="w-full text-left" @click="statusChange(3)">Брошено</span>
                            <span class="">{{ allGames.filter(g => g.statusId === 3).length }}</span>
                        </button>
                    </div>
                    <div class="flex justify-between my-2 border-2 rounded-sm border-gray-600">
                        <button class="flex w-full">
                            <span class="w-full text-left" @click="statusChange(4)">В планах</span>
                            <span class="">{{ allGames.filter(g => g.statusId === 4).length }}</span>
                        </button>
                    </div>
                </div> 
                <div class="flex-col">
                    <div class="pl-2 mt-1">Список игр</div>
                    <div class="flex flex-wrap">
                    <Card v-for="game in filteredGames" :key="game.id" class="" @click="navigateTo(`/games/id/${game.gameId}`)">
                        <template #image>
                            <img :src="`/game_covers/${game.gameId}.jpg`" height="266" :alt="game.name" class="cursor-pointer"/>
                        </template>
                        <template #content>
                            <h2 class="font-bold h-12 overflow-hidden">{{ game.game.name }}</h2>
                        </template>
                        <template #score>
                            <div class="inline-block">
                                <div v-for="i in 5" class="inline-table w-3">
                                    <div v-if="game.game.score >= (i - 1)" class='text-yellow-500 h-fit'>
                                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                        </svg>
                                    </div>
                                    <div v-else class="mr-1">
                                        <svg class="text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                        </svg>
                                    </div>
                                </div>
                                <p>Баллы: {{ game.game.score }}</p>
                                <p>Ваша оценка: {{ game.userScore }}</p>
                            </div>
                        </template>
                    </Card>
                </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { userStore } from '~/stores';
const route = useRoute()
const user = ref([])
const allGames = ref([])
const filteredGames = ref([])
const useStore = userStore()
var gameStatus = 0
var lastPage = 0

onBeforeMount(() => {
    getUser()
})

async function getUser() {
    fetch(
        `http://localhost:5109/User/${route.params.id}`,
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
        return fetch(
        `http://localhost:5108/UserList?UserId=${route.params.id}`,
        {
            method: 'GET'
        })
    .then(async response => {
    const content = await response.json();
    allGames.value = content;
    filteredGames.value = content;
    console.log(allGames.value);
    lastPage = content.last_page;
    console.log(allGames.value.filter(g => g.statusId === 1));
    for (let i = 1; i < 5; i++){
            document.getElementById(`status-${i}`).style.width = `${allGames.value.filter(g => g.statusId === i).length / allGames.value.length * 100}%`;
            console.log(allGames.value.filter(g => g.statusId === i).length / allGames.value.length * 100)
        }
    return allGames;
    })
    .catch(err => {
        console.error(err);
    });
    })
    .catch(async err => {
        console.error(err);
    })
}

async function statusChange(statusId){
    gameStatus = statusId
    if (statusId == 0){
        filteredGames.value = allGames.value
    }
    else {
        filteredGames.value = allGames.value.filter(g => g.statusId === statusId);
    }
    return filteredGames
}

</script>