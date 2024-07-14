<template>
    <form class="mx-2 pt-4">
        <label for="default-search" class="text-sm font-medium sr-only">Поиск</label>
        <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <div class="flex">
                <input @keyup="search($event.target.value)" type="search" id="default-search" class="px-4 py-3 w-full ps-10 text-sm text-white border border-gray-300 rounded-lg bg-gray-500" placeholder="Поиск игры по названию" required />
                <form class="max-w-32 mx-auto">
                    <select id="sort" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-3" @change="sort($event.target.value)">
                    <option value="asc">Сортировка по названию</option>
                    <option value="asc">A -> Z</option>
                    <option value="desc">Z -> A</option>
                    </select>
                </form>
            </div>
        </div>
    </form>
    <div class="gamesCatalog flex flex-wrap justify-center">
        <Card v-for="game in games" :key="game.id" class="mx-auto" @click="navigateTo(`games/id/${game.id}`)">
            <template #image class="">
                <img :src="`/game_covers/${game.id}.jpg`"  height="266" :alt="game.name" class="cursor-pointer"/>
            </template>
            <template #content>
                <h2 class="font-bold h-12 overflow-hidden">{{ game.name }}</h2>
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
    <div class="flex justify-center mt-4" v-if="filters.page < lastPage">
        <button class="text-white bg-slate-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" @click="loadMore">Загрузить ещё</button>
    </div>
</template>

<script>
import Card from '~/components/Card.vue';
export default {
    props: ['games', 'filters', 'lastPage'],
    methods: {
        search(s) {
            this.$emit('set-filters', {
                ...this.filters,
                s,
                page: 1
            });
        },
        sort(sort) {
            this.$emit('set-filters', {
                ...this.filters,
                sort,
                page: 1
            });
        },
        loadMore() {
            this.$emit('set-filters', {
                ...this.filters,
                page: this.filters.page + 1
            });
        }
    }
}
</script>
