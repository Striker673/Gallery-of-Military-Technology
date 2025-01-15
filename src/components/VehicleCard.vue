<template>
  <v-card
      class="vehicle-card"
      elevation="4"
      @click="$emit('click:details', vehicle)"
  >
    <v-img
        :src="vehicle.image"
        :alt="vehicle.name"
        height="320"
        cover
        class="vehicle-image"
    >
      <template v-slot:placeholder>
        <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
        >
          <v-progress-circular
              indeterminate
              color="primary"
          />
        </v-row>
      </template>
    </v-img>

    <v-card-title class="text-h6">{{ vehicle.name }}</v-card-title>

    <v-card-text>
      <v-list>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon>mdi-calendar</v-icon>
          </template>
          <v-list-item-title>{{ vehicle.year }}</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <template v-slot:prepend>
            <v-icon>mdi-factory</v-icon>
          </template>
          <v-list-item-title>{{ vehicle.manufacturer }}</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <template v-slot:prepend>
            <v-icon>mdi-speedometer</v-icon>
          </template>
          <v-list-item-title>{{ vehicle.speed }} km/h</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
          :disabled="isInComparison"
          color="primary"
          variant="text"
          @click.stop="$emit('compare', vehicle)"
      >
        {{ isInComparison ? 'V porovnaní' : 'Porovnať' }}
      </v-btn>
      <v-btn
          color="primary"
          variant="tonal"
          @click.stop="$emit('click:details', vehicle)"
      >
        Detaily
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Vehicle } from '@/types/vehicle';

export default defineComponent({
  name: 'VehicleCard',
  props: {
    vehicle: {
      type: Object as PropType<Vehicle>,
      required: true
    },
    isInComparison: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    'compare': (vehicle: Vehicle) => true,
    'click:details': (vehicle: Vehicle) => true
  }
});
</script>

<style scoped>
.vehicle-card {
  height: 100%;
  transition: transform 0.2s;
  cursor: pointer;
}

.vehicle-card:hover {
  transform: translateY(-5px);
}

.vehicle-image {
  position: relative;
}

.vehicle-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 50%);
}
</style>