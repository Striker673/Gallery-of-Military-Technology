<template>
  <div class="artillery-view">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <div v-if="!$route.params.id">
      <h1>Artiléria</h1>
      <v-row>
        <v-col v-for="artillery in artillery" :key="artillery.id" cols="12" sm="6" md="4" lg="3">
          <v-card @click="showDetails(artillery.id)" class="artillery-card">
            <v-img :src="artillery.image" height="200" cover></v-img>
            <v-card-title>{{ artillery.name }}</v-card-title>
            <v-card-subtitle>{{ artillery.year }}</v-card-subtitle>
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
  name: 'ArtilleryView',

  setup() {
    const router = useRouter();
    const store = useVehicleStore();

    const showDetails = (id: number) => {
      router.push({ name: 'artillery.detail', params: { id: id.toString() } });
    };

    return {
      artillery: store.getArtillery,
      showDetails
    };
  }
});
</script>

<style scoped>
.artillery-view {
  padding: 2rem;
}

.artillery-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.artillery-card:hover {
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