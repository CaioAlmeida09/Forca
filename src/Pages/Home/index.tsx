import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  function HandleName(event: React.FormEvent) {
    event.preventDefault();
    navigate("/nivel1", { state: { name } });
  }

  return (
    <main className="flex flex-col items-center p-8 bg-black h-screen">
      <h1 className="text-lg md:text-4xl font-medium text-white">
        Seja Bem Vindo ao Jogo da Forca
      </h1>

      <form
        onSubmit={HandleName}
        className="flex flex-col max-w-3xl w-full p-6 mt-8 gap-4"
      >
        <label className="text-xl font-medium text-zinc-100">
          Digite seu nome:
        </label>
        <input
          className="w-full h-10 p-2"
          onChange={(e) => setName(e.target.value)}
        />

        <button
          type="submit"
          className="mt-5 py-2 px-3 rounded-lg bg-gray-500 hover:bg-green-800 hover:text-white w-36 m-auto"
        >
          Comece o jogo
        </button>
      </form>
    </main>
  );
}
