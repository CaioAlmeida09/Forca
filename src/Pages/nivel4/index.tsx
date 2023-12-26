import { useState, useEffect } from "react";

import { Header } from "../../Components/Header";
import { useRef } from "react";
import Swal from "sweetalert2";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { RiQuestionnaireLine } from "react-icons/ri";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import Exemplo from "../../assets/Exemplo1.jpg";
import { useNavigate } from "react-router-dom";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

// https://sweetalert2.github.io/#download

export function Nivel4() {
  const navigate = useNavigate();
  const [palavraAleatoria, setPalavraAleatoria] = useState<string | null>(null);
  const [palavraAleatoria2, setPalavraAleatoria2] = useState<string | null>(
    null
  );
  const [resposta, setResposta] = useState<string>("");
  const [tentativas, setTentativas] = useState(1);
  const [header, setHeader] = useState(true);
  const [interrogation, setInterrogation] = useState(false);
  const [PrimeiroAcerto, setPrimeiroAcerto] = useState(false);
  const [SegundoAcerto, setSegundoAcerto] = useState(false);
  const [ganhou, setGanhou] = useState(false);
  const [dica, setDica] = useState(false);
  const [numberIndice1, setNumberIndice1] = useState<number>();
  const [numberIndice2, setNumberIndice2] = useState<number>();

  const [HistoricoPalavras, setHistoricoPalavras] = useState<
    Record<string, string | null>[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const palavras = [
    { palavra: "apple", dica: "fruta" },
    { palavra: "house", dica: "casa" },
    { palavra: "table", dica: "mesa" },
    { palavra: "music", dica: "música" },
    { palavra: "earth", dica: "terra" },
    { palavra: "river", dica: "rio" },
    { palavra: "cloud", dica: "nuvem" },
    { palavra: "happy", dica: "feliz" },
    { palavra: "smart", dica: "inteligente" },
    { palavra: "ocean", dica: "oceano" },
  ];
  useEffect(() => {
    // sorteio 1
    const indiceAleatorio = Math.floor(Math.random() * palavras.length);
    setNumberIndice1(indiceAleatorio);
    const novaPalavraAleatoria = palavras[indiceAleatorio].palavra;
    setPalavraAleatoria(novaPalavraAleatoria);

    // sorteio 2
    const indiceAleatorio2 = Math.floor(Math.random() * palavras.length);
    setNumberIndice2(indiceAleatorio2);
    const novaPalavraAleatoria2 = palavras[indiceAleatorio2].palavra;
    setPalavraAleatoria2(novaPalavraAleatoria2);

    setTimeout(() => {
      inputRef.current && inputRef.current.focus();
    }, 0);
  }, []);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, [resposta]);

  useEffect(() => {
    if (PrimeiroAcerto && SegundoAcerto) {
      setGanhou(true);
    }
  }, [PrimeiroAcerto, SegundoAcerto]);

  useEffect(() => {
    if (ganhou) {
      Swal.fire({
        title: "Parabéns",
        text: "Você Conseguiu",
        icon: "success",
        showConfirmButton: true,
        allowOutsideClick: false,
      });
      navigate("/nivel3");
    }
  });
  //

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
    console.log(palavraAleatoria);
    console.log(palavraAleatoria2);

    const obj: Record<string, string | null> = {
      word: resposta,
      l1: null,
      l2: null,
      l3: null,
      l4: null,
      l5: null,
    };
    const RespostaSoletrada = resposta.toUpperCase().split("");
    const PalavraAleatoriaSoletrada = palavraAleatoria?.toUpperCase().split("");
    const PalavraAleatoriaSoletrada2 = palavraAleatoria2
      ?.toUpperCase()
      .split("");

    if (PalavraAleatoriaSoletrada && PalavraAleatoriaSoletrada2) {
      RespostaSoletrada.map((item, index) => {
        if (item === PalavraAleatoriaSoletrada[index]) {
          obj[GetIndex(index + 1)] = "posicaoCorreta";
        } else if (item === PalavraAleatoriaSoletrada2[index]) {
          obj[GetIndex(index + 1)] = "posicaoCorreta2";
        } else if (PalavraAleatoriaSoletrada.includes(item)) {
          obj[GetIndex(index + 1)] = "LetraCorretaPosicaoIncorreta";
        } else if (PalavraAleatoriaSoletrada2.includes(item)) {
          obj[GetIndex(index + 1)] = "LetraCorretaPosicaoIncorreta2";
        } else {
          obj[GetIndex(index + 1)] = "errado";
        }
      });

      if (RespostaSoletrada.join("") === PalavraAleatoriaSoletrada.join("")) {
        setPrimeiroAcerto(true);
      }
      if (RespostaSoletrada.join("") === PalavraAleatoriaSoletrada2.join("")) {
        setSegundoAcerto(true);
      }

      if (tentativas > 5 && !ganhou) {
        Swal.fire({
          title: "Que Pena...",
          text: "Você não conseguiu dessa vez.",
          icon: "error",
          color: "#ff7b5a",
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

  function Arrow() {
    if (header === false) {
      setHeader(true);
    }
    if (header === true) setHeader(false);

    setTimeout(() => {
      inputRef.current && inputRef.current.focus();
    }, 30);
  }

  function interrogationFunction() {
    if (interrogation === false) {
      setInterrogation(true);
    }
    if (interrogation === true) {
      setInterrogation(false);
    }
    setTimeout(() => {
      inputRef.current && inputRef.current.focus();
    }, 30);
  }
  function HandleDica() {
    if (dica === false) {
      setDica(true);
    }
    if (dica === true) {
      setDica(false);
    }
  }
  return (
    <>
      {header === true ? <Header /> : <div></div>}
      <div className="bg-blue-950 w-full h-screen flex flex-col justify-start items-center p-5 ">
        <section className="flex justify-between items-start w-full md:max-w-sm">
          {header === true ? (
            <button onClick={Arrow}>
              <FaRegArrowAltCircleUp size={30} color="#fff" />
            </button>
          ) : (
            <button onClick={Arrow}>
              {" "}
              <FaRegArrowAltCircleDown size={30} color="#fff" />
            </button>
          )}
          <button onClick={interrogationFunction}>
            {" "}
            <RiQuestionnaireLine size={30} color="#fff" />{" "}
          </button>
        </section>
        {interrogation === true ? (
          <>
            <div className=" w-full md:max-w-sm absolute mt-10 h-auto bg-gray-700 p-6 rounded-lg shadow-md flex flex-col items-center">
              <h1 className="text-2xl font-bold mb-4">Como Jogar?</h1>
              <h2 className="text-lg font-semibold mb-2 mx-auto">
                Nível 4 - Inglês
              </h2>
              <h2 className="text-lg font-semibold mb-2 mx-auto">
                Você precisa acertar
                <span className="font-bold"> duas </span> palavras
              </h2>
              <ul className="text-lg font-medium list-disc pl-6">
                <li>
                  {" "}
                  O estilo do Jogo pernamence, mas dessa vez a palavra são
                  sorteadas duas palavras inglês. Foi adicionado a opção de
                  dica, que deixa uma dica da palavra em português para lhe
                  ajudar no desafio.
                </li>
                <li>
                  Digite uma palavra. Ao final de cada tentativa, o sistema te
                  mostra o quão perto você está de resolver o enigma.
                </li>
                <li>
                  Se a letra estiver dentro da palavra, mas em outra posição, a
                  cor da letra será amarela. Se a letra estiver na posição
                  correta, a cor será verde, e se a letra não existir na
                  palavra, a cor será vermelha.
                </li>
                {/* Adicione aqui mais itens conforme necessário */}
              </ul>
              <img className="my-4 rounded-lg" src={Exemplo} alt="Exemplo" />
              <button
                className=" px-3 py-2 bg-white text-lg text-green-400 rounded-lg mt-2 hover:bg-green-400 hover:text-black"
                onClick={interrogationFunction}
              >
                {" "}
                vamos começar
              </button>
            </div>
          </>
        ) : null}

        <input
          ref={inputRef}
          className="opacity-0 md:disabled:"
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
        />
        <div className="flex gap-4">
          {inputs.map((item, index) => (
            <div
              key={item}
              className={`bg-gray-800 flex justify-center h-9 w-10 items-center rounded-full text-white text-lg text-center `}
            >
              <p> {resposta[index]} </p>
            </div>
          ))}
        </div>
        <div className="flex justify-between max-w-sm items-center">
          <section className="bg-blue-950 w-full flex flex-col justify-start items-center mt-4 mb-8 px-3">
            {HistoricoPalavras.map((item, index) => (
              <div key={index} className="flex gap-1 mt-4">
                {item.word &&
                  item.word.split("").map((letra, letraIndex) => (
                    <div
                      className={`h-7 w-8 rounded-lg flex justify-center items-center text-lg ${
                        item[GetIndex(letraIndex + 1)] === "posicaoCorreta"
                          ? "bg-green-500"
                          : item[GetIndex(letraIndex + 1)] ===
                            "LetraCorretaPosicaoIncorreta"
                          ? "bg-yellow-500"
                          : PrimeiroAcerto === true
                          ? "bg-green-500 text-green-500"
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
          <button
            className="flex justify-center items-start gap-3 text-lg text-white mt-2 mb-2"
            onClick={HandleDica}
          >
            {" "}
            Ver Dica: <MdOutlineTipsAndUpdates size={30} color="#ffff00" />
          </button>
          {dica &&
            palavraAleatoria &&
            numberIndice1 &&
            numberIndice2 !== undefined && (
              <div
                className="px-4 py-4 rounded-lg bg-yellow-400 flex justify-center items-center text-2xl"
                key={numberIndice1}
              >
                <p>{palavras[numberIndice1]?.dica}</p>
                <p>{palavras[numberIndice2]?.dica}</p>
              </div>
            )}
          <section className="bg-blue-950 w-full flex flex-col justify-start items-center mt-4 mb-8 px-3">
            {HistoricoPalavras.map((item, index) => (
              <div key={index} className="flex gap-1 mt-4">
                {item.word &&
                  item.word.split("").map((letra, letraIndex) => (
                    <div
                      className={`h-7 w-8 rounded-lg flex justify-center items-center text-lg ${
                        item[GetIndex(letraIndex + 1)] === "posicaoCorreta2"
                          ? "bg-green-500"
                          : item[GetIndex(letraIndex + 1)] ===
                            "LetraCorretaPosicaoIncorreta2"
                          ? "bg-yellow-500"
                          : SegundoAcerto === true
                          ? "bg-green-500 "
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
        </div>
        <p className="text-lg text-white ">
          {" "}
          Tentativa: <span className="text-blue-300"> {tentativas} </span>{" "}
        </p>
        <button
          className="bg-green-400 py-2 px-3 mt-5 rounded-lg"
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
