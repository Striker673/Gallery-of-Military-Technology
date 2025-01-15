<template>
  <div class="helicopter-view">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <div v-if="!$route.params.id">
      <h1>Helikoptéry</h1>
      <v-row>
        <v-col v-for="helicopter in helicopters"
               :key="helicopter.id"
               cols="12"
               sm="6"
               md="4"
               lg="3"
        >
          <VehicleCard
              :vehicle="helicopter"
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
  name: 'HelicopterView',
  components: { VehicleCard },

  setup() {
    const router = useRouter();
    const store = useVehicleStore();

    const showDetails = (helicopter) => {
      router.push({ name: 'helicopter.detail', params: { id: helicopter.id.toString() } });
    };

    return {
      helicopters: store.getHelicopters,
      showDetails
    };
  }
});
</script>

<style scoped>
.helicopter-view {
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