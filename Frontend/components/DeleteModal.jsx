import "../src/tailwind.css";

// This Modal appears when the user clicks on 'Delete All' button in 'SearchHistoryBox.jsx' 
function DeleteModal({ updateShowDeleteDataModal }) {

  // This function send a 'POST' request to Backend to delete all the data from Database
  const handleDelete = async () => {
    const BACKEND_SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;
    await fetch(`${BACKEND_SERVER_URL}/searchHistory/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: true }),
    });
    window.location.reload();
  };
  return (
    <section className="bg-transparent backdrop-blur-md z-10
    fixed top-0 bottom-0 left-0 right-0">
      <div
        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
        p-4 min-w-[90%] md:min-w-[40%] min-h-[60%] sm:min-h-[50%]
        border-none rounded-lg bg-rose-300"
      >
        <p className="mb-2 text-center text-2xl font-medium font-sans text-neutral-800">
          <span className="font-bold text-red-800">Warning!!</span> <br />
          You will lose all the stored data and the application will load again!
          <br />
          <br />
          Do you really want to delete?
        </p>
        <button
          onClick={handleDelete}
          className="px-4 py-1 border-none outline-0 rounded-md
        bg-red-600 text-white text-lg font-bold absolute bottom-2 left-4"
        >
          Delete
        </button>
        <button
          onClick={() => updateShowDeleteDataModal(false)}
          className="px-4 py-1 border-none outline-0 rounded-md
        bg-emerald-600 text-white text-lg font-bold absolute bottom-2 right-4"
        >
          Cancel
        </button>
      </div>
    </section>
  );
}

export { DeleteModal };
