<template>
    <NuxtLayout/>
    <section class="bg-gray-500">
        <div class="bg-gray-300 max-w-5xl shadow-md m-auto min-h-screen pt-3">
            <div class="px-2">
                <div class="h-10 w-full bg-slate-700">
                    <h1 class="text-2xl px-4 text-white font-bold">Популярные жанры за прошедший год</h1>
                </div>
                <div class="py-2 flex">
                    <div class="min-w-80">
                        <div class="flex my-1 px-1 justify-between border border-black" v-if="genres[0]" v-for="index in 10" :key="index">
                        {{ genres[index-1].name }}
                        <div class="">{{ games.filter(g => g.genreList.some(s => s.id === genres[index-1].id)).length }}</div>
                        </div>
                    </div>
                    <div class="flex-grow pt-1 mx-5">
                    </div>
                    <div id="genreChart" class="w-full h-60" ref="genreChart">
                    </div>
                </div>
                <div class="h-10 w-full bg-slate-700">
                    <h1 class="text-2xl px-4 text-white font-bold">Популярные платформы за прошедший год</h1>
                </div>
                <div class="py-2 flex">
                    <div class="min-w-80">
                        <div class="flex my-1 px-1 justify-between border border-black" v-if="platforms[0]" v-for="index in 10" :key="index">
                        {{ platforms[index-1].name }}
                        <div class="">{{ games.filter(g => g.platformList.some(s => s.id === platforms[index-1].id)).length }}</div>
                        </div>
                    </div>
                    <div class="flex-grow pt-1 mx-5">
                    </div>
                    <div id="platformChart" class="w-full h-100" ref="platformChart">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
onBeforeMount(() =>{
    getData()
})
const games = ref([]);
const genres = ref([]);
const platforms = ref([]);

async function getData() {
    fetch(
        `http://localhost:5108/Game`,
        {
            method: 'GET'
        })
    .then(async response => {
    const content = await response.json();
    games.value = content.filter(g => g.releaseYear === 2023);
    console.log(games.value);
    return fetch(
                `http://localhost:5108/Genre`,
                {
                    method: 'GET'
                })
            .then(async response => {
            const genreContent = await response.json();
            genres.value = genreContent.sort((a,b) => {
                const diff = games.value.filter(g => g.genreList.some(s => s.id === a.id)).length - games.value.filter(g => g.genreList.some(s => s.id === b.id)).length
                if (diff === 0) return 0
                const sign = Math.abs(diff) / diff
                return -sign;
            })
            console.log(genres.value)
            return fetch(
                `http://localhost:5108/Platform`,
                {
                    method: 'GET'
                })
            .then(async response => {
            const platformContent = await response.json();
            platforms.value = platformContent.sort((a,b) => {
                const diff = games.value.filter(g => g.platformList.some(s => s.id === a.id)).length - games.value.filter(g => g.platformList.some(s => s.id === b.id)).length
                if (diff === 0) return 0
                const sign = Math.abs(diff) / diff
                return -sign;
            })
            console.log(platforms.value)
            console.log(games.value.filter(g => g.platformList.some(s => s.id === platforms.value.at(0).id)).length)
            if (process.client) {
                var CanvasJS = await import('@canvasjs/charts');
                var genreChart = new CanvasJS.Chart('genreChart', {
                    animationEnabled: true,
                    title: {
                    text: 'Статистика по жанрам игр на сайте',
                    },
                    axisX:{
                        labelFontSize: 10
                    },
                    dataPointWidth: 40,
                    data: [
                    {
                        type: "column",
                        dataPoints: [
                        { label: genres.value.at(0).name, y: games.value.filter(g => g.genreList.some(s => s.id === genres.value.at(0).id)).length },
                        { label: genres.value.at(1).name, y: games.value.filter(g => g.genreList.some(s => s.id === genres.value.at(1).id)).length },
                        { label: genres.value.at(2).name, y: games.value.filter(g => g.genreList.some(s => s.id === genres.value.at(2).id)).length },
                        { label: genres.value.at(3).name, y: games.value.filter(g => g.genreList.some(s => s.id === genres.value.at(3).id)).length },
                        { label: genres.value.at(4).name, y: games.value.filter(g => g.genreList.some(s => s.id === genres.value.at(4).id)).length },
                        { label: genres.value.at(5).name, y: games.value.filter(g => g.genreList.some(s => s.id === genres.value.at(5).id)).length },
                        { label: genres.value.at(6).name, y: games.value.filter(g => g.genreList.some(s => s.id === genres.value.at(6).id)).length },
                        { label: genres.value.at(7).name, y: games.value.filter(g => g.genreList.some(s => s.id === genres.value.at(7).id)).length },
                        { label: genres.value.at(8).name, y: games.value.filter(g => g.genreList.some(s => s.id === genres.value.at(8).id)).length },
                        { label: genres.value.at(9).name, y: games.value.filter(g => g.genreList.some(s => s.id === genres.value.at(9).id)).length },
                        ],
                    },
                    ],
                });
                var platformChart = new CanvasJS.Chart('platformChart', {
                    animationEnabled: true,
                    title: {
                    text: 'Статистика по платформам игр на сайте',
                    },
                    axisX:{
                        labelFontSize: 7
                    },
                    dataPointWidth: 40,
                    data: [
                    {
                        type: "column",
                        dataPoints: [
                        { label: platforms.value.at(0).name, y: games.value.filter(g => g.platformList.some(s => s.id === platforms.value.at(0).id)).length },
                        { label: platforms.value.at(1).name, y: games.value.filter(g => g.platformList.some(s => s.id === platforms.value.at(1).id)).length },
                        { label: platforms.value.at(2).name, y: games.value.filter(g => g.platformList.some(s => s.id === platforms.value.at(2).id)).length },
                        { label: platforms.value.at(3).name, y: games.value.filter(g => g.platformList.some(s => s.id === platforms.value.at(3).id)).length },
                        { label: platforms.value.at(4).name, y: games.value.filter(g => g.platformList.some(s => s.id === platforms.value.at(4).id)).length },
                        { label: platforms.value.at(5).name, y: games.value.filter(g => g.platformList.some(s => s.id === platforms.value.at(5).id)).length },
                        { label: platforms.value.at(6).name, y: games.value.filter(g => g.platformList.some(s => s.id === platforms.value.at(6).id)).length },
                        { label: platforms.value.at(7).name, y: games.value.filter(g => g.platformList.some(s => s.id === platforms.value.at(7).id)).length },
                        { label: platforms.value.at(8).name, y: games.value.filter(g => g.platformList.some(s => s.id === platforms.value.at(8).id)).length },
                        { label: platforms.value.at(9).name, y: games.value.filter(g => g.platformList.some(s => s.id === platforms.value.at(9).id)).length },
                        ],
                    },
                    ],
                });
            genreChart.render();
            platformChart.render();
            }
            return platforms;
            })
            .catch(err => {
                console.error(err);
            })
    })
    .catch(err => {
        console.error(err);
    });
});}

</script>

<style lang="scss" scoped>

</style>