import "../src/tailwind.css";

// This component contains the definitions of the searched word
function DefinitionsBox({ definition }) {
  return (
    <ul>
      {definition.meanings.map((meaning, index) => (
        <li
          key={index}
          className="py-2 text-left border-t-2 output-box-meaning"
        >
          <p className="font-bold text-gray-600">
            Part of Speech: {meaning.partOfSpeech}
          </p>
          <ul>
            {meaning.definitions.map((definitionObject, index) => (
              <li
                key={index}
                className="m-4 mr-0 p-2 border-l-2 border-l-gray-500 italic"
              >
                {definitionObject.definition}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export { DefinitionsBox };
