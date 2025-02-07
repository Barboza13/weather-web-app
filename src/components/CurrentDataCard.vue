<script lang="ts" setup>
  import { computed } from 'vue'
  import NextHoursCard from '@components/NextHoursCard.vue'

  import type { PropType } from 'vue'
  import type { CurrentData, WeatherData, HourData } from '@/types'

  const props = defineProps({
    weatherData: {
      type: Object as PropType<WeatherData | null>,
      required: true,
    },
  })

  const currentData = computed<CurrentData[]>(() => [
    {
      iconName: 'wi-day-sunny-overcast',
      value: props.weatherData?.weather ?? 'null',
    },
    {
      iconName: 'bi-cloud-rain-fill',
      value: `${props.weatherData?.rainProbability}%`,
    },
    {
      iconName: 'fa-temperature-high',
      value: `${props.weatherData?.temperature} °C`,
    },
    { iconName: 'bi-wind', value: `${props.weatherData?.windspeed} Km/h` },
  ])

  const nextHours = computed<HourData[]>(
    () => props.weatherData?.currentHours ?? []
  )
</script>

<template>
  <article
    class="bg-secondary text-primary flex flex-col items-center justify-between gap-2 rounded-md shadow-lg shadow-black/45"
  >
    <h1 class="text-3xl">Datos actuales</h1>
    <ul class="flex flex-col gap-4">
      <li v-for="(data, index) in currentData" :key="index" class="flex gap-2">
        <v-icon :name="data.iconName" scale="2" />
        <h3 class="text-primary text-xl">{{ data.value }}</h3>
      </li>
    </ul>
    <div class="flex h-40 w-full flex-col items-center gap-4">
      <h1 class="text-2xl">Proximas horas</h1>
      <div
        class="scrollbar-custom flex h-full w-full items-center gap-2 overflow-auto"
      >
        <NextHoursCard
          v-for="(hour, index) in nextHours"
          :key="index"
          :datetime="hour.datetime"
          :temperature="hour.temp"
          :rain-probability="hour.precipprob"
        />
      </div>
    </div>
  </article>
</template>

<style scoped></style>
