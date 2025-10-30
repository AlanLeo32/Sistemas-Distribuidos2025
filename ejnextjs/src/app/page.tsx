import PokemonList from "../components/PokemonList";

export default function Page() {
    return (
    <main style={{ maxWidth: 900, margin: "32px auto", padding: 20 }}>
        <h1 style={{ margin: 0 }}>Listado de Pokémons</h1>
        <p style={{ color: "#6b7280", marginTop: 6 }}>
            Clickea en un pokemon para obtener más detalles.
        </p>
        <section style={{ marginTop: 18 }}>
            <PokemonList />
        </section>
    </main>
    );
}
