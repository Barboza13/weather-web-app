<script lang="ts" setup>
  import { ref } from 'vue'
  import type { Ref } from 'vue'

  const emits = defineEmits(['changeLocation'])
  const newLocation: Ref<string> = ref('')

  const handleSubmit = () => {
    if (newLocation.value === '') {
      alert("The new location can't empty.")
      return
    }

    emits('changeLocation', newLocation.value)
    newLocation.value = ''
  }
</script>

<template>
  <section
    class="absolute top-[1rem] left-1/2 -translate-x-1/2 bg-secondary flex h-20 w-[80%] items-center justify-around border-[1px] border-secondary-hover rounded-md shadow-lg shadow-black/45"
  >
    <form
      class="flex w-[80%] lg:w-[50%] items-center justify-center gap-2"
      @submit.prevent="handleSubmit"
    >
      <input
        class="text-primary hover:border-secondary-hover focus:border-secondary-hover h-10 w-full rounded-sm border-[1px] border-gray-500 bg-transparent outline-none placeholder:px-2 placeholder:text-gray-500 px-2"
        v-model="newLocation"
        type="search"
        placeholder="Ingresa una locación para buscar..."
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

<style scoped></style>
