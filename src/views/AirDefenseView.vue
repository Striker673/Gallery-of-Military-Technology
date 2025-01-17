<template>
  <div class="air-defense-view">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <VehicleBaseView
        v-if="!route.params.id"
        title="Protivzdušná obrana"
        :vehicles="airDefense"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useVehicleStore } from '@/stores/vehicles';
import VehicleBaseView from '@/components/VehicleBaseView.vue';

export default defineComponent({
  name: 'AirDefenseView',
  components: { VehicleBaseView },

  setup() {
    const route = useRoute();
    const store = useVehicleStore();
    return {
      route,
      airDefense: store.getAirDefense
    };
  }
});
</script>

<style scoped>
.air-defense-view {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}
</style>