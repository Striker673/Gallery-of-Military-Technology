<template>
  <div class="air-defense-view">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <div v-if="!$route.params.id">
      <h1>Protivzdušná obrana</h1>
      <v-row>
        <v-col v-for="defense in airDefense" :key="defense.id" cols="12" sm="6" md="4" lg="3">
          <v-card @click="showDetails(defense.id)" class="air-defense-card">
            <v-img :src="defense.image" height="200" cover></v-img>
            <v-card-title>{{ defense.name }}</v-card-title>
            <v-card-subtitle>{{ defense.year }}</v-card-subtitle>
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
  name: 'AirDefenseView',

  setup() {
    const router = useRouter();
    const store = useVehicleStore();

    const showDetails = (id: number) => {
      router.push({ name: 'airDefense.detail', params: { id: id.toString() } });
    };

    return {
      airDefense: store.getAirDefense,
      showDetails
    };
  }
});
</script>

<style scoped>
.air-defense-view {
  padding: 2rem;
}

.air-defense-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.air-defense-card:hover {
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