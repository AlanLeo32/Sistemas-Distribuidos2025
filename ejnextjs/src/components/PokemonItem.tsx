"use client";
import React, { useEffect, useState } from "react";

type Pokemon = {
    id: number;
    name: string;
    sprites: { front_default: string  };
    types: { type: { name: string } }[];
    height: number;
    weight: number;
};

export default function PokemonItem({ pokemon }: { pokemon: Pokemon }) {
const [contador, setContador] = useState<number>(0);

useEffect(() => {
    console.log(`El contador de ${pokemon.name} cambió:`, contador);
}, [contador]);

function handleClick() {
    setContador(c => c + 1);
}

return (
    <button
    onClick={handleClick}
    aria-pressed={contador > 0}
    style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        padding: 12,
        borderRadius: 10,
        border: "1px solid rgba(15,23,42,0.06)",
        background: "#fff",
        boxShadow: "0 6px 18px rgba(2,6,23,0.04)",
        textAlign: "left",
        cursor: "pointer",
    }}
    >
    <img
        src={pokemon.sprites?.front_default ?? "/placeholder.png"}
        alt={pokemon.name}
        width={72}
        height={72}
        style={{ width: 72, height: 72, objectFit: "contain", imageRendering: "pixelated" }}
    />
    <div style={{ flex: 1 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
        <strong style={{ textTransform: "capitalize" }}>{pokemon.name}</strong>
        <small style={{ color: "#6b7280" }}>#{pokemon.id}</small>
    </div>
    <div style={{ marginTop: 6, color: "#374151", fontSize: 13 }}>
        <span>
            Tipos:{" "}
            {(pokemon.types || []).map(t => t.type.name).join(", ") || "—"}
        </span>
        <div style={{ marginTop: 6, fontSize: 12, color: "#6b7280" }}>
            Alt:{pokemon.height ?? "—"} • Peso:{pokemon.weight ?? "—"}
        </div>
        </div>
    </div>

    <div style={{ textAlign: "right", minWidth: 70 }}>
        <div style={{ fontSize: 12, color: "#6b7280" }}>Usos</div>
        <div style={{ fontWeight: 700, marginTop: 4 }}>{contador}</div>
    </div>
    </button>
);
}