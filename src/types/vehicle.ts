export type VehicleType = 'tank' | 'aircraft' | 'helicopter' | 'artillery' | 'airDefense';
export type VehicleStatus = 'active' | 'maintenance' | 'retired' | 'museum' | 'planned' | 'ordered' | 'considered';

export interface Vehicle {
    id: number;
    name: string;
    type: VehicleType;
    year: number;
    manufacturer: string;
    speed: number;
    weight: number;
    range: number;
    image: string;
    crew: number;
    armament: string[];
    status: VehicleStatus;
    description?: string;
}