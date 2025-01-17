<template>
  <v-card class="comparison-table">
    <v-card-title class="d-flex justify-space-between align-center pa-4">
      <span>Porovnanie vozidiel</span>
      <v-btn
          color="error"
          variant="text"
          @click="$emit('clear-all')"
      >
        VYČISTIŤ POROVNANIE
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-table v-if="vehicles.length">
        <tbody>
        <tr>
          <td class="text-left font-weight-bold">Vlastnosť</td>
          <td v-for="vehicle in vehicles" :key="vehicle.id" class="text-center">
            <div class="d-flex align-center justify-space-between px-2">
              {{ vehicle.name }}
              <v-btn
                  icon="mdi-close"
                  density="comfortable"
                  variant="text"
                  color="error"
                  @click="$emit('remove', vehicle)"
              ></v-btn>
            </div>
          </td>
        </tr>

        <tr>
          <td>Obrázok</td>
          <td v-for="vehicle in vehicles" :key="vehicle.id" class="image-cell">
            <v-img
                :src="vehicle.image"
                :alt="vehicle.name"
                :aspect-ratio="16/9"
                cover
                class="comparison-image"
            >
              <template v-slot:placeholder>
                <v-row align="center" justify="center">
                  <v-progress-circular indeterminate></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </td>
        </tr>

        <tr v-for="spec in specifications" :key="spec.key">
          <td>{{ spec.label }}</td>
          <td v-for="vehicle in vehicles" :key="vehicle.id" class="text-center">
            {{ vehicle[spec.key] }} {{ spec.unit }}
          </td>
        </tr>
        </tbody>
      </v-table>

      <div v-if="vehicles.length === 2" class="mt-6 radar-chart-container">
        <h3 class="text-h6 mb-4 text-center">Grafické porovnanie</h3>
        <div class="radar-chart-wrapper">
          <canvas ref="radarChart"></canvas>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { Vehicle } from '../types/vehicle';
import Chart from 'chart.js/auto';

interface Specification {
  key: keyof Vehicle;
  label: string;
  unit: string;
}

interface MaxValues {
  speed: number;
  range: number;
  weight: number;
}

export default defineComponent({
  name: 'ComparisonTable',

  props: {
    vehicles: {
      type: Array as PropType<Vehicle[]>,
      required: true
    }
  },

  emits: ['remove', 'clear-all'],

  data() {
    return {
      chart: null as Chart<'radar', number[], string> | null,
      specifications: [
        { key: 'year', label: 'Rok výroby', unit: '' },
        { key: 'manufacturer', label: 'Výrobca', unit: '' },
        { key: 'speed', label: 'Rýchlosť', unit: 'km/h' },
        { key: 'weight', label: 'Hmotnosť', unit: 't' },
        { key: 'range', label: 'Dosah', unit: 'km' },
        { key: 'crew', label: 'Posádka', unit: '' }
      ] as Specification[]
    };
  },

  methods: {
    getVehicleCategory(vehicles: Vehicle[]): 'air' | 'ground' | 'helicopter' {
      if (vehicles.every(v => v.type === 'aircraft')) return 'air';
      if (vehicles.every(v => v.type === 'helicopter')) return 'helicopter';
      if (vehicles.every(v => ['tank', 'artillery', 'airDefense'].includes(v.type))) return 'ground';
      return 'ground';
    },

    getMaxValues(category: 'air' | 'ground' | 'helicopter'): MaxValues {
      switch (category) {
        case 'air':
          return { speed: 3000, range: 6000, weight: 100 };
        case 'helicopter':
          return { speed: 500, range: 1500, weight: 20 };
        case 'ground':
          return { speed: 100, range: 1000, weight: 70 };
      }
    },

    normalizeValue(value: number, metric: keyof MaxValues, maxValues: MaxValues) {
      const max = maxValues[metric];
      return (value / max) * 100;
    },

    createRadarChart() {
      const canvas = this.$refs.radarChart as HTMLCanvasElement | null;
      if (!canvas || this.vehicles.length !== 2) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (this.chart) {
        this.chart.destroy();
      }

      const category = this.getVehicleCategory(this.vehicles);
      const maxValues = this.getMaxValues(category);
      const metrics: (keyof MaxValues)[] = ['speed', 'range', 'weight'];
      const labels = ['Rýchlosť (km/h)', 'Dosah (km)', 'Hmotnosť (t)'];

      this.chart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels,
          datasets: this.vehicles.map((vehicle, index) => ({
            label: vehicle.name,
            data: metrics.map(metric =>
                this.normalizeValue(vehicle[metric] as number, metric, maxValues)
            ),
            backgroundColor: index === 0
                ? 'rgba(25, 118, 210, 0.2)'
                : 'rgba(67, 160, 71, 0.2)',
            borderColor: index === 0
                ? '#1976D2'
                : '#43A047',
            borderWidth: 2,
            pointBackgroundColor: index === 0
                ? '#1976D2'
                : '#43A047'
          }))
        },
        options: {
          scales: {
            r: {
              min: 0,
              max: 100,
              angleLines: {
                color: 'rgba(255, 255, 255, 0.2)'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)'
              },
              pointLabels: {
                color: 'rgba(255, 255, 255, 0.7)',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              },
              ticks: {
                callback: function(value) {
                  return `${value}%`;
                },
                color: 'rgba(255, 255, 255, 0.7)',
                backdropColor: 'transparent'
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context: any) => {
                  const dataIndex = context.dataIndex;
                  const metric = metrics[dataIndex];
                  const value = context.raw as number;
                  const actualValue = (value / 100) * maxValues[metric];

                  const unit = metric === 'speed' ? 'km/h' : metric === 'range' ? 'km' : 't';
                  return `${context.dataset.label}: ${actualValue.toFixed(1)} ${unit}`;
                }
              }
            },
            legend: {
              labels: {
                color: 'rgba(255, 255, 255, 0.7)',
                font: {
                  size: 14
                }
              }
            }
          }
        }
      });
    }
  },

  watch: {
    vehicles: {
      handler(newVehicles) {
        if (newVehicles.length === 2) {
          this.$nextTick(() => {
            this.createRadarChart();
          });
        }
      },
      deep: true
    }
  },

  mounted() {
    if (this.vehicles.length === 2) {
      this.createRadarChart();
    }
  },

  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
});
</script>

<style scoped>
.comparison-table {
  background-color: #1E1E1E;
}

.radar-chart-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
}

.radar-chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.image-cell {
  padding: 16px !important;
}

.comparison-image {
  border-radius: 8px;
  overflow: hidden;
  max-height: 300px;
  width: 100%;
}

:deep(.v-table) {
  background-color: transparent !important;
}

:deep(.v-table td) {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

:deep(.v-table tr:hover) {
  background-color: rgba(255, 255, 255, 0.05);
}
</style>