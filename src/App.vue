<template>
  <v-app theme="dark">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style>
html {
  overflow-y: auto;
}

.v-application {
  background: linear-gradient(135deg, #27276b 0%, #1E1E1E 100%) !important;
}

.v-main {
  background: transparent !important;
}
</style>