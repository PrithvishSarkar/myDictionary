import "../src/tailwind.css";
import { InputBox } from "../components/InputBox.jsx";
import { OutputBox } from "../components/OutputBox.jsx";
import { Footer } from "../components/Footer.jsx";
import { AlertModal } from "../components/AlertModal.jsx";
import { DeleteModal } from "../components/DeleteModal.jsx";
import { useState } from "react";

// This component contains all the UI components and is called in 'App.jsx'
function Main() {
  // The searched word is 'query' State Variable
  const [query, setQuery] = useState("");

  // Initially there is no Output Box
  // The 'outputDisplay' becomes 'true' once the user inputs a word and hits 'Enter'
  // The 'outputDisplay' remains 'true' thereafter
  const [outputDisplay, setOutputDisplay] = useState(false);

  // This is a dummy variable used to trigger a Spin Loader in the Output Box section
  // Whenever the 'toggleValue' changes, the 'data' in 'OutputBox.jsx' becomes 'null'
  // If 'data === null' in 'OutputBox.jsx', then a Spin Loader is displayed
  // This is done to create a Visual Effect and an illusion of Data Fetching
  const [toggleValue, setToggleValue] = useState(false);

  // The 'showAlertModal' becomes 'true' if the Search Box is empty
  // The 'showAlertModal' becomes 'false' automatically after 3 seconds
  // This invokes a Modal to display an Alert to show that the Search Input is empty
  const [showAlertModal, setShowAlertModal] = useState(false);

  // The 'showDeleteDataModal' becomes 'true' when the user clicks on 'Delete All' button
  // The 'Delete All' button is present in 'SearchHistoryBox.jsx'
  // The 'showDeleteDataModal' becomes 'false' when 'Cancel' button in Modal is clicked
  // The 'DeleteModal' is displayed only when 'showDeleteDataModal' is set to 'true'
  const [showDeleteDataModal, setShowDeleteDataModal] = useState(false);

  return (
    <section data-type="wrapper">
      {showAlertModal && <AlertModal />}
      {showDeleteDataModal && (
        <DeleteModal updateShowDeleteDataModal={setShowDeleteDataModal} />
      )}
      <section
        className="min-h-[100vh] min-w-full
        flex flex-col items-stretch justify-center gap-2 container"
      >
        <div
          className="flex-grow p-2 pb-0
          flex flex-col items-center justify-evenly gap-4 md:flex-row md:items-start"
        >
          <InputBox
            updateQuery={setQuery}
            updateDisplay={setOutputDisplay}
            isOutputBoxDisplayed={outputDisplay}
            updateToggleValue={setToggleValue}
            updateShowAlertModal={setShowAlertModal}
            showAlertModal={showAlertModal}
          />
          {outputDisplay && (
            <OutputBox
              searchQuery={query}
              toggleValue={toggleValue}
              updateShowDeleteDataModal={setShowDeleteDataModal}
            />
          )}
        </div>
        <Footer />
      </section>
    </section>
  );
}

export { Main };
