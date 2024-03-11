<template>
    <div>
        <div class="card-slider">
            <span v-for="item, index in onlyFirstFive" :key="index">
                <img :src="images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg" class="lable" :alt="item.name"/>
            </span>

        </div>

    </div>
</template>

<script setup>
const props = defineProps({
    popularGames: {
        type: Array,
        required: false,
    }
})

const { popularGames } = toRefs(props)

const onlyFirstFive = computed(() => {
    return popularGames.value
})
</script>

<style lang="scss" scoped>

</style>