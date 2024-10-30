<script setup lang="ts">
defineProps<{
  msg?: string
}>()
</script>

<template>
  <div>{{ msg ?? 'hello ionic' }}</div>
</template>
