import { useState, useEffect } from "react";
import { DefinitionsBox } from "./DefinitionsBox.jsx";
import { SynonymsBox } from "./SynonymsBox.jsx";
import { AntonymsBox } from "./AntonymsBox.jsx";
import { SearchHistoryBox } from "./SearchHistoryBox.jsx";
import { Button } from "./Button.jsx";
import "../src/tailwind.css";

function OutputBox({ searchQuery, toggleValue, updateShowDeleteDataModal }) {
  // The 'definition' contains the definition about the searched word
  const [definition, setDefinition] = useState(null);
  // The 'theasurus' State Variable contains 'synonyms' and 'antonyms'
  // The 'synonyms' contains similar words related to the searched word
  // The 'antonyms' contains opposite words related to the searched word
  const [thesaurus, setThesaurus] = useState(null);

  /*
  The 'boxNumber' identifies each Box uniquely
  0 => DefinitionsBox
  1 => SynonymsBox
  2 => AntonymsBox
  3 => SearchHistoryBox
  */
  const [boxNumber, setBoxNumber] = useState(0);

  // A Side Effect is run to fetch the searched word information
  // Side Effect runs to handle an API call
  // The Side Effect runs only when the 'searchQuery' changes
  useEffect(() => {
    // Function to fetch word definition
    const fetchDefinition = async (searchQueryString) => {
      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${searchQueryString}`
        );
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const objectResponse = await response.json();
        setDefinition(objectResponse[0]);
      } catch (err) {
        alert(err.message);
      }
    };

    // Function to fetch word synonyms and antonyms
    const fetchThesaurus = async (searchQueryString) => {
      try {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/thesaurus?word=${searchQueryString}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-Api-Key": import.meta.env.VITE_THESAURUS_API_KEY,
            },
          }
        );
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const objectResponse = await response.json();
        setThesaurus({
          synonyms: objectResponse.synonyms,
          antonyms: objectResponse.antonyms,
        });
      } catch (err) {
        alert(err.message);
      }
    };

    // Intensional Delay to create an illusion of definition Fetching
    // The definition Fetching Time is between 500ms to 1000ms
    // The thesurus Fetching Time is between 900ms to 1400ms
    // Total Time to fetch definition is between '1.5 second' to '2.5 seconds'
    setTimeout(() => {
      fetchDefinition(searchQuery);
      fetchThesaurus(searchQuery);
    }, 100);
  }, [searchQuery]);

  // A Side Effect runs whenever the 'toggleValue' changes
  // The Side Effect makes the 'definition & thesaurus' to vanish and sets them to 'null'
  // The Side Effect makes 'boxNumber = 0' making the DefinitionsBox to display first
  // This Side Effect is required to give the user an illusion of Data Fetching
  useEffect(() => {
    setDefinition(null);
    setThesaurus(null);
    setBoxNumber(0);
  }, [toggleValue]);

  //A Spin Wheel Loader is displayed if 'definition === null or thesaurus === null'
  if (!definition || !thesaurus)
    return (
      <p
        className="rounded-[50%] border-4 border-white border-b-rose-800 
        min-w-16 min-h-16 animate-circle"
      ></p>
    );

  // Actual Output Box is displayed if 'definition !== null or thesaurus !== null'
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
        rounded-lg text-gray-100 font-black -skew-x-6"
      >
        Word: {definition.word}
      </p>
      {boxNumber === 0 && <DefinitionsBox definition={definition} />}
      {boxNumber === 1 && <SynonymsBox synonyms={thesaurus.synonyms} />}
      {boxNumber === 2 && <AntonymsBox antonyms={thesaurus.antonyms} />}
      {boxNumber === 3 && (
        <SearchHistoryBox
          updateShowDeleteDataModal={updateShowDeleteDataModal}
        />
      )}
      <section className="grid grid-cols-2 gap-2">
        <Button onClick={() => window.open(definition.sourceUrls[0], "_blank")}>
          Learn More
        </Button>
        <Button onClick={() => setBoxNumber(0)}>Definitions</Button>
        <Button onClick={() => setBoxNumber(1)}>Synonyms</Button>
        <Button onClick={() => setBoxNumber(2)}>Antonyms</Button>
        <Button
          onClick={() => setBoxNumber(3)}
          className={"col-start-1 col-end-3"}
        >
          Get Your Search History
        </Button>
      </section>
    </section>
  );
}

export { OutputBox };
