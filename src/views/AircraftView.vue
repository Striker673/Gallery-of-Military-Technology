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
        <v-col v-for="aircraft in aircraft"
               :key="aircraft.id"
               cols="12"
               sm="6"
               md="4"
               lg="3"
        >
          <VehicleCard
              :vehicle="aircraft"
              @click:details="showDetails"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useVehicleStore } from '@/stores/vehicles';
import VehicleCard from '@/components/VehicleCard.vue';

export default defineComponent({
  name: 'AircraftView',
  components: { VehicleCard },

  setup() {
    const router = useRouter();
    const store = useVehicleStore();

    const showDetails = (aircraft) => {
      router.push({ name: 'aircraft.detail', params: { id: aircraft.id.toString() } });
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>