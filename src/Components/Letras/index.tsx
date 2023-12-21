import { useState, useEffect } from "react";
import { Header } from "../Header";
import { useRef } from "react";
import Swal from "sweetalert2";

// https://sweetalert2.github.io/#download

export function Letras() {
  const [palavraAleatoria, setPalavraAleatoria] = useState<string | null>(null);
  const [resposta, setResposta] = useState<string>("");
  const [tentativas, setTentativas] = useState(1);
  const [todosCorreto, setTodosCorreto] = useState(false);
  const [HistoricoPalavras, setHistoricoPalavras] = useState<
    Record<string, string | null>[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const palavras = ["MOELA", "FILHO", "GALHO", "CARGO", "FALSO"];

  useEffect(() => {
    const indiceAleatorio = Math.floor(Math.random() * palavras.length);
    const novaPalavraAleatoria = palavras[indiceAleatorio];
    setPalavraAleatoria(novaPalavraAleatoria);
    setTimeout(() => {
      inputRef.current && inputRef.current.focus();
    }, 0);
  }, []);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, [resposta]);

  const Letras = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  // adicionei o Record
  async function HandleResposta() {
    const obj: Record<string, string | null> = {
      word: resposta,
      l1: null,
      l2: null,
      l3: null,
      l4: null,
      l5: null,
    };
    const RespostaSoletrada = resposta.toUpperCase().split("");
    console.log(RespostaSoletrada);
    const PalavraAleatoriaSoletrada = palavraAleatoria?.toUpperCase().split("");
    console.log(PalavraAleatoriaSoletrada);

    if (PalavraAleatoriaSoletrada) {
      RespostaSoletrada.map((item, index) => {
        if (item === PalavraAleatoriaSoletrada[index]) {
          obj[GetIndex(index + 1)] = "posicaoCorreta";
          setTodosCorreto(true);
        } else if (PalavraAleatoriaSoletrada.includes(item)) {
          obj[GetIndex(index + 1)] = "LetraCorretaPosicaoIncorreta";
          setTodosCorreto(false);
        } else {
          obj[GetIndex(index + 1)] = "errado";
          setTodosCorreto(false);
        }
      });
    }
    if (todosCorreto === true) {
      Swal.fire({
        title: "Parabens",
        text: "Você Conseguiu",
        icon: "success",
      });
    }
    if (tentativas > 5 && todosCorreto === false) {
      Swal.fire({
        title: "Que Pena",
        text: "Você não conseguiu dessa vez",
        icon: "error",
      });
    }
    // transformei em uma função pra poder rendereizar
    setHistoricoPalavras((prevHistorico) => {
      const novoHistorico = [...prevHistorico, obj];
      console.log(novoHistorico);
      setTentativas(tentativas + 1);
      setResposta("");
      setTimeout(() => {
        inputRef.current && inputRef.current.focus();
      }, 30);

      return novoHistorico;
    });
  }

  function GetIndex(index: number): string {
    if (index === 1) return "l1";
    if (index === 2) return "l2";
    if (index === 3) return "l3";
    if (index === 4) return "l4";
    return "l5";
  }

  const inputs = [1, 2, 3, 4, 5];
  function HandleLetra(item: string) {
    setResposta(resposta + item);
  }

  return (
    <>
      <Header />
      <div className="bg-black w-full h-screen flex flex-col justify-start items-center p-5">
        <input
          ref={inputRef}
          className="opacity-0"
          autoFocus
          value={resposta}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (/^[a-zA-Z]*$/.test(inputValue) && inputValue.length <= 5) {
              setResposta(inputValue.toUpperCase());
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              HandleResposta();
              inputRef.current && inputRef.current.focus();
            }
          }}
          // style={{ display: "none" }}
        />
        <div className="flex gap-4">
          {inputs.map((item, index) => (
            <div
              key={item}
              className={`bg-gray-800 flex justify-center h-10 w-11 items-center rounded-full text-white text-2xl text-center `}
            >
              <p> {resposta[index]} </p>
            </div>
          ))}
        </div>
        <section className="bg-black w-full flex flex-col justify-start items-center mt-4 mb-8 px-5">
          {HistoricoPalavras.map((item, index) => (
            <div key={index} className="flex gap-4 mt-4">
              {item.word &&
                item.word.split("").map((letra, letraIndex) => (
                  <div
                    className={`h-9 w-10 rounded-lg flex justify-center items-center text-lg ${
                      item[GetIndex(letraIndex + 1)] === "posicaoCorreta"
                        ? "bg-green-500"
                        : item[GetIndex(letraIndex + 1)] ===
                          "LetraCorretaPosicaoIncorreta"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    <p key={letraIndex} style={{ margin: 0 }}>
                      {letra}
                    </p>
                  </div>
                ))}
            </div>
          ))}
        </section>
        <p className="text-lg text-white ">
          {" "}
          Tentativa: <span className="text-blue-300"> {tentativas} </span>{" "}
        </p>
        <button
          className="bg-green-400 py-2 px-3 mt-5 hover:bg-green-800 rounded-lg"
          onClick={() => {
            HandleResposta();
            inputRef.current && inputRef.current.focus();
          }}
        >
          Verificar resposta
        </button>
        <section className="grid grid-cols-6 gap-2 mt-8 w-71">
          {Letras.map((item) => (
            <button
              key={item}
              onClick={() => HandleLetra(item)}
              className={`flex justify-center items-center rounded-full h-9 w-9 text-white p-1 ${
                HistoricoPalavras.some((historicoItem) =>
                  historicoItem.word?.toUpperCase().includes(item)
                )
                  ? "bg-gray-800"
                  : "bg-gray-500"
              }`}
            >
              {item}
            </button>
          ))}
        </section>
      </div>
    </>
  );
}
