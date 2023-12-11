import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.jpg";
import { useState } from "react";

export function Home() {
  const [name, setName] = useState<string>();
  const navigate = useNavigate();

  function HandleName() {
    navigate("/easy", { state: { name } });
  }
  return (
    <main className="flex flex-col bg-black w-full h-screen items-center md:p-8 p-6">
      <h1 className=" text-white md:text-4xl text-2xl font-medium ">
        Seja Bem Vindo ao Jogo da Forca
      </h1>
      <img className=" mt-8 rounded-md" src={Logo} alt="logo" />
      <section className="flex flex-col gap-4 mt-8 max-w-3xl w-full p-6 h-30">
        <label className="text-xl font-medium text-zinc-100">
          Digite seu nome:
        </label>
        <input
          className=" w-full h-10 p-2"
          onChange={(e) => setName(e.target.value)}
        />
      </section>
      <button
        onClick={HandleName}
        className="mt-5  py-2 px-3 rounded-lg bg-gray-300 hover:bg-green-800 hover:text-white"
      >
        Comece o jogo
      </button>
    </main>
  );
}
