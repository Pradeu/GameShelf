<template>
    <NuxtLayout/>
    <div class="bg-gray-500">
        <div class="pt-6 m-auto max-w-5xl bg-gray-300 rounded-sm border-4 border-gray-300" v-if="gameData">
            <div v-for="game in gameData">
                <div>
                    <h2 class="font-bold text-5xl py-1.5 border-b-2 border-black">{{ game.name }}</h2>
                    <div class="flex pt-3">
                        <img :src="`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`" height="180" :alt="game.name"/>
                        <div class="flex-grow mx-4">
                            <div>
                                Жанры:
                                <span v-for="(genre, index) in game.genres" :key="index" class="font-medium"> 
                                    {{ genre.name }}<span v-if="index !== game.genres.length-1">,
                                    </span>
                                </span>
                            </div>
                            <div class="pt-4">
                                Платформы: 
                                <span v-for="(platform, index) in game.platforms" :key="index" class="font-medium">
                                    {{ platform.name }}<span v-if="index !== game.platforms.length-1">,
                                    </span>
                                </span>
                            </div>
                            <div class="pt-4">
                                Движок игры: 
                                <span v-for="(engine, index) in game.game_engines" :key="index" class="font-medium">
                                    {{ engine.name }}<span v-if="index !== game.game_engines.length-1">,
                                    </span>
                                </span>
                            </div>
                            <div class="pt-4">
                                Год выпуска: 
                                <span  class="font-medium">
                                    {{ game.release_dates[0].y }}
                                </span>
                            </div>
                        </div>
                        <div>
                            <div class="float-end rounded-md bg-slate-800 text-white w-40">
                                <div class="">
                                    <div class="float-end rounded-sm m-4 size-fit text-lg">Рейтинг: {{ Math.trunc(game.rating) }}</div>
                                    <div class="float-end rounded-sm m-4 size-fit text-sm">Пользователи: {{ Math.trunc(game.rating_count) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!useStore.authenticated" class="pt-8">
                <div class="font-bold">Для добавления игры в список необходимо авторизоваться</div>
            </div>
            <div v-if="useStore.authenticated" class="pt-8">
                                <div v-if="!useStore.user.gamesList.find((e) => e === Number($route.params.id))">
                                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="addGameList(useStore.user.id, $route.params.id)">
                                    Добавить в список
                                    </button>
                                </div>
                                <div v-else>
                                    <button button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="deleteGameList(useStore.user.id, $route.params.id)">
                                        Убрать из списка
                                    </button>
                                </div>
                            </div>
            <div class="storyline pt-10">
                    <h3 class="font-semibold">Сюжет:</h3>
                    <hr>
                    <Card class="min-w-full" v-for="game in gameData">
                        <template #content>
                            {{ game.storyline }}
                        </template>
                    </Card>
                </div>
        </div>
        <div v-else class="font-bold">Now loading...</div>
    </div>
</template>

<script setup>
const useStore = userStore();
const router = useRoute();
const gameData = ref([]);
import { Client_ID, Authorization_Token } from '~/assets/config';


onBeforeMount(() =>{
    getData();
})


async function getData() {
   fetch(
  "http://localhost:8080/https://api.igdb.com/v4/games",
  { method: 'POST',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Client-ID': `${Client_ID}`,
      'Authorization': `${Authorization_Token}`,
    },
    body: `fields name,rating,rating_count,cover.image_id,genres.name,platforms.name,storyline,url,game_engines.name,release_dates.y; where id=${router.params.id};`
})
  .then(async response => {
        const data = await response.json();
      console.log(data);
      gameData.value = data;
      console.log(gameData.value)
      return gameData;    
  })
  .catch(err => {
      console.error(err);
  });
};
async function addGameList(userID, gameID){
    fetch(
        'http://localhost:5109/User/addgame',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({userId: userID, gameId: gameID})
        }
    )
    .then(async response => {
        const data = await response.json();
        console.log(data);
        return data;
    })
    .catch(err => {
        console.error(err);
    })
}

async function deleteGameList(userID, gameID){
    fetch(
        `http://localhost:5109/User/deletegame?UserId=${userID}&GameId=${gameID}`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        }
    )
    .then(async response => {
        const data = await response;
        console.log(data)
        return data;
    })
    .catch(err => {
        console.error(err);
    })
}
</script>

<style scoped>
.storyline{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0 auto;
}
</style>