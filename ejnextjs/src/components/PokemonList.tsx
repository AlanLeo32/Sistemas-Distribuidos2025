"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import {PokemonItem} from "./PokemonItem";

type Pokemon = {
    id: number;
    name: string;
    sprites: { front_default: string | null };
    types?: { type: { name: string } }[];
    height?: number;
    weight?: number;
};

async function fetchPokemons(limit: number): Promise<Pokemon[]> {
    const listRes = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`);
    if (!listRes.ok) throw new Error("Error al obtener lista");
    const listJson = await listRes.json();
    const results: { name: string; url: string }[] = listJson.results || [];

    // traer detalles en paralelo manteniendo orden
    const details = await Promise.all(
        results.map(r =>
        fetch(r.url).then(res => {
            if (!res.ok) throw new Error("Error al obtener detalle");
        return res.json();
        })
    )
    );
    return details as Pokemon[];
}

export default function PokemonList() {
    const [pageSize, setPageSize] = useState<number>(20);

    const { data: pokemones, isLoading, isError, isFetching } = useQuery<Pokemon[], Error>({
        queryKey: ["pokemons", pageSize],
        queryFn: () => fetchPokemons(pageSize),
        staleTime: 1000 * 60, // opcional
    });

    if (isLoading) {
    return (
        <ul style={{ display: "grid", gap: 12, padding: 0, margin: 0, listStyle: "none" }}>
        {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: 12, borderRadius: 10, background: "#fff", boxShadow: "0 6px 18px rgba(2,6,23,0.04)" }}>
            <Skeleton width={72} height={72} borderRadius={8} />
            <div style={{ flex: 1 }}>
                <Skeleton width="40%" height={16} />
                <div style={{ height: 8 }} />
                <Skeleton width="60%" height={12} />
            </div>
            </li>
        ))}
        </ul>
    );
    }

    if (isError || !pokemones) {
        return <div style={{ padding: 20, color: "crimson" }}>Error al cargar Pokémons</div>;
    }

    return (
    <>
    <ul style={{ display: "grid", gap: 12, padding: 0, margin: 0, listStyle: "none" }}>
        {pokemones.map(p => (
        <li key={p.id}>
            <Link href={`/pokemon/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <PokemonItem pokemon={p} />
            </Link>
        </li>
        ))}
    </ul>

    <div style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "center" }}>
        <button
            onClick={() => setPageSize(s => s + 10)}
            style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer" }}
        >Cargar más</button>

        {isFetching && <span style={{ color: "#6b7280" }}>Actualizando…</span>}
    </div>
    </>
);
}