import Link from "next/link";
import type { ReactNode } from "react";
import Providers from "./Providers";

export const metadata = {
  title: "Pokédex",
  description: "Lista y detalle de Pokémons",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <nav style={{ padding: 12 }}>
          <Link href="/">Lista</Link>
        </nav>

        <Providers>
          <main style={{ maxWidth: 900, margin: "0 auto", padding: 12 }}>{children}</main>
        </Providers>

        <footer style={{ padding: 12, marginTop: 24 }}>Pokemones — práctica</footer>
      </body>
    </html>
  );
}
