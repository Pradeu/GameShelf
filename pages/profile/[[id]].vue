<template>
    <NuxtLayout/>
    <div class="bg-gray-500 px-80">
        <div class="bg-gray-300 max-w-5xl shadow-md m-auto min-h-screen pt-3">
            <div class="text-3xl font-semibold border-b-2 border-black border-solid mx-4">Личная страница пользователя {{ user.name }}</div>
            <div class="py-5"></div>
            <div class="flex mx-4 h-48">
                <img :src="`/user_avatars/${$route.params.id}.png`" class="rounded-md border-2 border-gray-500"/>
                <div class="flex-grow"></div>
                <div v-if="user.createdAt">
                    Аккаунт создан в : {{ user.createdAt.slice(0, 10) }}
                </div>
            </div>
            <div class="flex pt-3 ms-4 me-10">
                <div class="w-fit">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded h-10" v-if="$route.params.id == useStore.user.id">Загрузить аватарку</button>
                <div class="h-4"></div>
                <button class="bg-slate-600 hover:bg-slate-700 text-white font-bold px-4 rounded h-10">Список игр</button>
                </div>
                <div class="flex-grow"></div>
                <div class="w-fit">
                    <div v-if="user.gamesList">Количество игр в списке: {{ user.gamesList.length }}</div>
                    <div>Количество оценок:</div>
                </div>
            </div>
            <!-- <div class="flex">
                <Card v-for="game in gameData" class="" @click="navigateTo(`games/id/${game.id}`)">
                    <template #image>
                        <img :src="`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`" height="266" :alt="game.name" class="cursor-pointer"/>
                    </template>
                    <template #content>
                        <h2 class="font-bold">{{ game.name }}</h2>
                    </template>
                    <template #score>
                        <div v-for="i in 5" class="inline-block w-3">
                            <span v-if="game.rating >= (i - 1) * 20" class='text-yellow-500 mr-1'>
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                            </span>
                            <span v-else class="mr-1">
                                <svg class="text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                            </span>
                        </div>
                        <div>Баллы: {{ Math.trunc(game.rating) }}</div>
                    </template>
                </Card>
            </div> -->
        </div>
        
    </div>
</template>

<script setup>
import { Client_ID, Authorization_Token } from '~/assets/config';
import { userStore } from '~/stores';
const route = useRoute()
const user = ref([])
const gameData = ref([])
const router = useRouter()
const useStore = userStore()

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
        console.log(user.value.gamesList.toString())
        return fetch(
  "http://localhost:8080/https://api.igdb.com/v4/games",
  { method: 'POST',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Client-ID': `${Client_ID}`,
      'Authorization': `${Authorization_Token}`,
    },
    body: `fields name,rating,cover.image_id,genres.name,platforms.name,storyline; where id=(${user.value.gamesList.toString()});`
})
  .then(async response => {
      const data = await response.json();
      console.log(data)
      gameData.value = data
      console.log(gameData)
      return gameData;    
  })
  .catch(err => {
      console.error(err);
  });;
    })
    .catch(async err => {
        console.error(err);
    })
}
</script>

<style lang="scss" scoped>

</style>