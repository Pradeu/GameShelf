<template>
    <NuxtLayout/>
    <div class="bg-gray-500 h-full">
        <div class="pt-6 m-auto max-w-5xl bg-gray-200 rounded-sm border-4 border-gray-200" v-if="gameData">
            <div class="mx-3">
                <h2 class="font-bold text-5xl py-1.5 border-b-2 border-black">{{ gameData.name }}</h2>
                <div class="flex pt-3" v-if="gameData.id">
                    <img :src="`/game_covers/${gameData.id}.jpg`" height="180" :alt="gameData.name"/>
                    <div class="flex-grow mx-2 rounded-md border-2 border-slate-600 bg-gray-300">
                        <h3 class="font-semibold mx-2 pb-2">Информация:</h3>
                        <div class="mx-2">{{ gameData.description }}</div>
                    </div>
                    <div>
                        <div class="float-end rounded-md bg-slate-800 text-white w-40">
                            <div class="">
                                <div class="float-end rounded-sm m-4 size-fit text-lg">Рейтинг: {{ gameData.score }}★</div>
                                <div class="float-end rounded-sm m-4 size-fit text-sm">Пользователи: {{ listData.length }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!useStore.authenticated" class="pt-8 pb-10 mx-3">
                <div class="font-bold">Для добавления игры в список необходимо авторизоваться</div>
            </div>
            <div v-if="useStore.authenticated" class="pt-8 pb-10 mx-3">
                <div v-if="!gameStatus">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="addGameList(useStore.user.id, $route.params.id)">
                    Добавить в список
                    </button>
                </div>
                <div v-if="gameStatus" class="flex border-2 border-black size-fit rounded-lg bg-slate-300">
                    <button button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="deleteGameList(useStore.user.id, $route.params.id)">
                        Убрать из списка
                    </button>
                    <div class="flex ml-4">
                        <select id="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mr-2 text-center" @change="updateUserStatus(useStore.user.id, $route.params.id, $event.target.value)">
                        <option value="1">Играю</option>
                        <option value="2">Прошел</option>
                        <option value="3">Брошено</option>
                        <option value="4">В планах</option>
                    </select>
                    <select id="score" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ml-2 text-center min-w-16" @change="updateUserScore(useStore.user.id, $route.params.id, $event.target.value)">
                        <option value="1">1 ★</option>
                        <option value="2">2 ★</option>
                        <option value="3">3 ★</option>
                        <option value="4">4 ★</option>
                        <option value="5">5 ★</option>
                    </select>
                    </div>
                </div>
            </div>
            <div class="flex mx-3">
                <div class="max-w-60 rounded-md border-2 border-slate-600 bg-gray-300 px-2">
                    <div>
                        Жанры:
                        <span v-for="(genre, index) in gameData.genreList" :key="index" class="font-medium"> 
                            {{ genre.name }}<span v-if="index !== gameData.genreList.length-1">,
                            </span>
                        </span>
                    </div>
                    <div class="pt-4">
                        Платформы: 
                        <span v-for="(platform, index) in gameData.platformList" :key="index" class="font-medium">
                            {{ platform.name }}<span v-if="index !== gameData.platformList.length-1">,
                            </span>
                        </span>
                    </div>
                    <div class="pt-4">
                        Движок игры: 
                        <span v-for="(engine, index) in gameData.engineList" :key="index" class="font-medium">
                            {{ engine.name }}<span v-if="index !== gameData.engineList.length-1">,
                            </span>
                        </span>
                    </div>
                    <div class="pt-4">
                        Год выпуска: 
                        <span class="font-medium">
                            {{ gameData.releaseYear }}
                        </span>
                    </div>
                    <div class="pt-4">
                        Разработчик: 
                        <span v-for="(developer, index) in gameData.developerList" :key="index" class="font-medium">
                            {{ developer.name }}<span v-if="index !== gameData.developerList.length-1">,
                            </span>
                        </span>
                    </div>
                </div>
                <div class="flex-grow max-w-10"></div>
                <div class="flex-grow flex-col max-h-48 px-4 rounded-md border-2 border-slate-600 bg-gray-300">
                    <div>Оценки пользователей: {{ gameData.scoresCount }}</div>
                    <div class="flex justify-center align-middle">
                        <div class="my-1 w-1/5">5:</div>
                        <div class="my-2.5 mx-2 h-3 w-full bg-gray-100 rounded-xl">
                            <div id="score-5" class="h-full w-0 bg-yellow-400 rounded-xl"></div>
                        </div>
                        <div  class="my-1 w-7">{{ listData.filter(g => g.userScore === 5).length }}</div>
                    </div>
                    <div class="flex">
                        <div class="my-1 w-1/5">4:</div>
                        <div class="my-2.5 mx-2 h-3 w-full bg-gray-100 rounded-xl">
                            <div id="score-4" class="h-full w-0 bg-yellow-400 rounded-xl"></div>
                        </div>
                        <div class="my-1 w-7">{{ listData.filter(g => g.userScore === 4).length }}</div>
                    </div>
                    <div class="flex">
                        <div class="my-1 w-1/5">3:</div>
                        <div class="my-2.5 mx-2 h-3 w-full bg-gray-100 rounded-xl">
                            <div id="score-3" class="h-full w-0 bg-yellow-400 rounded-xl"></div>
                        </div>
                        <div  class="my-1 w-7">{{ listData.filter(g => g.userScore === 3).length }}</div>
                    </div>
                    <div class="flex">
                        <div class="my-1 w-1/5">2:</div>
                        <div class="my-2.5 mx-2 h-3 w-full bg-gray-100 rounded-xl">
                            <div id="score-2" class="h-full w-0 bg-yellow-400 rounded-xl"></div>
                        </div>
                        <div class="my-1 w-7">{{ listData.filter(g => g.userScore === 2).length }}</div>
                    </div>
                    <div class="flex">
                        <div class="my-1 w-1/5">1:</div>
                        <div class="my-2.5 mx-2 h-3 w-full bg-gray-100 rounded-xl">
                            <div id="score-1" class="h-full w-0 bg-yellow-400 rounded-xl"></div>
                        </div>
                        <div class="my-1 w-7">{{ listData.filter(g => g.userScore === 1).length }}</div>
                    </div>
                </div>
                <div class="flex-grow max-w-10"></div>
                <div class="flex-grow flex-col max-h-40 px-3 rounded-md border-2 border-slate-600 bg-gray-300">
                    <div>В списках у пользователей: {{ listData.length }}</div>
                    <div class="flex justify-center align-middle">
                        <div class="my-1 w-1/2">Играю:</div>
                        <div class="my-2.5 mx-2 h-3 w-full bg-gray-100 rounded-xl">
                            <div id="list-1" class="h-full w-0 bg-yellow-400 rounded-xl"></div>
                        </div>
                        <div class="my-1 w-7">{{ listData.filter(g => g.statusId === 1).length }}</div>
                    </div>
                    <div class="flex">
                        <div class="my-1 w-1/2">В планах:</div>
                        <div class="my-2.5 mx-2 h-3 w-full bg-gray-100 rounded-xl">
                            <div id="list-2" class="h-full w-0 bg-yellow-400 rounded-xl"></div>
                        </div>
                        <div class="my-1 w-7">{{ listData.filter(g => g.statusId === 2).length }}</div>
                    </div>
                    <div class="flex">
                        <div class="my-1 w-1/2">Брошено:</div>
                        <div class="my-2.5 mx-2 h-3 w-full bg-gray-100 rounded-xl">
                            <div id="list-3" class="h-full w-0 bg-yellow-400 rounded-xl"></div>
                        </div>
                        <div class="my-1 w-7">{{ listData.filter(g => g.statusId === 3).length }}</div>
                    </div>
                    <div class="flex">
                        <div class="my-1 w-1/2">Пройдено:</div>
                        <div class="my-2.5 mx-2 h-3 w-full bg-gray-100 rounded-xl">
                            <div id="list-4" class="h-full w-0 bg-yellow-400 rounded-xl"></div>
                        </div>
                        <div class="my-1 w-7">{{ listData.filter(g => g.statusId === 4).length }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="font-bold">Идет загрузка...</div>
    </div>
</template>


<script setup>
import collect from 'collect.js';
const useStore = userStore();
const router = useRoute();
const gameData = ref([]);
const listData = ref([]);
const listStatus = ref([]);
const gameStatus = ref([]);
const gameScore = ref([]);

onMounted(() =>{
    getData();
    getUserList();
})


async function getData() {
    fetch(
    `http://localhost:5108/Game/${router.params.id}`,
    { 
    method: 'GET'
    })
    .then(async response => {
        const data = await response.json();
        gameData.value = data;
        gameStatus.value = gameData.value.usersId.find((e) => e === useStore.user.id);
        return gameData;    
    })
    .catch(err => {
        console.error(err);
    });
};
async function addGameList(userID, gameID){
    fetch(
        'http://localhost:5108/UserList/addgame',
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
        gameStatus.value = true;
        console.log(gameStatus.value)
        return data;
    })
    .catch(err => {
        console.error(err);
    })
}

async function deleteGameList(userID, gameID){
    fetch(
        `http://localhost:5108/UserList/deletegame?UserId=${userID}&GameId=${gameID}`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        }
    )
    .then(async response => {
        const data = await response.json();
        console.log(data)
        gameStatus.value = null;
        console.log(gameStatus.value)
        return data;
    })
    .catch(err => {
        console.error(err);
    })
}

