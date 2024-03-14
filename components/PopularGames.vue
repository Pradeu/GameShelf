<template>
    <div>
        <div class="card-slider overflow-x-scroll whitespace-nowrap">
            <span v-for="item, index in onlyFirstFive" :key="index">
                <div class="inline-block shadow-md w-44">
                    <img :src="`https://images.igdb.com/igdb/image/upload/t_cover_big/${item.cover.image_id}.jpg`" :alt="item.name" class="label" @click="goGamePage(item)"/>
                    <div class="p-6">
                        <h6 class="card-text">{{ item.name }}</h6>
                    </div>
                </div>
            </span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    popularGames: {
        type: Array,
        required: true,
    }
})

const { popularGames } = toRefs(props)

const onlyFirstFive = computed(() => {
    return popularGames.value.slice(0, 9)
})

const router = useRouter()
const goGamePage = (game) => {
    router.push(`games/${game.id}`)
}
</script>

<style scoped>
.card-slider {
    margin: 60px auto;
    text-align: center;
}

.card-text {
    font-weight: 700;
    max-width: 30;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: start;
    font-size: 13px;
}

.label {
    justify-self: top;
    margin: 0 0;
    display: inline-block;
    width: 130px;
    height: 200px;
    border-radius: 5px;
    box-shadow: 0 10px 6px -6px #777;
    -webkit-transform: skew(-20deg) rotate(-20deg);
    transform: skew(-20deg) rotate(-20deg);
    -webkit-transition: .3s;
    transition: .3s;
}
.label:hover {
    -webkit-transform: none;
    transform: none;
    cursor: pointer;
}

</style>