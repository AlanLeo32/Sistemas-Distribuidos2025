"use client";
import React, { useEffect, useState } from "react";

type Pokemon = {
    id: number;
    name: string;
    sprites: { front_default: string | null };
};

async function readFavorites(): Promise<number[]> {
    try {
        const raw = localStorage.getItem("favorites");
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

async function writeFavorites(favs: number[]): Promise<void> {
    // simular latencia mínima para mostrar loading (puede quitarse)
    return new Promise((resolve) => {
        try {
            localStorage.setItem("favorites", JSON.stringify(favs));
        } finally {
            setTimeout(resolve, 180);
        }
    });
}

export function PokemonItem({ pokemon }: { pokemon: Pokemon }) {
    const [pressed, setPressed] = useState(false);
    const [isFav, setIsFav] = useState<boolean>(false);
    const [loadingFav, setLoadingFav] = useState<boolean>(false);
    const [favError, setFavError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const favs = await readFavorites();
                if (mounted) setIsFav(favs.includes(pokemon.id));
            } catch (err) {
                // no bloquear la UI por error de lectura
                if (mounted) setIsFav(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [pokemon.id]);

    function handlePressStart() {
        setPressed(true);
    }
    function handlePressEnd() {
        setTimeout(() => setPressed(false), 120);
    }

    async function toggleFavorite(e?: React.MouseEvent) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        setFavError(null);
        setLoadingFav(true);
        try {
            const favs = await readFavorites();
            let next: number[];
            if (favs.includes(pokemon.id)) {
                next = favs.filter((id) => id !== pokemon.id);
            } else {
                next = [...favs, pokemon.id];
            }
            await writeFavorites(next);
            setIsFav(next.includes(pokemon.id));
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            setFavError(`No se pudo actualizar favoritos: ${msg}`);
        } finally {
            setLoadingFav(false);
        }
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
        position: "relative",
    };

    const pressedStyle: React.CSSProperties = {
        transform: "translateY(3px) scale(0.998)",
        boxShadow: "0 4px 10px rgba(2,6,23,0.08)",
    };

    const favButtonStyle: React.CSSProperties = {
        border: "none",
        background: isFav ? "#fee2e2" : "#f3f4f6",
        color: isFav ? "#dc2626" : "#374151",
        padding: "6px 8px",
        borderRadius: 8,
        cursor: loadingFav ? "wait" : "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 14,
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

            <div style={{ minWidth: 120, textAlign: "right" }}>
                <button
                    onClick={toggleFavorite}
                    disabled={loadingFav}
                    title={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
                    style={favButtonStyle}
                    aria-pressed={isFav}
                >
                    {loadingFav ? (
                        <span style={{ fontSize: 12, color: "#6b7280" }}>…</span>
                    ) : (
                        <>
                            {isFav ? (
                                // heart filled
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                    <path d="M12 21s-7.5-4.9-10-8.1C-0.3 8.3 3.1 4 7.3 6.1 9 7.2 10 9 12 9s3-1.8 4.7-2.9C20.9 4 24.3 8.3 22 12.9 19.5 16.1 12 21 12 21z" />
                                </svg>
                            ) : (
                                // heart outline
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                                    <path d="M20.8 8.6c-.9-3-4-5.1-7.5-4.7-1.8.2-3.4 1.2-4.3 2.6-.9-1.4-2.5-2.4-4.3-2.6-3.5-.4-6.6 1.7-7.5 4.7C-.3 12.5 5 17.9 12 22c7-4.1 12.3-9.5 8.8-13.4z" />
                                </svg>
                            )}
                            <span style={{ fontWeight: 600 }}>{isFav ? "Favorito" : "Fav"}</span>
                        </>
                    )}
                </button>

                {favError && (
                    <div role="alert" style={{ marginTop: 6, color: "crimson", fontSize: 12 }}>
                        {favError}
                    </div>
                )}
            </div>
        </article>
    );
}