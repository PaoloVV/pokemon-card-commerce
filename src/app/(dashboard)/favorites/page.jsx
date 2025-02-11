"use client";

import { fetchFavorites } from "@/store/favoritesSlice";
import { useSession } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.list);
  const session = useSession();

  useEffect(() => {
    if (session?.user) {
      dispatch(fetchFavorites(session.user.id));
    }
  }, [session, dispatch]);

  return (
    <div>
      <h1>Le tue carte preferite</h1>
      <ul>
        {favorites.map((cardId) => (
          <li key={cardId}>{cardId}</li>
        ))}
      </ul>
    </div>
  );
}
