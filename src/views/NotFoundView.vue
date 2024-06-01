<script setup lang="ts">
import Button from 'primevue/button'
</script>

<template>
  <div class="col-full text-center">
    <h1 class="text-8xl mt-12">Not Found</h1>
    <p class="text-5xl font-100">What are you doing here?</p>

    <div class="mt-8">
      <RouterLink to="/">
        <Button label="Run away" />
      </RouterLink>
    </div>
  </div>
</template>
