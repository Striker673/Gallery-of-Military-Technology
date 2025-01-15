<template>
  <div class="home">
    <Carousel />
    <div class="container">
      <div class="history-section">
        <h2>História Slovenskej armády</h2>
        <div class="history-content">
          <div class="history-block">
            <h3>1993 - Vznik Slovenskej armády</h3>
            <p>Po rozdelení Československa vznikli samostatné ozbrojené sily SR.</p>
          </div>
          <div class="history-block">
            <h3>2004 - Vstup do NATO</h3>
            <p>Slovensko sa stalo členom Severoatlantickej aliancie.</p>
          </div>
          <div class="history-block">
            <h3>Modernizácia</h3>
            <p>Postupná modernizácia výzbroje a technického vybavenia.</p>
          </div>
        </div>
      </div>

      <div class="featured-sections">
        <h2>Hlavné kategórie vojenskej techniky</h2>
        <div class="category-grid">
          <router-link
              v-for="category in categories"
              :key="category.path"
              :to="category.path"
              class="category-card"
          >
            <img :src="category.image" :alt="category.name">
            <h3>{{ category.name }}</h3>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel.vue'

export default {
  name: 'HomeView',
  components: {
    Carousel
  },
  data() {
    return {
      categories: [
        {
          name: 'Lietadlá',
          path: '/aircraft',
          image: 'https://static.encyclopedia.warthunder.com/icons/mig_29_9_13_ico.svg'
        },
        {
          name: 'Tanky',
          path: '/tank',
          image: 'https://static.encyclopedia.warthunder.com/icons/ussr_t_72m2_moderna_ico.svg'
        },
        {
          name: 'Helikoptéry',
          path: '/helicopter',
          image: 'https://static.encyclopedia.warthunder.com/icons/hkp9a_cb3_fc_ico.svg'
        },
        {
          name: 'Artiléria',
          path: '/artillery',
          image: 'https://static.encyclopedia.warthunder.com/icons/germ_m109g_ico.svg'
        },
        {
          name: 'Protivzdušná obrana',
          path: '/air-defense',
          image: 'https://static.encyclopedia.warthunder.com/icons/germ_9a35_m_ico.svg'
        }
      ]
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.history-section {
  background-color: #1E1E1E;
  border-radius: 8px;
  padding: 2rem;
  margin: 2rem 0;
}

.history-block {
  margin: 1.5rem 0;
}

.history-block h3 {
  color: #1976D2;
  margin-bottom: 0.5rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.category-card {
  background-color: #1E1E1E;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  color: white;
  transition: transform 0.2s;
}

.category-card:hover {
  transform: translateY(-5px);
}

.category-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.category-card h3 {
  padding: 1rem;
  text-align: center;
}

h2 {
  color: white;
  text-align: center;
  margin: 2rem 0;
  font-size: 2rem;
}
</style>