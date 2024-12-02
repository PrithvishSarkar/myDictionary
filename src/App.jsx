import "./tailwind.css";
import { useState, useEffect } from "react";

function Container({ query, updateQuery }) {
  const [outputDisplay, setOutputDisplay] = useState(false);
  return (
    <section
      className="min-h-[100vh] min-w-[100%] p-4
    flex flex-col items-center justify-evenly gap-4 lg:flex-row container"
    >
      <InputBox updateQuery={updateQuery} updateDisplay={setOutputDisplay} />
      {outputDisplay && <OutputBox query={query} />}
    </section>
  );
}

function InputBox({ updateQuery, updateDisplay }) {
  const [userInput, setUserInput] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (userInput === "") {
        alert("Input cannot be empty!");
      } else {
        updateQuery(userInput);
        updateDisplay(true);
        setUserInput("");
      }
    }
  };
  return (
    <section
      className="bg-gray-200
    p-4 text-center max-w-[95%] max-h-[90%] lg:max-w-[40%]
    border-solid border-2 border-gray-200 rounded-2xl
    flex flex-col items-stretch justify-center gap-4
    input-box"
    >
      <img
        src="./dictionary_image.png"
        alt="Dictionary Image"
        className="object-cover max-w-[80%] self-center input-box-image"
      />
      <p data-type="introduction">
        <span className="text-[2rem] font-mono font-bold text-indigo-800">
          Dictionary!
        </span>{" "}
        <br />
        <span className="text-[1rem] md:text-[2rem] font-serif font-light text-gray-500">
          ..in search of meaning
        </span>
      </p>
      <p className="text-base font-cursive italic text-gray-400 input-box-paragraph">
        Find the meaning within seconds!
        <br />
        (Hit the 'Enter' key after typing)
      </p>
      <input
        type="search"
        placeholder="Enter Word"
        autoFocus={true}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-[url('/magnifying_glass.png')] bg-contain bg-left bg-no-repeat
        py-1 pl-10
        font-serif text-xl text-indigo-900
        border-none outline-none hover:ring-2 hover:ring-sky-400 rounded-lg"
      />
    </section>
  );
}

function OutputBox({ query }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async (queryString) => {
      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${queryString}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const jsonResponse = await response.json();
        setData(jsonResponse[0]);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchData(query);
  }, [query]);
  if (!data)
    return (
      <p
        className="rounded-[50%] border-x-4 border-x-orange-700
        min-w-16 min-h-16
        animate-circle"
      ></p>
    );
  return (
    <section
      className="bg-gray-200
    text-center p-4
    max-w-[95%] max-h-[90%] lg:max-w-[40%]
    border-solid border-2 border-gray-200 rounded-2xl
    flex flex-col items-stretch justify-center gap-4
    font-serif text-base output-box"
    >
      <p
        className="bg-gradient-to-r from-indigo-800 to-indigo-900 py-2
      rounded-lg
      text-gray-100 font-black
      -skew-x-6"
      >
        Word: {data.word}
      </p>
      {data.meanings.map((meaning, index) => (
        <section
          key={index}
          className="py-2 text-left border-t-2 output-box-meaning"
        >
          <p className="font-bold text-gray-600">
            Part of Speech: {meaning.partOfSpeech}
          </p>
          {meaning.definitions.map((definitionObject, index) => (
            <p
              key={index}
              className="m-4 mr-0 p-1 border-l-2 border-gray-500 italic"
            >
              {definitionObject.definition}
            </p>
          ))}
        </section>
      ))}
      <button
        type="button"
        className="border-none rounded-lg
        bg-indigo-900
        text-gray-100
        px-4 py-2
        font-bold
        self-center
        cursor-pointer"
        onClick={() => window.open(data.sourceUrls[0])}
      >
        Learn More
      </button>
    </section>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  return <Container query={query} updateQuery={setQuery} />;
}
