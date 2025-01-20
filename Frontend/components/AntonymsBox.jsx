import "../src/tailwind.css";

// This component contains all the antonyms of the searched word
function AntonymsBox({ antonyms }) {
  return (
    <section className="py-2 text-left border-t-2 output-box-meaning">
      <p className="font-bold text-gray-600">Antonyms</p>
      <ul className="flex flex-row flex-wrap gap-2 m-4 mr-0">
        {antonyms.map((antonym, index) => (
          <li
            key={index}
            className="p-2 text-rose-800 bg-gray-100 rounded-lg italic"
          >
            {antonym}
          </li>
        ))}
      </ul>
    </section>
  );
}

export { AntonymsBox };
