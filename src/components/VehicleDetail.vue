<template>
  <div class="tank-view">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <div v-if="!$route.params.id">
      <h1>Tanky</h1>
      <v-row>
        <v-col v-for="tank in tanks" :key="tank.id" cols="12" sm="6" md="4" lg="3">
          <v-card @click="showDetails(tank.id)" class="tank-card">
            <v-img :src="tank.image" height="200" cover></v-img>
            <v-card-title>{{ tank.name }}</v-card-title>
            <v-card-subtitle>{{ tank.year }}</v-card-subtitle>
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
  name: 'TankView',

  setup() {
    const router = useRouter();
    const store = useVehicleStore();

    const showDetails = (id: number) => {
      router.push({ name: 'tank.detail', params: { id: id.toString() } });
    };

    return {
      tanks: store.getTanks,
      showDetails
    };
  }
});
</script>

<style scoped>
.tank-view {
  padding: 2rem;
}

.tank-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.tank-card:hover {
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