export interface Beeper {
    id: number;
    name: string;
    status: string;
    created_at: Date;
    detonated_at?: Date;
    latitude?: number;
    longitude?: number;
}
