<template>
    <NuxtLayout/>
    <section class="bg-gray-500">
        <div class="bg-gray-300 max-w-5xl shadow-md m-auto min-h-screen pt-3">
            <div class="px-2">
                <div class="popularGames">
                    <div class="h-10 w-full bg-slate-700">
                        <h1 class="text-2xl px-4 text-white font-bold">Популярные игры</h1>
                    </div>
                    <PopularGames :popularGames="popularGames"/>
                </div>
                <div>
                    <div class="h-10 w-full bg-slate-600">
                        <h1 class="text-2xl px-4 text-white font-bold">Самые рейтинговые игры</h1>
                    </div>
                    <div class="mostRatings flex flex-wrap justify">
                        <Card v-for="game in bestGames" :key="game.id" class="mx-auto" @click="navigateTo(`games/id/${game.id}`)">
                            <template #image>
                                <img :src="`/game_covers/${game.id}.jpg`" height="266" :alt="game.name" class="cursor-pointer"/>
                            </template>
                            <template #content>
                                <h2 class="font-bold h-12">{{ game.name }}</h2>
                            </template>
                            <template #score>
                                <div class="inline-block">
                                    <div v-for="i in 5" class="inline-table w-3">
                                        <div v-if="game.score >= i" class='text-yellow-500 h-fit'>
                                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                            </svg>
                                        </div>
                                        <div v-else class="mr-1 h-fit">
                                            <svg class="text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <p>Баллы: {{ game.score }}</p>
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
import { onBeforeMount , onMounted, ref} from 'vue';
import PopularGames from '~/components/PopularGames.vue';

onBeforeMount(() =>{
    getData()
})
const popularGames = ref([]);
const bestGames = ref([]);

async function getData() {
    fetch(
        `http://localhost:5108/Game/query?sort=scoresCountDesc`,
        {
            method: 'GET'
        })
    .then(async response => {
    const content = await response.json();
    popularGames.value = content.data;
    console.log(popularGames.value)
    return fetch(
        `http://localhost:5108/Game/query?sort=scoreDesc`,
        {
            method: 'GET'
        })
        .then(async response => {
        const content = await response.json();
        bestGames.value = content.data;
        console.log(bestGames.value)
        })
    })
    .catch(err => {
        console.error(err);
    });
};
</script>

<style scoped>

</style>