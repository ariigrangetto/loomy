export interface Client {
    id: string | number;
    name: string;
    created_at: string;
    number?: number
    lastname: string
}

export type State = "pending" | "completed" | "cancelled";

export interface Turno {
    id: number;
    created_at: string;
    date: string;
    time: string;
    description: string;
    client: Client;
    user_id: string;
    state: State;
}
