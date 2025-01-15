<template>
  <div class="aircraft-view">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <div v-if="!$route.params.id">
      <h1>Lietadlá</h1>
      <v-row>
        <v-col v-for="aircraft in aircraft" :key="aircraft.id" cols="12" sm="6" md="4" lg="3">
          <v-card @click="showDetails(aircraft.id)" class="aircraft-card">
            <v-img :src="aircraft.image" height="200" cover></v-img>
            <v-card-title>{{ aircraft.name }}</v-card-title>
            <v-card-subtitle>{{ aircraft.year }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useVehicleStore } from '@/stores/vehicles';

export default defineComponent({
  name: 'AircraftView',

  setup() {
    const router = useRouter();
    const store = useVehicleStore();

    const showDetails = (id: number) => {
      router.push({ name: 'aircraft.detail', params: { id: id.toString() } });
    };

    return {
      aircraft: store.getAircraft,
      showDetails
    };
  }
});
</script>

<style scoped>
.aircraft-view {
  padding: 2rem;
}

.aircraft-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.aircraft-card:hover {
  transform: translateY(-5px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>