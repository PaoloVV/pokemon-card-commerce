"use server";

import { createClient } from "./server";

const supabase = createClient();

export async function getFavorites(userId) {
  const { data, error } = await supabase
    .from("favorites")
    .select("product_id")
    .eq("user_id", userId);

  if (error) {
    console.error("Errore nel recupero dei preferiti:", error);
    return [];
  }

  return data.map((fav) => fav.product_id);
}

export async function addFavorite(userId, productId) {
  const { error } = await supabase
    .from("favorites")
    .insert([{ user_id: userId, product_id: productId }]);

  if (error) {
    console.error("Errore nell'aggiunta ai preferiti:", error);
  }
}

export async function removeFavorite(userId, productId) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("produt_id", productId);

  if (error) {
    console.error("Errore nella rimozione dei preferiti:", error);
  }
}
