<template>
    <div class="text-center">
        <NuxtLayout/>
        <div v-if="gameData">
            <div class="flex justify-center">
                <Card class="w-full" v-for="game in gameData">
                    <template #content>
                        <div class="flex justify-center">
                            <img :src="`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`" height="266" :alt="game.name"/>
                        </div>
                        <h2 class="font-bold">{{ game.name }}</h2>
                        <span class="gameScore">Score: {{ Math.trunc(game.rating) }}</span>
                        <div>
                            Genres:
                            <span v-for="(genre, index) in game.genres" :key="index"> 
                            {{ genre.name }}<span v-if="index !== game.genres.length-1">, </span>
                            </span>
                    </div>

                        <div>
                            Platforms: 
                            <span v-for="(platform, index) in game.platforms" :key="index">
                            {{ platform.name }}<span v-if="index !== game.platforms.length-1">, </span> 
                            </span>
                        </div>

                    </template>
                </Card>
            </div>
            <div class="storyline">
                    <h3 class="font-semibold">Storyline:</h3>
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
const router = useRoute()
const gameData = ref([])


onBeforeMount(() =>{
    getData()
})


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
    body: `fields name,rating,cover.image_id,genres.name,platforms.name,storyline; where id=${router.params.id};`
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
</script>

<style scoped>
.storyline{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    margin: 0 auto;
}
</style>