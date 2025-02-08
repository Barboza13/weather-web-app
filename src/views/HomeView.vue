<script lang="ts" setup>
  import { ref, watch, onMounted } from 'vue'
  import SearchBar from '@components/SearchBar.vue'
  import CurrentDataCard from '@components/CurrentDataCard.vue'
  import WeatherMap from '@components/WeatherMap.vue'
  import Weather from '@services/Weather.ts'
  import getLocalLocation from '@modules/getLocalLocation.ts'

  import type { Ref } from 'vue'
  import type { WeatherData } from '@/types'

  const weather = new Weather()
  const location: Ref<string | null> = ref(null)
  const weatherData: Ref<WeatherData | null> = ref(null)

  const getLocation = async () => {
    try {
      const { latitude, longitude } = await getLocalLocation()
      location.value = `${latitude}, ${longitude}`
    } catch (error) {
      console.error(error) // Then handle the error.
    }
  }

  const changeLocation = (newLocation: string): string =>
    (location.value = newLocation)

  watch(location, async () => {
    await weather.fetchWeatherData(location.value)
    weatherData.value = weather.getWeatherData()
  })

  onMounted(async () => {
    await getLocation()

    if (location.value) {
      await weather.fetchWeatherData(location.value)
      weatherData.value = weather.getWeatherData()
    }
  })
</script>

<template>
  <SearchBar @change-location="changeLocation" />
  <section
    class="container-custom-position grid h-[70%] w-[90%] grid-cols-2 gap-10"
  >
    <WeatherMap />
    <CurrentDataCard :weatherData="weatherData" />
  </section>
</template>

<style scoped>
  .container-custom-position {
    @apply absolute top-[8rem] left-1/2;
    transform: translate(-50%, 0);
  }
</style>
