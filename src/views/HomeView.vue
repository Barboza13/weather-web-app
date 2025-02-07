<script lang="ts" setup>
  import { ref, watch, onMounted } from 'vue'
  import SearchBar from '@components/SearchBar.vue'
  import CurrentDataCard from '@components/CurrentDataCard.vue'
  import WeatherMap from '@components/WeatherMap.vue'
  import Weather from '@services/Weather.ts'

  import type { Ref } from 'vue'
  import type { WeatherData } from '@/types'

  const weather = new Weather()
  const location: Ref<string> = ref('London')
  const weatherData: Ref<WeatherData | null> = ref(null)

  const changeLocation = (newLocation: string): string =>
    (location.value = newLocation)

  watch(location, async () => {
    console.log(location.value)
    await weather.fetchWeatherData(location.value)
    weatherData.value = weather.getWeatherData()
    console.log(weatherData.value)
  })

  onMounted(async () => {
    await weather.fetchWeatherData(location.value)
    weatherData.value = weather.getWeatherData()
  })
</script>

<template>
  <SearchBar @change-location="changeLocation" />
  <section
    class="container-custom-position grid h-[70%] w-[90%] grid-cols-2 gap-10"
  >
    <WeatherMap />
    <CurrentDataCard v-if="weatherData" :weatherData="weatherData" />
  </section>
</template>

<style scoped>
  .container-custom-position {
    @apply absolute top-[8rem] left-1/2;
    transform: translate(-50%, 0);
  }
</style>
