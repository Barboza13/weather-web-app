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
    class="bg-secondary-hover flex h-full min-w-[90px] flex-col items-center justify-between rounded-md"
  >
    <h1 class="text-lg">{{ props.datetime.slice(0, 5) }}</h1>
    <h1 class="flex text-2xl font-bold gap-1">{{ props.temperature }}°</h1>
    <h1 class="flex text-xl gap-1">{{ props.rainProbability }}%</h1>
  </div>
</template>

<style scoped></style>
