"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import PokemonItem from "./PokemonItem";

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


    useEffect(() => {

        async function fetchCargaPokemon() {
            try {
                setPokemones([]);
                for (let id = 1; id <= 20; id++) {
                    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                    const data: Pokemon = res.data;
                    setPokemones(prev => [...prev, data]);//este prev me sirve para no pisar el estado anterior
                }
            } catch (error) {
                console.error('Error al obtener el Pokémon:', error.message);
            } 
        }

        fetchCargaPokemon();

    }, []);

    return (
        <div style={{ display: "grid", gap: 12 }}>
            {pokemones.map(p => (
                <PokemonItem key={p.id} pokemon={p} />
            ))}
        </div>
    );
}