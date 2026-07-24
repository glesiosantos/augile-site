<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <template v-if="name === 'card'"><rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="2"
    /><path d="M3 10h18" /></template>
    <template v-else-if="name === 'gift'"><rect
      x="3"
      y="8"
      width="18"
      height="13"
      rx="2"
    /><path d="M12 8v13M2 12h20M7.5 8C5 8 5 4 7.5 4 10 4 12 8 12 8s2-4 4.5-4S19 8 16.5 8" /></template>
    <template v-else-if="name === 'message'"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.6-4.7A7 7 0 0 1 3 13V8a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" /></template>
    <template v-else-if="name === 'clipboard'"><rect
      x="5"
      y="4"
      width="14"
      height="17"
      rx="2"
    /><path d="M9 4a3 3 0 0 1 6 0v2H9zM9 11h6M9 15h4" /></template>
    <template v-else-if="name === 'users'"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></template>
    <template v-else-if="name === 'calendar'"><rect
      x="3"
      y="5"
      width="18"
      height="16"
      rx="2"
    /><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01" /></template>
    <template v-else-if="name === 'wrench'"><path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 9.6 6 7.3 3.7a4 4 0 0 0 5 5L4 17a2 2 0 0 0 3 3l8.3-8.3a4 4 0 0 0 5-5L18 9l-2.4-2.4L18 4.3z" /></template>
    <template v-else-if="name === 'arrow'"><path d="M5 12h14M13 6l6 6-6 6" /></template>
    <template v-else-if="name === 'check'"><path d="m5 12 4 4L19 6" /></template>
    <template v-else-if="name === 'menu'"><path d="M4 6h16M4 12h16M4 18h16" /></template>
    <template v-else-if="name === 'close'"><path d="m6 6 12 12M18 6 6 18" /></template>
    <template v-else-if="name === 'chevron'"><path d="m6 9 6 6 6-6" /></template>
    <template v-else-if="name === 'external'"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></template>
  </svg>
</template>
<script setup lang="ts">
defineProps<{ name: string }>()
</script>
