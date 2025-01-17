<template>
  <div class="vehicle-view">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <div v-if="!route.params.id">
      <div class="header">
        <h1>{{ title }}</h1>
        <div class="filters">
          <v-select
              v-model="selectedManufacturer"
              :items="manufacturers"
              label="Výrobca"
              clearable
              class="filter-select"
          />
          <v-select
              v-model="selectedYear"
              :items="years"
              label="Rok výroby"
              clearable
              class="filter-select"
          />
          <v-btn
              color="primary"
              @click="resetFilters"
              class="reset-btn"
          >
            Resetovať filtre
          </v-btn>
        </div>
      </div>

      <div class="comparison-section" v-if="selectedVehicles.length">
        <ComparisonTable
            :vehicles="selectedVehicles"
            @remove="removeFromComparison"
            @clear-all="clearComparison"
        />
      </div>

      <v-row class="vehicles-grid">
        <v-col
            v-for="vehicle in filteredVehicles"
            :key="vehicle.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
        >
          <VehicleCard
              :vehicle="vehicle"
              :isInComparison="isInComparison(vehicle)"
              @compare="addToComparison"
              @click:details="navigateToDetails"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import type { PropType } from 'vue';
import type { Vehicle } from '@/types/vehicle';
import VehicleCard from './VehicleCard.vue';
import ComparisonTable from './ComparisonTable.vue';

export default defineComponent({
  name: 'VehicleBaseView',

  components: {
    VehicleCard,
    ComparisonTable,
  },

  props: {
    title: {
      type: String,
      required: true
    },
    vehicles: {
      type: Array as PropType<Vehicle[]>,
      required: true
    }
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    return { router, route };
  },

  data() {
    return {
      selectedVehicles: [] as Vehicle[],
      selectedManufacturer: null as string | null,
      selectedYear: null as number | null,
    };
  },

  computed: {
    manufacturers(): string[] {
      return [...new Set(this.vehicles.map(v => v.manufacturer))].sort();
    },

    years(): number[] {
      return [...new Set(this.vehicles.map(v => v.year))].sort((a, b) => b - a);
    },

    filteredVehicles(): Vehicle[] {
      return this.vehicles.filter(vehicle => {
        if (this.selectedManufacturer && vehicle.manufacturer !== this.selectedManufacturer) return false;
        if (this.selectedYear && vehicle.year !== this.selectedYear) return false;
        return true;
      });
    }
  },

  methods: {
    addToComparison(vehicle: Vehicle): void {
      if (this.selectedVehicles.length < 2 && !this.isInComparison(vehicle)) {
        this.selectedVehicles.push(vehicle);
      }
    },

    removeFromComparison(vehicle: Vehicle): void {
      this.selectedVehicles = this.selectedVehicles.filter(v => v.id !== vehicle.id);
    },

    clearComparison(): void {
      this.selectedVehicles = [];
    },

    isInComparison(vehicle: Vehicle): boolean {
      return this.selectedVehicles.some(v => v.id === vehicle.id);
    },

    resetFilters(): void {
      this.selectedManufacturer = null;
      this.selectedYear = null;
    },

    navigateToDetails(vehicle: Vehicle): void {
      const routeName = this.route.name?.toString().split('.')[0] || 'tank';
      this.router.push({
        name: `${routeName}.detail`,
        params: { id: vehicle.id.toString() }
      });
    }
  }
});
</script>
<style scoped>
.vehicle-view {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.header {
  margin-bottom: 2rem;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.filter-select {
  min-width: 200px;
  max-width: 300px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.vehicles-grid {
  margin-top: 2rem;
}

.comparison-section {
  margin: 2rem 0;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
  text-align: center;
  margin-bottom: 1rem;
}

.reset-btn {
  align-self: center;
}

@media (max-width: 600px) {
  .vehicle-view {
    padding: 1rem;
  }

  .filters {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-select {
    width: 100%;
    max-width: none;
  }

  h1 {
    font-size: 2rem;
  }
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