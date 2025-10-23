"use client";
import React, { useEffect, useState } from "react";

type Pokemon = { id: number; name: string; sprites: { front_default: string }; types: { type: { name: string } }[]; height: number; weight: number; };

export default function PokemonItem({ pokemon }: { pokemon: Pokemon }) {
const [contador, setContador] = useState<number>(0);

    useEffect(() => {
    console.log(`El contador de ${pokemon.name} cambió:`, contador);
    }, [contador]);

    function handleUse(e?: React.MouseEvent) {
    if (e) {
        e.stopPropagation();
        e.preventDefault();
    }
    setContador(c => c + 1);
    }

    return (
    <article style={{ display: "flex", gap: 12, alignItems: "center", padding: 12, borderRadius: 10, border: "1px solid rgba(15,23,42,0.06)", background: "#fff", boxShadow: "0 6px 18px rgba(2,6,23,0.04)" }}>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} width={72} height={72} style={{ width: 72, height: 72, objectFit: "contain" }} />
        <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong style={{ textTransform: "capitalize" }}>{pokemon.name}</strong>
            <small style={{ color: "#6b7280" }}>#{pokemon.id}</small>
        </div>
        </div>

    <div style={{ textAlign: "right", minWidth: 90 }}>
        <button onClick={handleUse} style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#f8fafc", cursor: "pointer" }}>
            Usar
        </button>
        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>Usos</div>
        <div style={{ fontWeight: 700, marginTop: 4 }}>{contador}</div>
        </div>
    </article>
    );
}