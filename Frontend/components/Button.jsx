import "../src/tailwind.css";

// This component is a template for buttons present in 'OutputBox.jsx'
function Button({ children, onClick, className = "" }) {
  return (
    <button
      className={`border-none rounded-lg bg-indigo-900 text-gray-100 font-bold
      px-4 py-2 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export { Button };