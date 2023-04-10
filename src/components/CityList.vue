<template>
    <div v-for="city in savedCities" :key="city.id">
        <CityCard :city="city" @click="getCityView(city)" />
    </div>

    <p v-if="savedCities.length === 0">No locations added, search in the field above</p>
</template>

<script setup>

import axios from 'axios';
import CityCard from './CityCard.vue';
import { ref } from "vue";
import { useRouter } from 'vue-router';



const savedCities = ref([]);

const router = useRouter();

const getCityView = async (city) => {

    console.log(city);
    router.push({
        name: "cityView",
        params: { state: city.state, city: city.city },
        query: { id:city.id, lat: city.coords.lat, lon: city.coords.lon },
    });
};

const getSavedCities = async () => {

    if (localStorage.getItem("savedCities")) {
        savedCities.value = JSON.parse(localStorage.getItem("savedCities"));

        const request = [];

        savedCities.value.forEach((city) => {
            request.push(
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lon}&appid=bc4313587bfd9e480fad9b5e422211d7&units=imperial`)
            )
        });

        const weatherData = await Promise.all(request);

        weatherData.forEach((value, index) => {
            savedCities.value[index].weather = value.data;
        });
    }
};

await getSavedCities();

</script>

