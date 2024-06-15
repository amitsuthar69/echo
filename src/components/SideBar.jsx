import { React, useState } from "react";

export default function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [pinnedEventIndexes, setPinnedEventIndexes] = useState(() => {
    const pinned = localStorage.getItem("pinnedEventIndexes");
    return pinned ? JSON.parse(pinned) : [];
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    const e = JSON.parse(localStorage.getItem("events"));
    setEvents(e);
  };

  const handleDelete = (id) => {
    const updatedEvents = events.filter((_, i) => i !== id);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));

    const updatedPinnedEventIndexes = pinnedEventIndexes.filter(
      (index) => index !== id
    );
    setPinnedEventIndexes(updatedPinnedEventIndexes);
    localStorage.setItem(
      "pinnedEventIndexes",
      JSON.stringify(updatedPinnedEventIndexes)
    );
  };

  const handleEdit = (id) => {
    const currentEvent = events.filter((_, i) => i == id);
    console.log("curr: ", currentEvent);
  };

  const handlePinEvent = (id) => {
    let updatedPinnedEventIndexes;
    if (pinnedEventIndexes.includes(id)) {
      updatedPinnedEventIndexes = pinnedEventIndexes.filter(
        (index) => index !== id
      );
    } else {
      updatedPinnedEventIndexes = [...pinnedEventIndexes, id];
    }
    setPinnedEventIndexes(updatedPinnedEventIndexes);
    localStorage.setItem(
      "pinnedEventIndexes",
      JSON.stringify(updatedPinnedEventIndexes)
    );
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
        className={`fixed inset-y-0 left-0 z-30 w-80 md:w-96 bg-light-blue-400 dark:bg-dark-blue-300 text-white transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="mt-20">
          <p className="text-center font-semibold text-dark-blue-400 dark:text-light-blue-100 mt-4">
            Your Events
          </p>
          {events && events.length > 0 ? (
            events.map((e, i) => (
              <div key={i}>
                <EventCard
                  id={i}
                  title={e.title}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  handlePinEvent={handlePinEvent}
                  isPinned={pinnedEventIndexes.includes(i)}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-xs text-dark-blue-400/75 dark:text-light-blue-100/75 mt-12">
              No Events Yet!
            </p>
          )}
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

function EventCard({
  id,
  title,
  handleDelete,
  handleEdit,
  handlePinEvent,
  isPinned,
}) {
  const bgColor = isPinned
    ? "bg-gray-200/50"
    : "bg-white dark:bg-light-blue-400";

  return (
    <div className="flex mt-2 items-center justify-between py-4 px-3 mx-4 rounded-md dark:text-gray-50 text-dark-blue-400 bg-white dark:bg-light-blue-400 hover:scale-105 transition-transform duration-300 cursor-pointer">
      <p className="font-bold overflow-hidden text-ellipsis whitespace-nowrap w-full">
        {title}
      </p>
      <div className="btns flex gap-1 items-center justify-end">
        <button
          onClick={() => handlePinEvent(id)}
          className={`hover:bg-gray-200 ${bgColor} p-1.5 rounded`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#333333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-pin"
          >
            <line x1="12" x2="12" y1="17" y2="22" />
            <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
          </svg>
        </button>
        <button
          onClick={() => handleEdit(id)}
          className="hover:bg-purple-200 dark:hover:bg-purple-200 p-1.5 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00ff1e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-pencil"
          >
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
            <path d="m15 5 4 4" />
          </svg>
        </button>
        <button
          onClick={() => handleDelete(id)}
          className="hover:bg-red-100 dark:hover:bg-red-100 p-1.5 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ff4d4d"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-trash-2"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
          </svg>
        </button>
      </div>
    </div>
  );
}
