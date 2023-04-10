<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input v-model="searchQuery" @input="getSearchResults" type="text" placeholder="Search City" class="py-2 px-1
                  w-full bg-transparent border-b focus:border-weather-secondary
                  focus: outline-none focus:shadow[0px_1px_0_0_#004E71]">


      <ul v-if="mapBoxSearchResult"
        class="absolute py-2 px-1 top-[66px] bg-weather-secondary text-white w-full shadow-md">
        <p v-if="mapBoxSearchError"> Sorry, something went wrong try again.</p>
        <p v-else-if="!mapBoxSearchError && mapBoxSearchResult.length === 0">
          No match for your query, try again</p>

        <template v-else>
          <li v-for="searchResult in mapBoxSearchResult" :key="searchResult.id" class="py-2 cursor-pointer"
            @click="previewCity(searchResult)">
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>

    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
            <p>Loading...</p>
        </template>
      </Suspense>
    </div>

  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";

const searchQuery = ref("");
const queryTimeOut = ref(null);

const mapBoxSearchResult = ref(null);
var mapBoxSearchError = ref(null);

const mapBoxAPIKey = "pk.eyJ1IjoidWJhaWQiLCJhIjoiY2lldnF0NHFvMDBhenQxbTA0OHhkazA2NyJ9.iC9_dK6C_PDcT_iw8K5wow";

const router = useRouter();


const previewCity = (searchResult) => {
  console.log(searchResult);
  const [city, state] = searchResult.place_name.split(",");
  console.log(city + " | " + state);
  router.push({
    name: "cityView",
    params: { state: state.replaceAll(" ", ""), city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lon: searchResult.geometry.coordinates[0],
      preview: true
    }
  });

}

const getSearchResults = () => {
  clearTimeout(queryTimeOut.value);

  
  queryTimeOut.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await
          axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapBoxAPIKey}&types=place`);

        mapBoxSearchResult.value = result.data.features;
        console.log(mapBoxSearchResult.value);
      }
      catch {
        mapBoxSearchError = true;
      }
      return;
    }
    mapBoxSearchResult.value = null;
  }, 300);
};


</script>

