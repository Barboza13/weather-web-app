<script lang="ts" setup>
  import { computed } from 'vue'
  import NextHoursCard from '@components/NextHoursCard.vue'

  import type { CurrentData, WeatherData, HourData } from '@/types'

  type Props = {
    weatherData: WeatherData | null
    isLoading: boolean
    geoLocationErrorMessage: string
  }

  const props = defineProps<Props>()

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
    class="absolute top-[8rem] left-1/2 -translate-x-1/2 bg-secondary h-[70%] w-[80%] border-[1px] border-secondary-hover rounded-md shadow-lg shadow-black/45 p-3"
  >
    <v-icon
      v-if="props.isLoading"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      name="ri-loader-2-fill"
      fill="white"
      animation="spin"
      scale="5"
    />

    <div
      v-if="props.weatherData && !props.isLoading"
      class="flex flex-col justify-between items-center text-primary gap-2 h-full w-full"
    >
      <h1 class="text-3xl">Datos actuales</h1>
      <div class="flex items-center justify-between w-full px-5 md:px-10">
        <div class="flex items-center gap-1">
          <v-icon name="co-location-pin" scale="1.5" />
          <h1 class="text-lg md:text-xl">{{ currentLocation }}</h1>
        </div>
        <ul class="flex flex-col justify-center gap-4">
          <li
            v-for="(data, index) in currentData"
            :key="index"
            class="flex gap-2"
          >
            <v-icon :name="data.iconName" scale="1.5" />
            <h3 class="text-primary text-lg md:text-xl">{{ data.value }}</h3>
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
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            N/A
          </h1>
        </div>
      </div>
    </div>
    <div
      v-else-if="!props.weatherData && !props.isLoading"
      class="flex flex-col justify-center items-center h-full w-full text-red-500 text-xl"
    >
      <p>¡Error al obtener los datos!</p>
      <p>
        {{ props.geoLocationErrorMessage ?? '' }}
      </p>
    </div>
  </section>
</template>

<style scoped></style>
