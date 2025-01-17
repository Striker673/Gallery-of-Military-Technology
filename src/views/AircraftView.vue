<template>
  <div class="aircraft-view">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <VehicleBaseView
        v-if="!route.params.id"
        title="Lietadlá"
        :vehicles="aircraft"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useVehicleStore } from '@/stores/vehicles';
import VehicleBaseView from '@/components/VehicleBaseView.vue';

export default defineComponent({
  name: 'AircraftView',
  components: { VehicleBaseView },

  setup() {
    const route = useRoute();
    const store = useVehicleStore();
    return {
      route,
      aircraft: store.getAircraft
    };
  }
});
</script>

<style scoped>
.aircraft-view {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}
</style>