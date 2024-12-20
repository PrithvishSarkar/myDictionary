import { useState, useEffect } from "react";
import "../src/tailwind.css";

function OutputBox({ searchQuery, toggleValue }) {
  // The 'data' contains the information about the searched word
  const [data, setData] = useState(null);

  // A Side Effect is run to fetch the searched word information
  // Side Effect runs to handle an API call
  // The Side Effect runs only when the 'searchQuery' changes
  useEffect(() => {
    const fetchData = async (searchQueryString) => {
      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${searchQueryString}`
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

    // Intensional Delay to create an illusion of Data Fetching
    // The Data Fetching Time is between 500ms to 1000ms
    // Total Time to fetch data is between '1 second' to '1.5 seconds'
    setTimeout(() => fetchData(searchQuery), 500);
  }, [searchQuery]);

  // A Side Effect runs whenever the 'toggleValue' changes
  // The Side Effect makes the 'data' to vanish and sets it to 'null'
  // This Side Effect is required to give the user an illusion of Data Fetching
  useEffect(() => {
    setData(null);
  }, [toggleValue]);

  //A Spin Wheel Loader is displayed if 'data === null'
  if (!data)
    return (
      <p
        className="rounded-[50%] border-4 border-t-rose-800 border-l-rose-800
        border-r-transparent border-b-transparent min-w-16 min-h-16 animate-circle"
      ></p>
    );

  // Actual Output Box is displayed if 'data !== null'
  return (
    <section
      className="bg-gray-200
    text-center p-4
    max-w-[95%] md:grow lg:max-w-[40%]
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
        onClick={() => window.open(data.sourceUrls[0], "_blank")}
      >
        Learn More
      </button>
    </section>
  );
}

export { OutputBox };
