<template>
    <NuxtLayout/>
    <div class="flex justify-center w-15 font-sans hover:font-bold">Главная страница</div>
        <div class="max-w-5xl shadow-md m-auto min-h-screen pt-3">
            <div class="px-2"><div class="popularGames">
                <div class=" h-10 w-full bg-slate-700">
                    <h1 class="text-2xl px-4 text-white font-bold">Popular games</h1>
                </div>
                <PopularGames :popularGames="popularGames"/>
            </div>
            <div>
                <div class="h-10 w-full bg-slate-600">
                    <h1 class="text-2xl px-4 text-white font-bold">Most rated games</h1>
                </div>
                <div class="mostRatings flex flex-wrap justify">
                    <Card v-for="game in popularGames" :key="game.id" class="mx-auto" @click="goGamePage(game)">
                        <template #image>
                            <img :src="`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`" height="266" :alt="game.name" class="cursor-pointer"/>
                        </template>
                        <template #content>
                            <h2 class="font-bold">{{ game.name }}</h2>
                        </template>
                        <template #score>
                            <p>Score: {{ Math.trunc(game.rating) }}</p>
                        </template>
                    </Card>
                </div>
            </div>
            </div>
    </div>
</template>

<script setup>
import { onBeforeMount, onMounted } from 'vue';
import PopularGames from '~/components/PopularGames.vue';

const popularGames = ref([]);

onBeforeMount(() =>{
    getData()
})



const router = useRouter()
const goGamePage = (game) => {
    router.push(`games/id/${game.id}`)
}

async function getData() {
   fetch(
  "http://localhost:8080/https://api.igdb.com/v4/games",
  { method: 'POST',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Client-ID': 'fk89xufput49xlo33bczfy5od2ckmp',
      'Authorization': 'Bearer fnntyrlrlsa6i4dqpafy8cmw5y89zh',
    },
    body: "fields name,rating,cover.image_id; sort rating_count desc; limit 30;"
})
  .then(async response => {
        const data = await response.json();
      console.log(data);
      popularGames.value = data;
      return popularGames;    
  })
  .catch(err => {
      console.error(err);
  });
};

</script>

<style scoped>

</style>