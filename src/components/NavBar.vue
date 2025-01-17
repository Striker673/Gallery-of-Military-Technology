<template>
  <div>
    <v-app-bar color="#27276b">
      <div class="nav-brand">
        <v-img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Coat_of_arms_of_Slovakia.svg/640px-Coat_of_arms_of_Slovakia.svg.png"
            alt="Slovenský vojenský emblém"
            width="30"
            height="30"
            class="ml-4 mr-2"
        />
        <div class="app-title">
          <router-link to="/" class="text-white text-decoration-none">
            Vojenská Technika
          </router-link>
        </div>
      </div>

      <v-spacer />

      <div class="navigation-buttons" :class="{ 'hidden-mobile': isMobile }">
        <v-btn to="/" variant="text">Domov</v-btn>
        <v-btn to="/aircraft" variant="text">Lietadlá</v-btn>
        <v-btn to="/tank" variant="text">Tanky</v-btn>
        <v-btn to="/helicopter" variant="text">Helikoptéry</v-btn>
        <v-btn to="/artillery" variant="text">Artiléria</v-btn>
        <v-btn to="/air-defense" variant="text">Protivzdušná obrana</v-btn>
        <v-btn to="/about" variant="text">O nás</v-btn>
      </div>

      <v-app-bar-nav-icon
          v-show="isMobile"
          @click="drawer = !drawer"
          color="white"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        location="right"
        temporary
        width="280"
    >
      <v-list>
        <v-list-item
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            @click="drawer = false"
            color="#27276b"
            class="mb-2"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon" color="#27276b"></v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDisplay } from 'vuetify'

interface MenuItem {
  title: string
  path: string
  icon: string
}

export default defineComponent({
  name: 'NavBar',

  setup() {
    const { mobile } = useDisplay()
    return { isMobile: mobile }
  },

  data() {
    return {
      drawer: false,
      menuItems: [
        {
          title: 'Domov',
          path: '/',
          icon: 'mdi-home'
        },
        {
          title: 'Lietadlá',
          path: '/aircraft',
          icon: 'mdi-airplane'
        },
        {
          title: 'Tanky',
          path: '/tank',
          icon: 'mdi-tank'
        },
        {
          title: 'Helikoptéry',
          path: '/helicopter',
          icon: 'mdi-helicopter'
        },
        {
          title: 'Delostrelectvo',
          path: '/artillery',
          icon: 'mdi-dump-truck'
        },
        {
          title: 'Protivzdušná obrana',
          path: '/air-defense',
          icon: 'mdi-shield'
        },
        {
          title: 'O nás',
          path: '/about',
          icon: 'mdi-information'
        }
      ] as MenuItem[]
    }
  }
})
</script>

<style scoped>
.nav-brand {
  display: flex;
  align-items: center;
}

.app-title {
  font-size: 1.25rem;
  white-space: nowrap;
  overflow: visible;
}

.v-btn {
  color: white !important;
}

.v-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.navigation-buttons {
  display: flex;
  gap: 8px;
}

@media (max-width: 960px) {
  .navigation-buttons {
    display: none !important;
  }
}
</style>