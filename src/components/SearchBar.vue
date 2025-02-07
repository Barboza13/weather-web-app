<script lang="ts" setup>
  import { ref } from 'vue'
  import type { Ref } from 'vue'

  const emit = defineEmits(['changeLocation'])
  const newLocation: Ref<string> = ref('')

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    emit('changeLocation', newLocation.value)
    newLocation.value = ''
  }
</script>

<template>
  <section
    class="searchbar-custom-position bg-secondary flex h-20 w-[90%] items-center justify-around rounded-md shadow-lg shadow-black/45"
  >
    <form
      class="flex w-[50%] items-center justify-center gap-2"
      @submit="handleSubmit"
    >
      <input
        class="text-primary hover:border-primary focus:border-primary h-10 w-full rounded-sm border-[1px] border-gray-500 bg-transparent outline-none placeholder:px-2 placeholder:text-gray-500"
        v-model="newLocation"
        type="search"
        placeholder="Enter a location to search..."
        required
      />
      <button
        class="hover:bg-secondary-hover hover:text-primary focus:text-primary flex h-12 w-13 cursor-pointer items-center justify-center rounded-full text-gray-500 transition-colors duration-200 ease-linear outline-none"
        type="submit"
      >
        <v-icon name="md-search" scale="1.5" />
      </button>
    </form>
  </section>
</template>

<style scoped>
  .searchbar-custom-position {
    @apply absolute top-[1rem] left-1/2;
    transform: translate(-50%, 0);
  }
</style>
