import axios from "axios";
import Link from "next/link";

type PokemonDetail = {
    id: number;
    name: string;
    sprites: { front_default: string };
    types: { type: { name: string } }[];
    height: number;
    weight: number;
};

export default async function Page({ params }: { params: { name: string } }) {
    const name = params.name;
    try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemon: PokemonDetail = res.data;

    return (
    <div style={{ padding: 12 }}>
        <h1 style={{ textTransform: "capitalize", marginBottom: 6 }}>{pokemon.name}</h1>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} width={200} height={200} style={{ borderRadius: 12 }} />
        <div style={{ marginTop: 12 }}>
            <strong>Tipos:</strong> {(pokemon.types || []).map(t => t.type.name).join(", ")}
        </div>
        <div style={{ marginTop: 8, color: "#6b7280" }}>
            Altura: {pokemon.height} • Peso: {pokemon.weight}
        </div>

        <div style={{ marginTop: 18 }}>
            <Link href="/">← Volver a la lista</Link>
        </div>
    </div>
    );
    } catch (err) {
    console.error(err);
    return (
    <div style={{ padding: 12 }}>
        <p style={{ color: "crimson" }}>No se pudo cargar el Pokémon "{name}".</p>
        <Link href="/">← Volver a la lista</Link>
    </div>
    );
    }
}