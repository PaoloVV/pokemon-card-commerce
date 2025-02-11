import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export const useFavorites = (user) => {
  const [favorites, setFavorites] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    const { data, error } = await supabase
      .from("favorites")
      .select("item_id")
      .eq("user_id", user.id);

    if (!error) {
      setFavorites(data.map((fav) => fav.item_id));
    }
  };

  const addFavorite = async (itemId) => {
    if (!user) return;

    const { error } = await supabase
      .from("favorites")
      .insert([{ user_id: user.id, item_id: itemId }]);
    if (!error) {
      setFavorites([...favorites, itemId]);
    }
  };

  const removeFavorite = async (itemId) => {
    if (!user) return;

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("item_id", itemId);

    if (!error) {
      setFavorites(favorites.filter((fav) => fav !== itemId));
    }
  };

  return { favorites, addFavorite, removeFavorite };
};
