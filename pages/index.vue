<template>
    <NuxtLayout/>
    <div class="flex justify-center w-15 font-sans hover:font-bold">Главная страница</div>
        <div class="max-w-5xl shadow-md m-auto min-h-screen pt-3">
            <div class="px-2"><div class="popularGames">
                <div class=" h-10 w-full bg-green-400">
                    <h1 class="text-2xl px-4 text-black font-bold">Popular games</h1>
                </div>
                <PopularGames :popularGames="popularGames"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, onMounted } from 'vue';
import PopularGames from '~/components/PopularGames.vue';

const popularGames = ref([])

onBeforeMount(() =>{
    getData()
})

onMounted(() =>{
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
    body: "fields name,rating,cover.url; sort rating_count desc;"
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
}

</script>

<style scoped>

</style>