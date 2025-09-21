import TocaResumen from "@/components/resumen";

export default function Home() {
    return (
    <main className="app-container">
        <h1 style={{ margin: 0 }}>Sistemas Distribuidos</h1>
        <p style={{ color: "#6b7280", marginTop: 6 }}>
        Carlos tevez:"A medida que uno va ganando cosas se hamburguesa"
        </p>

        <details className="details-card">
        <summary>
            <span>
            Sistema distribuido: “Colección de elementos autónomos de computación
            que se presentan a los usuarios como un sistema único y coherente”
            </span>
            <span className="hint"></span>
        </summary>

        <div className="details-content">
            <TocaResumen />
        </div>
        </details>
    </main>
    );
}
