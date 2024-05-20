<template>
    <NuxtLayout/>
    <div>
        <div>Личная страница пользователя {{ user.name }}</div>
    </div>
</template>

<script setup>

onMounted(() =>{
    getUser()
})
const route = useRoute()
const user = ref([])
console.log(route.params)
async function getUser() {
    fetch(
        `http://localhost:5109/User/${route.params.id}`,
        {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        }
    )
    .then(async response => {
        const data = await response.json();
        console.log(data);
        user.value = data;
        return user;
    })
    .catch(async err => {
        console.error(err);
    })
}
</script>

<style lang="scss" scoped>

</style>