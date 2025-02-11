import { createClient } from "@/utils/supabase/client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//supabase
const supabase = createClient();

//Thunk per caricare i preferiti dell'utente
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (userId) => {
    const { data, error } = await supabase
      .from("favorites")
      .select("card_id")
      .eq("user_id", userId);

    if (error) throw error;
    return data.map((item) => item.card_id);
  }
);

//Thunk per aggiungere o rimuovere una carta dai preferiti
export const toggleFavorite = createAsyncThunk(
  "favorites/toggleFavorites",
  async ({ userId, cardId }, { getState }) => {
    const { favorites } = getState();

    if (favorites.list.includes(cardId)) {
      //Se la carta è già nei preferiti, la rimuoviamo
      await supabase
        .from("favorites")
        .delete()
        .match({ user_id: userId, card_id: cardId });
      return favorites.list.filter((id) => id !== cardId);
    } else {
      //Altrimenti la aggiungiamo
      await supabase
        .from("favorites")
        .insert([{ user_id: userId, card_id: cardId }]);
      return [...favorites.list, cardId];
    }
  }
);

//slice redux
export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    list: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  },
});

export const favoriteReducer = favoritesSlice.reducer;
