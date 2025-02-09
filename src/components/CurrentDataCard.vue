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

  const currentLocation = computed<string>(
    () => props.weatherData?.location ?? 'N/A'
  )

  const currentData = computed<CurrentData[]>(() => [
    {
      iconName: 'wi-day-sunny-overcast',
      value: props.weatherData?.weather ?? 'undefined',
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
  <section
    class="container-custom-position bg-secondary text-primary flex flex-col h-[70%] w-[80%] items-center justify-between gap-2 rounded-md shadow-lg shadow-black/45"
  >
    <h1 class="text-3xl">Datos actuales</h1>
    <div class="flex items-center justify-evenly w-full">
      <div class="flex items-center gap-2">
        <v-icon name="co-location-pin" scale="1.5" />
        <h1 class="text-xl">{{ currentLocation }}</h1>
      </div>
      <ul class="flex flex-col justify-center gap-4">
        <li
          v-for="(data, index) in currentData"
          :key="index"
          class="flex gap-2"
        >
          <v-icon :name="data.iconName" scale="1.5" />
          <h3 class="text-primary text-xl">{{ data.value }}</h3>
        </li>
      </ul>
    </div>
    <div class="flex h-40 w-full flex-col items-center gap-4">
      <h1 class="text-2xl">Proximas horas</h1>
      <div
        class="scrollbar-custom relative flex h-full w-full items-center gap-2 overflow-auto"
      >
        <NextHoursCard
          v-if="props.weatherData"
          v-for="(hour, index) in nextHours"
          :key="index"
          :datetime="hour.datetime"
          :temperature="hour.temp"
          :rain-probability="hour.precipprob"
        />
        <h1
          v-else
          class="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]"
        >
          N/A
        </h1>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .container-custom-position {
    @apply absolute top-[8rem] left-1/2;
    transform: translate(-50%, 0);
  }
</style>
