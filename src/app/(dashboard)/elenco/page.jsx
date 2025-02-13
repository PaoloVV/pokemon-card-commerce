"use client";

import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { useFavorites } from "@/hook/useFavorites";
import { createClient } from "@/utils/supabase/client";
import Card from "@/components/card";

export default function Elenco() {
  const [preferito, setPreferito] = useState({});
  const supabase = createClient();
  //CARICAMENTO DATI
  const [carte, setCarte] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //FAVORITI
  const [user, setUser] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const handlePreferito = (id) => {
    setPreferito((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const apiKey = process.env.NEXT_PUBLIC_POKEMON_API_KEY;
  const config = {
    headers: {
      "X-Api_key": apiKey,
    },
  };
  // RECUPERO DATI
  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`https://api.pokemontcg.io/v2/cards?q=set.id:sv3pt5`, config)

        .then((res) => {
          setCarte(res.data.data.sort((a, b) => a.number - b.number));
        })
        .catch((error) => setError(error))
        .finally(() => {
          setLoading(false);
        });
    };
    getData();
  }, []);

  //recupero user
  //   useEffect(() => {
  //     const getUser = async () => {
  //       const {
  //         data: { user },
  //       } = await supabase.auth.getUser();
  //       setUser(user);
  //     };
  //     getUser();
  //   }, []);
  return (
    <div className="flex flex-col items-center">
      <main>
        <div className="text-center mb-3">
          <h1 className="text-3xl font-bold">Elenco carte</h1>
          <h3 className="font-semibold">Trove le carte che ti mancano!</h3>
        </div>

        {loading && <div>Loading...</div>}
        {!loading && error && <div>{error}</div>}
        {!loading && !error && carte && (
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
            {carte.map((carta) => (
              <Card key={carta.id} carta={carta} />
              //   <div
              //     className="text-black flex flex-col mb-2 gap-2 p-1 rounded-lg items-center cursor-pointer hover:scale-105 hover:border hover:border-gray-400"
              //     key={carta.id}
              //   >
              //     <h3 className="text-lg font-semibold">
              //       {carta.name} - {carta.number}
              //     </h3>
              //     <Image
              //       src={carta.images.small}
              //       alt=""
              //       height={1}
              //       width={100}
              //       style={{ width: "auto" }}
              //     />
              //     <div className="flex flex-col-reverse items-center justify-between gap-1 mb-1">
              //       {/* <button className="border border-black rounded-md p-1">
              //         Aggiungi al Carrello
              //       </button>
              //       <button onClick={() => handlePreferito(carta.id)}>
              //         {preferito[carta.id] ? (
              //           <FaHeart
              //             color="red"
              //             onClick={async () => {
              //               await addFavorite(carta.id);
              //               console.log(favorites);
              //             }}
              //           />
              //         ) : (
              //           <FaRegHeart
              //             color="red"
              //             onClick={async () => {
              //               await addFavorite(carta);
              //               console.log(favorites);
              //             }}
              //           />
              //         )}
              //       </button> */}
              //     </div>
              //   </div>
            ))}
          </div>
        )}
      </main>
      <footer>
        {/* <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a> */}
      </footer>
    </div>
  );
}
