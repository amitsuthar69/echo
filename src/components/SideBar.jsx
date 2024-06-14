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
        className={`fixed inset-y-0 left-0 w-96 bg-light-blue-400 dark:bg-dark-blue-300 text-white transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="mt-20">
          <li className="p-4">Item 1</li>
          <li className="p-4">Item 2</li>
          <li className="p-4">Item 3</li>
        </ul>
      </aside>
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
    <div className="bg-light-blue-100 dark:bg-dark-blue-400  p-1 rounded">
      <svg
        width="35"
        height="35"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleClick}
        className="dark:text-light-blue-200 text-dark-blue-400"
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
