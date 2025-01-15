import { defineStore } from 'pinia'
import type { Vehicle, VehicleType } from '../types/vehicle'
import {VehicleName} from "../data/data.ts";

interface VehicleState {
    vehicles: Vehicle[]
    loading: boolean
    error: string | null
}

export const useVehicleStore = defineStore('vehicles', {
    state: (): VehicleState => {
        return ({
            vehicles: VehicleName,
            loading: false,
            error: null
        });
    },

    getters: {
        getTanks: (state): Vehicle[] => state.vehicles.filter(v => v.type === 'tank'),
        getAircraft: (state): Vehicle[] => state.vehicles.filter(v => v.type === 'aircraft'),
        getHelicopters: (state): Vehicle[] => state.vehicles.filter(v => v.type === 'helicopter'),
        getArtillery: (state): Vehicle[] => state.vehicles.filter(v => v.type === 'artillery'),
        getAirDefense: (state): Vehicle[] => state.vehicles.filter(v => v.type === 'airDefense'),

        getActiveVehicles: (state): Vehicle[] =>
            state.vehicles.filter(v => v.status === 'active'),

        getVehicleById: (state) => (id: number): Vehicle | undefined =>
            state.vehicles.find(v => v.id === id),

        getVehiclesByType: (state) => (type: VehicleType): Vehicle[] =>
            state.vehicles.filter(v => v.type === type),

        getVehiclesByManufacturer: (state) => (manufacturer: string): Vehicle[] =>
            state.vehicles.filter(v => v.manufacturer === manufacturer),

        getAllManufacturers: (state): string[] =>
            [...new Set(state.vehicles.map(v => v.manufacturer))],

        getVehiclesByYear: (state) => (year: number): Vehicle[] =>
            state.vehicles.filter(v => v.year === year),

        getYearRange: (state) => {
            const years = state.vehicles.map(v => v.year)
            return {
                min: Math.min(...years),
                max: Math.max(...years)
            }
        }
    },
})