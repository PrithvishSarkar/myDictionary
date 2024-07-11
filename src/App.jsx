import './App.css';
import { useState, useEffect } from 'react';

function Container({ query, updateQuery }) {
  const [outputDisplay, setOutputDisplay] = useState(false);
  return (
    <section className="container">
      <InputBox updateQuery={updateQuery} updateDisplay={setOutputDisplay} />
      {outputDisplay && <OutputBox query={query} />}
    </section>
  );
}

function InputBox({ updateQuery, updateDisplay }) {
  const [userInput, setUserInput] = useState('');
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (userInput === "") {
        alert("Input cannot be empty!");
      } else {
        updateQuery(userInput);
        updateDisplay(true);
        setUserInput('');
      }
    }
  }
  return (
    <section className="box input-box">
      <img
        src="/dictionary_image.jpg"
        alt="Dictionary Image"
        className="input-box-image"
      />
      <p className="input-box-header">
        Dictionary! <br /> <span>..in search of meaning</span>
      </p>
      <p className="input-box-paragraph">
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
        className="input-box-form-input"
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
  const handleRedirect = () => {
    window.open(data.sourceUrls[0])
  }
  if (!data) return <p>Loading!!</p>
  return (
    <section className="box output-box">
      <p className="output-box-word">Word: {data.word}</p>
      {data.meanings.map((meaning, index) => (
        <section key={index} className="output-box-meaning">
          <p className="output-box-speech">
            Part of Speech: {meaning.partOfSpeech}
          </p>
          {meaning.definitions.map((definitionObject, index) => (
            <p key={index} className="output-box-definition">
              {definitionObject.definition}
            </p>
          ))}
        </section>
      ))}
      <button
        type="button"
        className="output-box-button"
        onClick={() => window.open(data.sourceUrls[0])}
      >
        Learn More
      </button>
    </section>
  );
}

export default function App() {
  const [query, setQuery] = useState('');
  return <Container query={query} updateQuery={setQuery} />;
}