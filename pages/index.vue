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
import axios from 'axios';

const popularGames = ref(null)

onBeforeMount(() =>{
    getData()
})

onMounted(() =>{
    getData()
})

async function getData() {
    axios.post("http://localhost:3000/",{
        body: "fields name,rating,cover.image_id;sort rating_count desc;",
    }, {
        headers: {
      'Accept': 'application/json',
      'Client-ID': 'fk89xufput49xlo33bczfy5od2ckmp',
      'Authorization': 'Bearer fnntyrlrlsa6i4dqpafy8cmw5y89zh',
    },
    }).then(response => {
      popularGames.value = response.value.data
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });
//    fetch(
//   "https://cors-anywhere.herokuapp.com/api.igdb.com/v4/games",
//   { method: 'POST',
//     headers: {
//       'X-Requested-With': 'XMLHttpRequest',
//       'Accept': '*/*',
//       'Client-ID': 'fk89xufput49xlo33bczfy5od2ckmp',
//       'Authorization': 'Bearer fnntyrlrlsa6i4dqpafy8cmw5y89zh',
//     },
//     body: "fields name,rating,cover.image_id;sort rating_count desc;"
// })
//   .then(response => {
//       popularGames.value = response.value.data
//       console.log(response.json());
//   })
//   .catch(err => {
//       console.error(err);
//   });
}

</script>

<style scoped>

</style>