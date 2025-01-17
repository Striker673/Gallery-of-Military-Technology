<template>
  <div class="vehicle-detail" v-if="vehicle">
    <v-card>
      <v-card-title class="d-flex align-center pa-4">
        <span class="text-h5">{{ vehicle.name }}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="goBack">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-img
                  :src="vehicle.image"
                  :alt="vehicle.name"
                  height="300"
                  cover
              ></v-img>
            </v-col>

            <v-col cols="12" md="6">
              <v-list>
                <v-list-item prepend-icon="mdi-calendar">
                  <v-list-item-title>Rok výroby</v-list-item-title>
                  <v-list-item-subtitle>{{ vehicle.year }}</v-list-item-subtitle>
                </v-list-item>

                <v-list-item prepend-icon="mdi-factory">
                  <v-list-item-title>Výrobca</v-list-item-title>
                  <v-list-item-subtitle>{{ vehicle.manufacturer }}</v-list-item-subtitle>
                </v-list-item>

                <v-list-item prepend-icon="mdi-speedometer">
                  <v-list-item-title>Maximálna rýchlosť</v-list-item-title>
                  <v-list-item-subtitle>{{ vehicle.speed }} km/h</v-list-item-subtitle>
                </v-list-item>

                <v-list-item prepend-icon="mdi-weight">
                  <v-list-item-title>Hmotnosť</v-list-item-title>
                  <v-list-item-subtitle>{{ vehicle.weight }} t</v-list-item-subtitle>
                </v-list-item>

                <v-list-item prepend-icon="mdi-map-marker-distance">
                  <v-list-item-title>Dosah</v-list-item-title>
                  <v-list-item-subtitle>{{ vehicle.range }} km</v-list-item-subtitle>
                </v-list-item>

                <v-list-item prepend-icon="mdi-account-group">
                  <v-list-item-title>Posádka</v-list-item-title>
                  <v-list-item-subtitle>{{ vehicle.crew }} osôb</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>

          <v-row class="mt-4">
            <v-col cols="12">
              <h3 class="text-h6 mb-2">Výzbroj</h3>
              <v-chip
                  v-for="(weapon, index) in vehicle.armament"
                  :key="index"
                  class="ma-1"
                  color="primary"
              >
                {{ weapon }}
              </v-chip>
            </v-col>
          </v-row>

          <v-row v-if="vehicle.description" class="mt-4">
            <v-col cols="12">
              <h3 class="text-h6 mb-2">Popis</h3>
              <p>{{ vehicle.description }}</p>
            </v-col>
          </v-row>

          <!-- Status Chip -->
          <v-row class="mt-4">
            <v-col cols="12">
              <v-chip
                  :color="getStatusColor(vehicle.status)"
                  class="ma-1"
              >
                {{ getStatusText(vehicle.status) }}
              </v-chip>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useVehicleStore } from '@/stores/vehicles';
import type { Vehicle, VehicleStatus } from '@/types/vehicle';

export default defineComponent({
  name: 'VehicleDetail',

  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useVehicleStore();

    const vehicle = computed(() => {
      const id = Number(route.params.id);
      return store.getVehicleById(id);
    });

    const goBack = () => {
      router.back();
    };

    const getStatusColor = (status: VehicleStatus): string => {
      const colors = {
        active: 'success',
        maintenance: 'warning',
        retired: 'error',
        museum: 'info',
        planned: 'primary',
        ordered: 'primary',
        considered: 'secondary'
      };
      return colors[status] || 'grey';
    };

    const getStatusText = (status: VehicleStatus): string => {
      const texts = {
        active: 'V aktívnej službe',
        maintenance: 'V údržbe',
        retired: 'Vyradené',
        museum: 'Múzejný exponát',
        planned: 'Plánované',
        ordered: 'Objednané',
        considered: 'Zvažované'
      };
      return texts[status] || status;
    };

    return {
      vehicle,
      goBack,
      getStatusColor,
      getStatusText
    };
  }
});
</script>

<style scoped>
.vehicle-detail {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.v-card {
  background-color: #1E1E1E !important;
}

.v-list-item {
  margin-bottom: 8px;
}

.v-list-item-title {
  color: rgba(255, 255, 255, 0.7) !important;
}

.v-list-item-subtitle {
  color: white !important;
  font-size: 1.1rem !important;
  font-weight: 500 !important;
}

.text-h6 {
  color: #1976D2;
}
</style>