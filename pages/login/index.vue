<template>
    <NuxtLayout/>
    <div class="bg-gray-300 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                    Авторизуйтесь в своём аккаунте
                </h1>
                <div v-if="autherror" class="bg-red-400 p-2 w-fit border-solid border-2 border-black">{{ autherror }}</div>
                <form @submit.prevent="submit" class="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ваша электронная почта</label>
                        <input v-model="data.email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пароль</label>
                        <input v-model="data.password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                    </div>
                    <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Авторизоваться</button>
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                        Ещё нет аккаунта? <NuxtLink to="/register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Зарегистрироваться</NuxtLink>
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import {reactive} from 'vue';

const router = useRouter();
const data = reactive({
    email: '',
    password: '',
});
const autherror = ref('');

const submit = async () => {
    await fetch('http://localhost:5109/User/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(data)
    })
    .then(async response => {
    if (response.status == 400){
        autherror.value = 'Данные введены неверно'
    }
    else {
        await router.push('/')
    }
    }
    )
    
};
</script>

<style lang="scss" scoped>

</style>