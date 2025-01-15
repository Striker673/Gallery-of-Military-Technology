<template>
  <div class="contact-form military-border v-card">
    <h2 class="contact-title">Kontaktné údaje</h2>
    <div class="contact-info">
      <div class="info-item">
        <v-icon left color="primary">mdi-phone</v-icon>
        <p>Telefón: {{ phoneNumber }}</p>
      </div>
      <div class="info-item">
        <v-icon left color="primary">mdi-email</v-icon>
        <p>Email: {{ email }}</p>
      </div>
      <div class="info-item">
        <v-icon left color="primary">mdi-map-marker</v-icon>
        <p>Adresa: {{ address }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ContactForm',
  data() {
    return {
      phoneNumber: '+421 960 960 960',
      email: 'info@mosr.sk',
      address: 'Kutuzovova 8, 832 47 Bratislava'
    }
  }
})
</script>

<style scoped>
.contact-form {
  background: #4b4b4b;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  margin: 2rem auto;
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
}

.contact-title {
  color: #ffffff;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.contact-info {
  margin-top: 2rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
  color: #B0B0B0;
  padding: 0.5rem;
  transition: background-color 0.2s;
}

.info-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.info-item i {
  font-size: 1.5rem;
  color: #1976D2;
  width: 2rem;
  text-align: center;
}

.info-item p {
  margin: 0;
}

@media (max-width: 600px) {
  .contact-form {
    margin: 1rem;
    padding: 1rem;
  }
}
</style>