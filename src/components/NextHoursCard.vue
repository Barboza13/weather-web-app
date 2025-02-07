<script lang="ts" setup>
  const props = defineProps({
    datetime: {
      type: String,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    rainProbability: {
      type: Number,
      required: true,
    },
  })
</script>

<template>
  <div
    class="bg-secondary-hover mb-6 flex h-full min-w-[18%] flex-col items-center justify-between rounded-md"
  >
    <h1 class="text-xl">{{ props.datetime.slice(0, 5) }}hs.</h1>
    <h1 class="flex text-sm gap-1">
      <v-icon name="bi-cloud-rain-fill" size="2" />
      {{ props.rainProbability }}%
    </h1>
    <h1 class="flex text-sm gap-1">
      <v-icon name="fa-temperature-high" size="2" />
      {{ props.temperature }} °C
    </h1>
  </div>
</template>

<style scoped></style>
