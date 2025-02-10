"use client";

import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";

export default function Elenco() {
  const [espansioni, setEspansioni] = useState(null);
  const [preferito, setPreferito] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`https://api.pokemontcg.io/v2/cards?q=set.id:sv3pt5`, config)
        .then((res) => {
          setEspansioni(res.data.data);
        })
        .catch((error) => setError(error))
        .finally(() => {
          setLoading(false);
        });
    };
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <main>
        <div className="text-center mb-3">
          <h1 className="text-3xl font-bold">Elenco carte</h1>
          <h3 className="font-semibold">Trove le carte che ti mancano!</h3>
        </div>

        {loading && <div>Loading...</div>}
        {!loading && error && <div>{error}</div>}
        {!loading && !error && espansioni && (
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
            {espansioni.map((espansione) => (
              <div
                className="text-black flex flex-col mb-2 gap-2 p-1 rounded-lg items-center cursor-pointer hover:scale-105 hover:border hover:border-gray-400"
                key={espansione.id}
              >
                <h3 className="text-lg font-semibold">
                  {espansione.name} - {espansione.number}
                </h3>
                <Image
                  src={espansione.images.small}
                  alt=""
                  height={1}
                  width={100}
                  style={{ width: "auto" }}
                />
                <div className="flex flex-col-reverse items-center justify-between gap-1 mb-1">
                  <button className="border border-black rounded-md p-1">
                    Aggiungi al Carrello
                  </button>
                  <button onClick={() => handlePreferito(espansione.id)}>
                    {preferito[espansione.id] ? (
                      <FaHeart color="red" />
                    ) : (
                      <FaRegHeart color="red" />
                    )}
                  </button>
                </div>
              </div>
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
