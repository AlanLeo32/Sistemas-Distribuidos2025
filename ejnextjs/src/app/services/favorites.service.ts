import { Pokemon } from "../lib/database";

export const favoritesService = {
    getAll: async (): Promise<Pokemon[]> => {
    const res = await fetch("/api/favorites");
    if (!res.ok) throw new Error("Error al obtener pokemones");
    return res.json();
    },

    create: async (pokemon: {
    id: number;
    name: string;
    sprites: { front_default: string | null };
    types?: { type: { name: string } }[];
    height?: number;
    weight?: number;
    }): Promise<Pokemon> => {
    const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokemon),
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Error al crear pokemon");
    }
    return res.json();
    },

    delete: async (id: number): Promise<void> => {
    const res = await fetch(`/api/favorites/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar pokemon");
    },
};
