<template>
  <div class="history-section">
    <h2>História Slovenskej armády</h2>
    <div class="content">
      <div v-for="(section, index) in historySections"
           :key="index"
           class="history-block"
      >
        <h3>{{ section.period }}</h3>
        <p>{{ section.text }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HistorySection',
  data() {
    return {
      historySections: [
        {
          period: '1918 - 1939 Československá republika',
          text: 'Po vzniku Československa sa začala budovať moderná armáda s vlastným vývojom a výrobou techniky.'
        },
        {
          period: '1993 - Vznik Slovenskej armády',
          text: 'Po rozdelení Československa vznikli samostatné ozbrojené sily SR.'
        },
        {
          period: '2004 - Vstup do NATO',
          text: 'Slovensko sa stalo členom Severoatlantickej aliancie, čo prinieslo modernizáciu a profesionalizáciu armády.'
        },
        {
          period: '2004 - 2023 Modernizácia',
          text: 'Postupná modernizácia výzbroje a technického vybavenia. Zavádzanie štandardov NATO a posilňovanie obranných spôsobilostí.'
        }
      ]
    }
  }
})
</script>

<style scoped>
.history-section {
  padding: 2rem;
  background: #444;
  border-radius: 8px;
  margin: 2rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.history-block {
  margin: 2rem 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  transition: transform 0.2s;
}

.history-block:hover {
  transform: translateX(10px);
}

h2 {
  text-align: center;
  color: white;
  margin-bottom: 2rem;
  font-size: 2rem;
}

h3 {
  color: #1976D2;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

p {
  color: #e0e0e0;
  line-height: 1.6;
}

@media (max-width: 600px) {
  .history-section {
    padding: 1rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.1rem;
  }
}
</style>