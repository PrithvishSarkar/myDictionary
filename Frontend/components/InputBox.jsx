import "../src/tailwind.css";
import { useState } from "react";

// The Input Box is used to take word input
// updateQuery -> Updates the searched word
// updateDisplay -> Makes the Output Box visible if it is not visible
// isOutputBoxDisplayed -> Boolean State Variable -> whether or not the Output Box is visible
// updateToggleValue -> Negates the Boolean State Variable value
// updateShowAlertModal -> Updates the Boolean value to 'true' and then 'false' after 3000ms
function InputBox({
  updateQuery,
  updateDisplay,
  updateToggleValue,
  isOutputBoxDisplayed,
  updateShowAlertModal,
}) {
  // The 'userInput' is the value entered in the Search Box by the user
  const [userInput, setUserInput] = useState("");

  // This function runs when the user hits the 'Enter' key
  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      if (userInput.trim() === "") {
        updateShowAlertModal(true);
        setTimeout(() => updateShowAlertModal(false), 3000);
      } else {
        updateQuery(userInput);
        !isOutputBoxDisplayed && updateDisplay(true);
        updateToggleValue((val) => !val);

        // Sends a 'POST' request to Backend containing the searched word
        // The searched word is then stored in 'MongoDB Atlas'
        try {
          const BACKEND_SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;
          await fetch(BACKEND_SERVER_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: userInput }),
          });
        } catch (err) {
          console.error("Error: ", err);
        }

        setUserInput("");
      }
    }
  };

  return (
    <section
      className="bg-gray-200
    p-4 text-center max-w-[95%] md:max-w-[40%]
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
        name="word-search"
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

export { InputBox };
