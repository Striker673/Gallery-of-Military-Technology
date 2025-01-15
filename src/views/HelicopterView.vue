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
        <v-col v-for="helicopter in helicopters" :key="helicopter.id" cols="12" sm="6" md="4" lg="3">
          <v-card @click="showDetails(helicopter.id)" class="helicopter-card">
            <v-img :src="helicopter.image" height="200" cover></v-img>
            <v-card-title>{{ helicopter.name }}</v-card-title>
            <v-card-subtitle>{{ helicopter.year }}</v-card-subtitle>
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
  name: 'HelicopterView',

  setup() {
    const router = useRouter();
    const store = useVehicleStore();

    const showDetails = (id: number) => {
      router.push({ name: 'helicopter.detail', params: { id: id.toString() } });
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

.helicopter-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.helicopter-card:hover {
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