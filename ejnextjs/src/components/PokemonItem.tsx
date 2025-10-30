"use client";
import React, { useEffect, useState } from "react";

type Pokemon = {
    id: number;
    name: string;
    sprites: { front_default: string | null };
};

export default function PokemonItem({ pokemon }: { pokemon: Pokemon }) {
    const [pressed, setPressed] = useState(false);

    useEffect(() => {
    // opcional: debug al renderizar
    // console.log(`Render ${pokemon.name}`);
    }, [pokemon.name]);

    function handlePressStart() {
        setPressed(true);
    }
    function handlePressEnd() {
    setTimeout(() => setPressed(false), 120);
    }

    const baseStyle: React.CSSProperties = {
        display: "flex",
        gap: 12,
        alignItems: "center",
        padding: 12,
        borderRadius: 10,
        border: "1px solid rgba(15,23,42,0.06)",
        background: "#fff",
        boxShadow: "0 8px 24px rgba(2,6,23,0.06)",
        textAlign: "left",
        transition: "transform 120ms ease, box-shadow 120ms ease",
        cursor: "pointer",
        userSelect: "none",
    };

    const pressedStyle: React.CSSProperties = {
    transform: "translateY(3px) scale(0.998)",
    boxShadow: "0 4px 10px rgba(2,6,23,0.08)",
    };

    return (
    <article
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        onTouchCancel={handlePressEnd}
        tabIndex={0}
        onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
            handlePressStart();
            handlePressEnd();
        }
        }}
    style={{ ...(baseStyle as object), ...(pressed ? pressedStyle : {}) }}
    aria-label={pokemon.name}
    >
        <img
        src={pokemon.sprites?.front_default ?? "/placeholder.png"}
        alt={pokemon.name}
        width={72}
        height={72}
        loading="lazy"
        style={{ width: 72, height: 72, objectFit: "contain", borderRadius: 6 }}
        onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            if (!img.src.includes("/placeholder.png")) img.src = "/placeholder.png";
        }}
        />

    <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
            <strong style={{ textTransform: "capitalize" }}>{pokemon.name}</strong>
            <small style={{ color: "#6b7280" }}>#{pokemon.id}</small>
        </div>
    </div>
    </article>
    );
}