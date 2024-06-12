<template>
    <NuxtLayout/>
    <section class="bg-gray-500">
        <div class="bg-gray-300 max-w-5xl shadow-md m-auto min-h-screen pt-3">
            <div class="px-2">
                <div class="h-10 w-full bg-slate-700">
                    <h1 class="text-2xl px-4 text-white font-bold">Каталог игр</h1>
                </div>
            </div>
            <GamesCatalog :games="games" :filters="filters" :lastPage="lastPage" @set-filters="load($event)"/>
        </div>
    </section>
</template>

<script setup>
import GamesCatalog from '~/components/GamesCatalog.vue';

const games = ref([])
var filters = {
    s: '',
    sort: 'asc',
    page: 1,
}
var lastPage = 0;

onMounted(() =>{
    load(filters);
})

async function load(f) {
    filters.s = f.s;
    filters.sort = f.sort;
    filters.page = f.page;
    const arr = [];

    if (filters.s) {
        arr.push(`s=${filters.s}`);
    }

    if (filters.sort) {
        arr.push(`sort=${filters.sort}`);
    }

    if (filters.page) {
        arr.push(`page=${filters.page}`);
    }

    await fetch(
        `http://localhost:5108/Game/query?${arr.join('&')}`,
        {
            method: 'GET'
        })
    .then(async response => {
    const content = await response.json();
    games.value = content.data;
    lastPage = content.last_page;
    return games;
    })
    .catch(err => {
        console.error(err);
    });
}

// async function getData() {
//    fetch(
//   "http://localhost:8080/https://api.igdb.com/v4/games",
//   { method: 'POST',
//     headers: {
//       'X-Requested-With': 'XMLHttpRequest',
//       'Accept': 'application/json',
//       'Client-ID': `${Client_ID}`,
//       'Authorization': `${Authorization_Token}`,
//     },
//     body: "fields name,rating,cover.image_id; sort rating desc; limit 100;"
// })
//   .then(async response => {
//         const data = await response.json();
//       console.log(data);
//       allGames.value = data;
//       return allGames;    
//   })
//   .catch(err => {
//       console.error(err);
//   });
// };


</script>