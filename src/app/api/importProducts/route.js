import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
const apiKey = process.env.NEXT_PUBLIC_POKEMON_API_KEY;

//Funzione per recuperare i prodotti api esterna
const config = {
  headers: {
    "X-Api_key": apiKey,
  },
};

async function fetchCards() {
  const res = await axios.get(
    `https://api.pokemontcg.io/v2/cards?q=set.id:sv3pt5`,
    config
  );
  const products = await res.data.data;
  return products.map((p) => ({
    name: p.name,
    price: 10,
    description: `${p.set.series} - ${p.set.name}`,
    number: p.number,
    image_url: p.images.small,
  }));
}

//API route per importare le carte su supabase
export async function GET() {
  try {
    const products = await fetchCards();

    const { error } = await supabase.from("products").insert(products);
    if (error) throw error;

    return NextResponse.json({ message: "Prodotti importati con successo!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
