/*Ejercicio propuesto

Modificación de la actividad anterior para ahora permitir la navegación al detalle de un Pokemon concreto (sumado a la utilización de layout global).

Crear/usar app/layout.tsx que envuelva todas las páginas. El layout debe contener:

Un navbar con un Link a la lista principal.
Un footer con texto de relleno
En la página principal (la lista):
Obtener la lista desde pokeapi.co usando axios.
Guardar resultados en estado y renderizar
Cada item debe ser una card clickeable que navegue a la ruta dinámica /pokemon/[id]
Utilizar componentes siempre que se pueda
Implementar skeleton para cuando la lista este cargando (puede usar una libreria externa)
En app/pokemon/[name]/page.tsx:

Recibir param y obtener información del Pokémon con axios.
Mostrar nombre y propiedades básicas (sprites, tipos) en la vista de detalle.
Incluir enlace para volver a la lista.

Nota (informativa) sobre la API y paginación:

El endpoint usa paginación con limit y offset. Por ejemplo ?limit=30&offset=0 devuelve los primeros 30; para la siguiente página usar offset=30, luego offset=60, etc.

En esta práctica solo soliciten la primera página (limit=30&offset=0). En una actividad futura se trabajará la paginación con botones “Siguiente”/“Anterior” y el uso de offset.*/ 
import type { ReactNode } from "react";
import Link from "next/link";
import Providers from "./Providers";

export const metadata = {
  title: "Pokédex",
  description: "Lista y detalle de Pokémons",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <nav style={{ padding: 12, borderBottom: "1px solid #e6e6e6", marginBottom: 12 }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 12 }}>
            <Link href="/">Lista</Link>
          </div>
        </nav>

        <Providers>
          <main style={{ maxWidth: 900, margin: "0 auto", padding: 12 }}>{children}</main>
        </Providers>

        <footer style={{ maxWidth: 900, margin: "32px auto", padding: 12, borderTop: "1px solid #e6e6e6", color: "#6b7280" }}>
          <p style={{ margin: 0 }}>Ejemplo de práctica — datos de pokeapi.co</p>
        </footer>
      </body>
    </html>
  );
}
