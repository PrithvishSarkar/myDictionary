import "../src/tailwind.css";

// This component contains all the synonyms of the searched word
function SynonymsBox({ synonyms }) {
  return (
    <section className="py-2 text-left border-t-2 output-box-meaning">
      <p className="font-bold text-gray-600">Synonyms</p>
      <ul className="flex flex-row flex-wrap gap-2 m-4 mr-0">
        {synonyms.map((synonym, index) => (
          <li
            key={index}
            className="p-2 text-emerald-800 bg-gray-100 rounded-lg italic"
          >
            {synonym}
          </li>
        ))}
      </ul>
    </section>
  );
}

export { SynonymsBox };
