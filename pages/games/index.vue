<template>
    <NuxtLayout/>
    <div class="flex justify-center w-15 font-sans hover:font-bold">Страница игр</div>
    <div class="max-w-5xl shadow-md m-auto min-h-screen pt-3">
        <div class="h-10 w-full bg-slate-500">
            <h1 class="text-2xl px-4 text-white font-bold">Games catalog</h1>
        </div>
        <div class="gamesCatalog flex flex-wrap justify-center">
                    <Card v-for="game in allGames" :key="game.id" class="mx-auto" @click="goGamePage(game)">
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
</template>

<script setup>


const allGames = ref([]);

onBeforeMount(() =>{
    getData()
})

onMounted(() =>{
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
    body: "fields name,rating,cover.image_id; sort rating desc; limit 100;"
})
  .then(async response => {
        const data = await response.json();
      console.log(data);
      allGames.value = data;
      return allGames;    
  })
  .catch(err => {
      console.error(err);
  });
};


</script>