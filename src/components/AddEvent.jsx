import { useState } from "react";
import EventForm from "./EventForm";

function AddEvent() {
	const [showModal, setShowModal] = useState(false);

	const handleOpenModal = () => {
		setShowModal(true);
	}

	const handleCloseModal = () => {
		setShowModal(false);
	}

	const handleSaveEvent = (event) => {
		const events = JSON.parse(localStorage.getItem("events")) || [];
		const newEvents = [...events, event];
		localStorage.setItem("events", JSON.stringify(newEvents));
	}

	return (
		<>
			<button
				className="bg-[#7AA2E3] dark:bg-[#BBE1FA] rounded-lg fixed bottom-8 right-8 p-1"
				onClick={handleOpenModal}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="3em"
					height="3em"
					strokeWidth="1"
					viewBox="0 0 24 24"
				>
					<path fill="#0f4c75" d="M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8z" />
				</svg>
			</button>

			{showModal && <EventForm onClose={handleCloseModal} onSave={handleSaveEvent} />}
		</>
	)
}

export default AddEvent;
