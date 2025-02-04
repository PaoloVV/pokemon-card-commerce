"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signupAction } from "./registerAction";

const initialState = {
  message: "",
};

export default function Register() {
  const [state, formAction] = useActionState(signupAction, initialState);
  return (
    <div className="px-8 py-6 bg-white rounded-md max-w-md md:min-w-96 flex flex-col items-center">
      <h1 className="font-bold text-center text-4xl">Registrati</h1> <p>o</p>
      <Link
        href="/"
        className="rounded-md bg-white text-red-700 self-center text-sm font-semibold mb-4"
      >
        torna alla HOME
      </Link>
      <form className="flex flex-col items-center gap-5">
        {/* EMAIL */}
        <div className="mb-3">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Inserisci la tua mail"
            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300"
          />
        </div>
        {/* PASSWORD */}
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300"
          />
        </div>
        {/* CONFIRM PASSWORD */}
        <div className="mb-3">
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Conferma la password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="Ripeti password"
            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300"
          />
        </div>
        <div className="self-end flex justify-end items-center gap-4">
          <p className="text-xs text-gray-500">Sei già registrato?</p>{" "}
          <Link
            href="/login"
            className="text-black text-sm hover:underline hover:font-semibold"
          >
            Accedi
          </Link>
        </div>
        {/* SUBMIT */}
        <div>
          <button
            type="submit"
            formAction={formAction}
            className="font-semibold ring-1 p-2 rounded-md ring-black bg-red-200 hover:bg-red-600 hover:text-white"
          >
            Registrati
          </button>
          <div className="text-green-700">{state.message}</div>
          <div className="text-red-700">{state.error}</div>
        </div>
      </form>
    </div>
  );
}
