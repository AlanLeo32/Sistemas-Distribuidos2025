"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import PokemonItem from "./PokemonItem";
import Link from "next/link";
type Pokemon = {
    id: number;
    name: string;
    sprites: { front_default: string };
    types: { type: { name: string } }[];
    height: number;
    weight: number;
};

export default function PokemonList() {
    const [pokemones, setPokemones] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        async function fetchCargaPokemon() {
            try {
                setLoading(true);
                setError(null);
                setPokemones([]);
                // obtener la primera página (limit=30, offset=0)
                const listRes = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=30&offset=0");
                for (let id = 1; id <= 20; id++) {
                    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`); 
                    if (!mounted) break;     
                    const data: Pokemon = res.data;
                    setPokemones(prev => [...prev, data]);//este prev me sirve para no pisar el estado anterior
                }
            } catch (error) {
                console.error('Error al obtener el Pokémon:', error.message);
                if (mounted) setError("Error al obtener Pokémons");
            }finally {
            if (mounted) setLoading(false); 
        }
        }

        fetchCargaPokemon();
        return () => {
            mounted = false;
        };
    }, []);

    if (loading) return <div style={{ padding: 20 }}>Cargando pokémons…</div>;
    if (error) return <div style={{ padding: 20, color: "crimson" }}>{error}</div>;
    return (
        <ul style={{ display: "grid", gap: 12, padding: 0, margin: 0, listStyle: "none" }}>
            {pokemones.map(p => (
                <li key={p.id}>
                    <Link href={`/pokemon/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <PokemonItem pokemon={p} />
                    </Link>
                </li>
            ))}
        </ul>
    );
}