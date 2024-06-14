import { useState } from "react";

export default function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <button
        onClick={toggleSidebar}
        className="absolute top-0 left-0 m-4 z-50"
      >
        <HamburgerMenu toggleSidebar={toggleSidebar} />
      </button>

      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="mt-12">
          <li className="p-4">Item 1</li>
          <li className="p-4">Item 2</li>
          <li className="p-4">Item 3</li>
        </ul>
      </aside>
      <main className="flex-grow p-4 text-gray-50">
        <h1>Main Content</h1>
      </main>
    </div>
  );
}

function HamburgerMenu({ toggleSidebar }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    toggleSidebar();
  };

  return (
    <div className="bg-[#1B262C] p-1 rounded">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleClick}
        className="text-custom-blue"
      >
        {isOpen ? (
          <>
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        ) : (
          <>
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
      </svg>
    </div>
  );
}
