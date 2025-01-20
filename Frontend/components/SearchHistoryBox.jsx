import "../src/tailwind.css";
import { useEffect, useState } from "react";

// This component contains all the searched word till now along with timestamps
function SearchHistoryBox({ updateShowDeleteDataModal }) {
  // The 'history' State Variable Array contains all the searched word with date & time
  const [history, setHistory] = useState(null);

  // A Side Effect runs to call an API and the API fetches data from 'MongoDB Atlas'
  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const BACKEND_SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;
        const historyData = await (
          await fetch(`${BACKEND_SERVER_URL}/searchHistory`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          })
        ).json();
        setHistory(JSON.parse(historyData));
      } catch (err) {
        console.error("Error: ", err);
      }
    };

    // Intentional delay to create a Visual Effect of Fetching Data
    // The total time to fetch data from Database is slightly more than '1 second'
    setTimeout(() => fetchSearchHistory(), 1000);
  }, []);

  // A Loading Animation is displayed if 'history === null'
  // The Loading Animation is needed to create a Visual Effect of Data Fetching
  if (!history)
    return (
      <section className="flex flex-row justify-center items-center">
        <p
          className="rounded-[50%] border-4 border-white border-b-rose-800 
          min-w-16 min-h-16 animate-circle"
        ></p>
      </section>
    );
  
  // The actual component mounts when 'history !== null'
  return (
    <section className="py-2 text-left border-t-2 output-box-meaning">
      <section className="flex flex-row gap-2 justify-between items-center font-bold">
        <p className="text-gray-600">Your Search History</p>
        <button
          className="text-white bg-rose-800 rounded-lg px-2 py-1 cursor-pointer"
          onClick={() => updateShowDeleteDataModal(true)}
        >
          Delete All
        </button>
      </section>
      <ul>
        {history.map((item, index) => (
          <li
            key={index}
            className="m-4 mr-0 pl-2 border-l-2 border-l-gray-500 italic 
            flex flex-row flex-wrap justify-between items-center"
          >
            <span className="text-xl">{item.word}</span>
            <span className="flex flex-col justify-center items-end text-sm">
              <span>{item.date}</span>
              <span>{item.time}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export { SearchHistoryBox };
