<template>
    <div>
        <div class="card-slider">
            <span v-for="item, index in onlyFirstFive" :key="index">
                <img :src="item.cover.url" :alt="item.name" class="label"/>
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
    return popularGames.value
})
</script>

<style scoped>
.card-slider {
    margin: 60px auto;
    text-align: center;
}

.label {
    position: relative;
    margin: 0 -35px;
    display: inline-block;
    width: 150px;
    height: 200px;
    border-radius: 5px;
    box-shadow: 0 10px 6px -6px #777;
    -webkit-transform: skew(-20deg) rotate(-20deg);
    transform: skew(-20deg) rotate(-20deg);
    -webkit-transition: .3s;
    transition: .3s;
}
.label:hover {
    margin: 0 50px;
    -webkit-transform: none;
    transform: none;
}

</style>