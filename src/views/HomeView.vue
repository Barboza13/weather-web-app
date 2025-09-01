<script lang="ts" setup>
  import { ref, watch, onMounted } from 'vue'
  import SearchBar from '@components/SearchBar.vue'
  import CurrentDataCard from '@components/CurrentDataCard.vue'
  import Weather from '@services/Weather.ts'
  import getLocalLocation from '@modules/getLocalLocation.ts'

  import type { Ref } from 'vue'
  import type { WeatherData } from '@/types'

  const weather = new Weather()
  const location: Ref<string | null> = ref(null)
  const weatherData: Ref<WeatherData | null> = ref(null)
  const errorMessage: Ref<string> = ref('')
  const isLoading: Ref<boolean> = ref(true)

  const getLocation = async () => {
    try {
      const { latitude, longitude } = await getLocalLocation()
      location.value = `${latitude}, ${longitude}`
    } catch (error) {
      errorMessage.value = String(error)
    }
  }

  const changeLocation = (newLocation: string): string =>
    (location.value = newLocation)

  watch(location, async () => {
    isLoading.value = true

    try {
      await weather.fetchWeatherData(location.value)
      weatherData.value = weather.getWeatherData()
    } catch (error) {
      weatherData.value = null
      errorMessage.value = '¡Locación no encontada!'
    }

    isLoading.value = false
  })

  onMounted(async () => {
    await getLocation()

    if (location.value) {
      await weather.fetchWeatherData(location.value)
      weatherData.value = weather.getWeatherData()
      isLoading.value = false
      return
    }

    isLoading.value = false
  })
</script>

<template>
  <SearchBar @change-location="changeLocation" />
  <CurrentDataCard :isLoading :weatherData :error-message="errorMessage" />
</template>

<style scoped></style>
