<template>
  <div class="carousel">
    <div class="carousel-inner">
      <div v-for="(slide, index) in slides"
           :key="index"
           :class="['carousel-slide', { active: currentSlide === index }]">
        <img :src="slide.image" :alt="slide.title">
        <div class="carousel-caption">
          <h3>{{ slide.title }}</h3>
          <p>{{ slide.description }}</p>
        </div>
      </div>
    </div>
    <button class="carousel-control prev" @click="prevSlide">&lt;</button>
    <button class="carousel-control next" @click="nextSlide">&gt;</button>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  data() {
    return {
      currentSlide: 0,
      slides: [
        {
          image: 'https://www.mosr.sk/data/images/184932.jpeg',
          title: 'Slovenské vzdušné sily',
          description: 'Moderná letecká technika'
        },
        {
          image: 'https://spravy.rtvs.sk/wp-content/uploads/2022/05/tank-t-72-e1651842875796.jpg',
          title: 'Tankové jednotky',
          description: 'Obranná sila armády'
        },
        {
          image: 'https://img.ephoto.sk/data/users//1529/photos/94c582ca59ce6a9e5642b7b6a0fc779973a8d60c.jpg',
          title: 'Helikoptéry',
          description: 'Taktická vzdušná podpora'
        },
        {
          image: 'https://www.armadninoviny.cz/domains/0023-armadninoviny_cz/useruploads/images/dana_m2_1b.jpg',
          title: 'Artiléria',
          description: 'Palebná podpora'
        }
      ]
    }
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length
    },
    prevSlide() {
      this.currentSlide = this.currentSlide === 0
          ? this.slides.length - 1
          : this.currentSlide - 1
    }
  },
  mounted() {
    setInterval(this.nextSlide, 5000)
  }
}
</script>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
}

.carousel-slide {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.carousel-slide.active {
  opacity: 1;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-caption {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 20px;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 15px;
  cursor: pointer;
}

.prev { left: 10px; }
.next { right: 10px; }
</style>