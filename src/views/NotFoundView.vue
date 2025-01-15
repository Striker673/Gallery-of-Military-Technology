<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Stránka nebola nájdená</h2>
    <p>Ľutujeme, ale požadovaná stránka neexistuje.</p>
    <router-link to="/" class="home-link">
      Späť na hlavnú stránku
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFoundView'
})
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 2rem;
}

h1 {
  font-size: 6rem;
  margin: 0;
  color: WHITE;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: float 3s ease-in-out infinite;
}

h2 {
  font-size: 2rem;
  margin: 1rem 0;
  color: #FFD700;
}

p {
  margin: 1rem 0;
  color: WHITE;
  font-size: 1.2rem;
}

.home-link {
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background: #ffe412;
  color: BLACK;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.home-link:hover {
  background: #ffaa21;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (max-width: 600px) {
  h1 {
    font-size: 4rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
  }
}
</style>