import { toggleFavorite } from "@/store/favoritesSlice";
import { useSession } from "@supabase/auth-helpers-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

export default function Card({ carta }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.list);
  const session = useSession();

  const isFavorite = favorites.includes(carta.id);

  const handleToggleFavorite = () => {
    if (!session?.user) {
      alert("Devi effettuare il login per aggiungere ai prefeiti");
      return;
    }
    dispatch(toggleFavorite({ userId: session.user.id, cardId: carta.id }));
  };

  return (
    <div className="text-black flex flex-col mb-2 gap-2 p-1 rounded-lg items-center cursor-pointer hover:scale-105 hover:border hover:border-gray-400">
      <h3 className="text-lg font-semibold">{carta.name}</h3>
      <Image
        src={carta.images.small}
        alt=""
        height={1}
        width={100}
        style={{ width: "auto" }}
      />
      <button onClick={handleToggleFavorite}>
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
  );
}
