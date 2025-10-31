import { NextResponse } from "next/server";
import { db } from "../../lib/database";

export async function GET() {
    try {
    const pokemones = await db.getAll();
    return NextResponse.json(pokemones, { status: 200 });
    } catch (error) {
    return NextResponse.json(
        { error: "Error al obtener pokemones" },
        { status: 500 }
    );
    }
}
export async function POST(request: Request) {
    try {
    const body = await request.json();

    // Validaciones
    const id = typeof body?.id === "number" ? body.id : Number(body?.id);
    if (!Number.isFinite(id) || id <= 0) {
        return NextResponse.json(
            { error: "ID inválido" },
            { status: 400 }
        );
    }

    const newPokemon = await db.create({
        name: body.name,
        sprites: { front_default: body.sprites?.front_default || null },
        types: body.types?.map(type => ({ type: { name: type.name } })),
        height: body.height,
        weight: body.weight,
    });

    return NextResponse.json(newPokemon, { status: 201 });
    } catch (error) {
        if (error.message === "conflict") {
        return NextResponse.json({ error: "Ya existe en favoritos" }, { status: 409 });
        }
        return NextResponse.json(
        { error: "Error al crear Pokémon" },
        { status: 500 }
        );
    }
}