async function updateUserStatus(userID, gameID, userStatus){
    fetch(
        `http://localhost:5108/UserList/updategamestatus?StatusId=${userStatus}&GameId=${gameID}&UserId=${userID}`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({userId: userID, gameId: gameID})
        }
    )
    .then(async response => {
        const data = await response.json();
        listStatus.value = userStatus
        console.log(data);
        return data
    })
}

async function updateUserScore(userID, gameID, userScore){
    fetch(
        `http://localhost:5108/UserList/updatescore?Score=${userScore}&GameId=${gameID}&UserId=${userID}`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({userId: userID, gameId: gameID})
        }
    )
    .then(async response => {
        const data = await response.json();
        gameScore.value = userScore;
        console.log(data);
        return data
    })
}

async function getUserList(){
    await fetch(
        `http://localhost:5108/UserList?GameId=${router.params.id}`,
        {
            method: 'GET',
        }
    )
    .then(async response =>{
        const data = await response.json();
        listData.value = data
        console.log(listData.value.length)
        for (let i = 1; i < 5; i++){
            document.getElementById(`score-${i}`).style.width = `${listData.value.filter(g => g.userScore === i).length / listData.value.filter(g => g.userScore > 0).length * 100}%`;
            document.getElementById(`list-${i}`).style.width = `${listData.value.filter(g => g.statusId === i).length / listData.value.length * 100}%`;
            if (i === 4) {
                document.getElementById(`score-${i+1}`).style.width = `${listData.value.filter(g => g.userScore === i+1).length / listData.value.filter(g => g.userScore > 0).length * 100}%`;
            }
        }
        const collection = collect(listData.value).where('userId', useStore.user.id);
        console.log(collection);
        listStatus.value = collection.first().statusId;
        gameScore.value = collection.first().userScore;
        console.log(gameScore.value);
        document.getElementById("score").value = gameScore.value;
        document.getElementById("status").value = listStatus.value;
        return listData
    })
}
</script>

<style scoped>
</style>