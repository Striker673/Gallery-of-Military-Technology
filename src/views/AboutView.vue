<template>
  <div class="about-view">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8">
          <v-card class="about-card">
            <v-img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Slovakia.svg/1920px-Flag_of_Slovakia.svg.png "
                height="300"
                class="about-header-image"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.9)"
            >
              <div class="header-title-container">
                <v-card-title class="text-h3 text-white text-center">
                  O našej vojenskej technike
                </v-card-title>
              </div>
            </v-img>


            <v-card-text class="pa-6">
              <div class="description-section mb-8">
                <p class="text-body-1">
                  Vitajte na stránke venovanej vojenskej technike Slovenskej armády.
                  Táto platforma slúži ako komplexný informačný portál o technických prostriedkoch
                  používaných v našich moderných ozbrojených silách. Našim cieľom je poskytnúť
                  presné a aktuálne informácie o vybavení, ktoré chráni našu krajinu.
                </p>
              </div>

              <v-row class="stats-grid mb-8">
                <v-col cols="12" md="4">
                  <v-card class="stat-card" elevation="2">
                    <div class="d-flex flex-column align-center pa-4">
                      <v-icon size="48" color="primary" class="mb-2">mdi-tank</v-icon>
                      <div class="text-h4 mb-1">30+</div>
                      <div class="text-subtitle-1">Typov techniky</div>
                    </div>
                  </v-card>
                </v-col>
                <v-col cols="12" md="4">
                  <v-card class="stat-card" elevation="2">
                    <div class="d-flex flex-column align-center pa-4">
                      <v-icon size="48" color="primary" class="mb-2">mdi-shield-check</v-icon>
                      <div class="text-h4 mb-1">1993</div>
                      <div class="text-subtitle-1">Rok založenia</div>
                    </div>
                  </v-card>
                </v-col>
                <v-col cols="12" md="4">
                  <v-card class="stat-card" elevation="2">
                    <div class="d-flex flex-column align-center pa-4">
                      <v-icon size="48" color="primary" class="mb-2">mdi-account-group</v-icon>
                      <div class="text-h4 mb-1">12,000+</div>
                      <div class="text-subtitle-1">Profesionálnych vojakov</div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>

              <v-card class="mission-card mb-8" elevation="2">
                <v-card-title class="text-h5">
                  <v-icon left color="primary">mdi-target</v-icon>
                  Naša misia
                </v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-item v-for="(mission, index) in missions" :key="index">
                      <v-list-item-icon>
                        <v-icon color="primary">mdi-check-circle</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>{{ mission }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>

              <ContactForm class="mb-8" />

              <v-card class="social-card" elevation="2">
                <v-card-title class="text-h5">
                  <v-icon left color="primary">mdi-share-variant</v-icon>
                  Sledujte nás
                </v-card-title>
                <v-card-text>
                  <div class="d-flex justify-center gap-4">
                    <v-btn
                        v-for="(social, index) in socials"
                        :key="index"
                        :color="social.color"
                        :href="social.link"
                        target="_blank"
                        icon
                        large
                    >
                      <v-icon>{{ social.icon }}</v-icon>
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContactForm from '@/components/ContactForm.vue'

export default defineComponent({
  name: 'AboutView',
  components: {
    ContactForm
  },
  data() {
    return {
      missions: [
        'Vzdelávať verejnosť o technologickom vybavení Slovenskej armády',
        'Prezentovať technologický pokrok v obranných systémoch',
        'Poskytovať autentické informácie o vojenskej technike',
        'Podporovať záujem o moderné vojenské technológie'
      ],
      socials: [
        {
          icon: 'mdi-facebook',
          link: 'https://facebook.com/slovenska.armada',
          color: '#1877F2'
        },
        {
          icon: 'mdi-twitter',
          link: 'https://twitter.com/slovenska_armada',
          color: '#1DA1F2'
        },
        {
          icon: 'mdi-instagram',
          link: 'https://instagram.com/slovenska_armada',
          color: '#E4405F'
        },
        {
          icon: 'mdi-youtube',
          link: 'https://youtube.com/slovenskaarmada',
          color: '#FF0000'
        }
      ]
    }
  }
})
</script>

<style scoped>
.about-view {
  background: linear-gradient(135deg, #27276b 0%, #1E1E1E 100%);
  min-height: 100vh;
  padding: 2rem 0;
}

.about-card {
  background-color: #1E1E1E;
  border-radius: 16px;
  overflow: hidden;
}

.about-header-image {
  position: relative;
}

.stat-card, .mission-card, .social-card {
  background-color: #2A2A2A !important;
  border-radius: 12px;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.gap-4 {
  gap: 1rem;
}

@media (max-width: 600px) {
  .text-h3 {
    font-size: 2rem !important;
  }

  .about-header-image {
    height: 200px !important;
  }
}
</style>