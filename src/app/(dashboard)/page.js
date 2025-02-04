"use client";

import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [espansioni, setEspansioni] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_POKEMON_API_KEY;
  const config = {
    headers: {
      "X-Api_key": apiKey,
    },
  };

  // useEffect(() => {
  //   const getData = async () => {
  //     const res = await axios.get(`https://api.pokemontcg.io/v2/sets/`, config);
  //     console.log(res.data.data);
  //     setEspansioni(res.data.data);
  //   };
  //   getData();
  // }, []);
  return (
    <div className="flex flex-col items-center">
      <main>
        <h1 className="text-3xl font-bold text-center">Homepage</h1>
        {espansioni &&
          espansioni.map((espansione) => (
            <div className="text-black" key={espansione.id}>
              {espansione.name}
            </div>
          ))}
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
