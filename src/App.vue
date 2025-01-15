<template>
  <v-app theme="dark">
    <NavBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from '@/components/NavBar.vue'

export default defineComponent({
  name: 'App',
  components: {
    NavBar
  }
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