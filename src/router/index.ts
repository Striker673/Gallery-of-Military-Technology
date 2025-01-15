import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useVehicleStore } from '@/stores/vehicles'
import NotFoundView from '@/views/NotFoundView.vue'
import HomeView from '@/views/HomeView.vue'
import VehicleDetail from '@/components/VehicleDetail.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/tank',
    name: 'tank',
    component: () => import('@/views/TankView.vue'),
    children: [
      {
        path: ':id',
        name: 'tank.detail',
        component: VehicleDetail,
        beforeEnter(to) {
          const store = useVehicleStore()
          const exists = store.getVehicleById(Number(to.params.id))
          if (!exists) {
            return {
              name: 'NotFound',
              params: { pathMatch: to.path.split('/').slice(1) },
              query: to.query,
              hash: to.hash,
            }
          }
        }
      }
    ]
  },
  {
    path: '/aircraft',
    name: 'aircraft',
    component: () => import('@/views/AircraftView.vue'),
    children: [
      {
        path: ':id',
        name: 'aircraft.detail',
        component: VehicleDetail,
        beforeEnter(to) {
          const store = useVehicleStore()
          const exists = store.getVehicleById(Number(to.params.id))
          if (!exists) {
            return {
              name: 'NotFound',
              params: { pathMatch: to.path.split('/').slice(1) },
              query: to.query,
              hash: to.hash,
            }
          }
        }
      }
    ]
  },
  {
    path: '/helicopter',
    name: 'helicopter',
    component: () => import('@/views/HelicopterView.vue'),
    children: [
      {
        path: ':id',
        name: 'helicopter.detail',
        component: VehicleDetail,
        beforeEnter(to) {
          const store = useVehicleStore()
          const exists = store.getVehicleById(Number(to.params.id))
          if (!exists) {
            return {
              name: 'NotFound',
              params: { pathMatch: to.path.split('/').slice(1) },
              query: to.query,
              hash: to.hash,
            }
          }
        }
      }
    ]
  },
  {
    path: '/artillery',
    name: 'artillery',
    component: () => import('@/views/ArtilleryView.vue'),
    children: [
      {
        path: ':id',
        name: 'artillery.detail',
        component: VehicleDetail,
        beforeEnter(to) {
          const store = useVehicleStore()
          const exists = store.getVehicleById(Number(to.params.id))
          if (!exists) {
            return {
              name: 'NotFound',
              params: { pathMatch: to.path.split('/').slice(1) },
              query: to.query,
              hash: to.hash,
            }
          }
        }
      }
    ]
  },
  {
    path: '/air-defense',
    name: 'airDefense',
    component: () => import('@/views/AirDefenseView.vue'),
    children: [
      {
        path: ':id',
        name: 'airDefense.detail',
        component: VehicleDetail,
        beforeEnter(to) {
          const store = useVehicleStore()
          const exists = store.getVehicleById(Number(to.params.id))
          if (!exists) {
            return {
              name: 'NotFound',
              params: { pathMatch: to.path.split('/').slice(1) },
              query: to.query,
              hash: to.hash,
            }
          }
        }
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router